import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, serverError, parseQueryInt } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import {
  listIncidents, createIncident, linkDeploymentToIncident, getLinkedDeployments,
} from '@/src/repositories/incident.repo';
import { getDeploymentById } from '@/src/repositories/deployment.repo';
import { listBuildFailures } from '@/src/repositories/build-failure.repo';
import { storeMemory, buildIncidentNarrative, retrieveSimilarMemories } from '@/src/services/hindsight.service';
import { getServiceById } from '@/src/repositories/org.repo';
import { nanoid } from '@/src/lib/nanoid';
import type { Incident, IncidentDeployment } from '@/src/models/types';

const CreateIncidentSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  severity: z.enum(['P1', 'P2', 'P3', 'P4']),
  type: z.enum([
    'production_outage', 'performance_degradation', 'data_issue',
    'security', 'partial_outage', 'other',
  ]),
  started_at: z.string().datetime(),
  root_cause_tags: z.array(z.string()).optional(),
  linked_deployment_ids: z.array(z.string()).optional(),
  incident_commander_id: z.string().optional(),
  description_full: z.string().optional(),
});

// ── GET /api/incidents ─────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const { searchParams } = new URL(req.url);

    const result = listIncidents({
      org_id: ctx.org_id,
      severity: searchParams.get('severity') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      service_id: searchParams.get('service_id') ?? undefined,
      from: searchParams.get('from') ?? undefined,
      to: searchParams.get('to') ?? undefined,
      page: parseQueryInt(searchParams.get('page'), 1),
      per_page: parseQueryInt(searchParams.get('per_page'), 20),
    });

    const enriched = result.data.map(incident => {
      const links = getLinkedDeployments(incident.id);
      const deploymentIds = links.map(l => l.deployment_id);
      
      let serviceName = 'multiple';
      let serviceId: string | undefined;
      if (deploymentIds.length > 0) {
        const firstDep = getDeploymentById(deploymentIds[0]);
        if (firstDep) {
          serviceId = firstDep.service_id;
          const svc = getServiceById(firstDep.service_id);
          if (svc) {
            serviceName = svc.name;
          }
        }
      }

      // Gather logs from linked deployments and build failures (sourced from try/ folder data)
      const logs: string[] = [];
      for (const depId of deploymentIds) {
        const dep = getDeploymentById(depId);
        if (dep?.diff_summary) {
          // diff_summary stores the original logs joined with '; ' during dataset import
          dep.diff_summary.split('; ').forEach(l => { if (l.trim()) logs.push(l.trim()); });
        }
        if (dep?.change_summary) {
          logs.push(dep.change_summary);
        }
      }
      // Also pull build failure error_messages for the linked deployments
      if (serviceId) {
        const bfResults = listBuildFailures({ org_id: incident.org_id, service_id: serviceId, per_page: 100 });
        for (const bf of bfResults.data) {
          if (deploymentIds.includes(bf.deployment_id ?? '')) {
            if (bf.error_message) logs.push(`[Build Failure] ${bf.error_message}`);
          }
        }
      }
      // Deduplicate
      const uniqueLogs = [...new Set(logs)];

      return {
        ...incident,
        linked_deployment_ids: deploymentIds,
        service: serviceName,
        logs: uniqueLogs,
      };
    });

    return ok(enriched, result.meta);
  } catch (err) {
    console.error('[GET /incidents]', err);
    return serverError();
  }
}

// ── POST /api/incidents ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = CreateIncidentSchema.safeParse(body);

    if (!parsed.success) {
      const details = parsed.error.issues.map(e => ({ field: e.path.join('.'), message: e.message }));
      return badRequest('Validation failed', details);
    }

    const data = parsed.data;
    const now = new Date().toISOString();

    const incident: Incident = {
      id: `inc_${nanoid()}`,
      org_id: ctx.org_id,
      title: data.title,
      description: data.description ?? null,
      severity: data.severity,
      status: 'open',
      type: data.type,
      started_at: data.started_at,
      resolved_at: null,
      duration_minutes: null,
      root_cause_tags: data.root_cause_tags ?? [],
      root_cause_summary: null,
      resolution_summary: null,
      postmortem_url: null,
      lessons_learned: null,
      ai_lessons_summary: null,
      created_by: ctx.sub,
      incident_commander: data.incident_commander_id ?? null,
      hindsight_event_id: null,
      created_at: now,
      updated_at: now,
    };

    createIncident(incident);

    // Link deployments
    if (data.linked_deployment_ids) {
      for (const dep_id of data.linked_deployment_ids) {
        const link: IncidentDeployment = {
          incident_id: incident.id,
          deployment_id: dep_id,
          relationship: 'correlated',
          notes: null,
        };
        linkDeploymentToIncident(link);
      }
    }

    // Retrieve similar memories for immediate context
    let similarEventsCount = 0;
    let topEvent = null;
    try {
      const memories = await retrieveSimilarMemories(
        `${data.severity} incident: ${data.title}. Type: ${data.type}. Root causes: ${(data.root_cause_tags ?? []).join(', ')}`,
        { org_id: ctx.org_id },
        3
      );
      similarEventsCount = memories.length;
      if (memories.length > 0) {
        topEvent = {
          event_summary: memories[0].content.substring(0, 200),
          similarity_score: memories[0].similarity_score,
        };
      }
    } catch { /* non-critical */ }

    // Store in Hindsight (fire-and-forget)
    storeMemory({
      content: buildIncidentNarrative({
        service_name: 'multiple',
        severity: data.severity,
        type: data.type,
        title: data.title,
        root_cause_tags: data.root_cause_tags ?? [],
        resolution_summary: null,
        duration_minutes: null,
      }),
      timestamp: data.started_at,
      metadata: {
        org_id: ctx.org_id,
        severity: data.severity,
        type: data.type,
        outcome: 'failure',
        event_type: 'incident',
        root_cause_tags: (data.root_cause_tags ?? []).join(', '),
      },
    }).catch(err => console.error('[hindsight incident store]', err));

    return created({
      id: incident.id,
      status: 'open',
      hindsight_retrieval: {
        similar_events_count: similarEventsCount,
        top_event: topEvent,
      },
    });
  } catch (err) {
    console.error('[POST /incidents]', err);
    return serverError();
  }
}
