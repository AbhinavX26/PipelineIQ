import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, badRequest, notFound, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import {
  getIncidentById, updateIncident, getLinkedDeployments,
  getTimelineEntries,
} from '@/src/repositories/incident.repo';
import { getDeploymentById } from '@/src/repositories/deployment.repo';
import { getServiceById, getEnvironmentById } from '@/src/repositories/org.repo';
import { enrichDeployment } from '../../deployments/route';
import { storeMemory, buildIncidentNarrative } from '@/src/services/hindsight.service';

const PatchIncidentSchema = z.object({
  status: z.enum(['open', 'investigating', 'identified', 'monitoring', 'resolved', 'closed']).optional(),
  severity: z.enum(['P1', 'P2', 'P3', 'P4']).optional(),
  resolved_at: z.string().datetime().optional(),
  resolution_summary: z.string().optional(),
  root_cause_summary: z.string().optional(),
  root_cause_tags: z.array(z.string()).optional(),
  postmortem_url: z.string().url().optional(),
  lessons_learned: z.string().optional(),
  incident_commander: z.string().optional(),
}).strict();

// ── GET /api/incidents/:id ─────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const incident = getIncidentById(id);

    if (!incident || incident.org_id !== ctx.org_id) {
      return notFound('Incident not found');
    }

    const timeline = getTimelineEntries(id);
    const linkedLinks = getLinkedDeployments(id);
    const linkedDeployments = linkedLinks
      .map(l => {
        const dep = getDeploymentById(l.deployment_id);
        if (!dep) return null;
        return {
          ...enrichDeployment(dep, ctx.org_id),
          relationship: l.relationship,
        };
      })
      .filter(Boolean);

    return ok({ ...incident, timeline, linked_deployments: linkedDeployments });
  } catch (err) {
    console.error('[GET /incidents/:id]', err);
    return serverError();
  }
}

// ── PATCH /api/incidents/:id ───────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const incident = getIncidentById(id);

    if (!incident || incident.org_id !== ctx.org_id) {
      return notFound('Incident not found');
    }

    const body = await req.json();
    const parsed = PatchIncidentSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const patch: Partial<typeof incident> = { ...parsed.data };

    // Auto-compute duration on resolve
    if (parsed.data.status === 'resolved' && parsed.data.resolved_at) {
      const start = new Date(incident.started_at).getTime();
      const end = new Date(parsed.data.resolved_at).getTime();
      patch.duration_minutes = Math.round((end - start) / 60000);
    }

    const updated = updateIncident(id, patch);
    if (!updated) return notFound('Incident not found');

    // ── Learning: when incident resolves, store the full post-mortem as a rich memory
    // This is what makes the system smarter — future risk analyses will recall
    // "last time this service had a similar change, it caused THIS incident with THIS resolution"
    if (parsed.data.status === 'resolved' || parsed.data.status === 'closed') {
      const resolvedIncident = updated;

      // Build a rich resolution narrative — this is the most valuable memory
      const narrative = buildIncidentNarrative({
        service_name: 'multiple', // incidents can span services
        severity: resolvedIncident.severity,
        type: resolvedIncident.type,
        title: resolvedIncident.title,
        root_cause_tags: resolvedIncident.root_cause_tags,
        resolution_summary: resolvedIncident.resolution_summary,
        duration_minutes: resolvedIncident.duration_minutes,
      });

      // Enrich with lessons learned for maximum future recall quality
      const fullNarrative = resolvedIncident.lessons_learned
        ? `${narrative} Lessons learned: ${resolvedIncident.lessons_learned}`
        : narrative;

      storeMemory({
        content: fullNarrative,
        timestamp: resolvedIncident.started_at,
        context: 'incident-resolution',
        document_id: `inc-${resolvedIncident.id}`, // idempotent — updates the existing memory
        metadata: {
          org_id: ctx.org_id,
          severity: resolvedIncident.severity,
          type: resolvedIncident.type,
          outcome: 'failure', // incident = failure event
          resolution: 'resolved',
          root_cause_tags: resolvedIncident.root_cause_tags.join(','),
          duration_minutes: String(resolvedIncident.duration_minutes ?? 0),
        },
      }).catch(err => console.error('[hindsight incident resolution]', err));

      // Also update any linked deployments' memories to mark their outcome as failure
      const linkedLinks = getLinkedDeployments(id);
      for (const link of linkedLinks) {
        const dep = getDeploymentById(link.deployment_id);
        if (!dep?.hindsight_event_id) continue;

        const svc = getServiceById(dep.service_id);
        const env = getEnvironmentById(dep.environment_id);

        // Re-retain the deployment memory with updated outcome=failure
        // This teaches the system: "this deployment signature → incident"
        storeMemory({
          content:
            `${svc?.name ?? 'service'} ${dep.version} deployed to ${env?.name ?? 'production'} — ` +
            `${link.relationship === 'caused_by' ? 'CAUSED' : 'CORRELATED WITH'} a ${resolvedIncident.severity} incident: ` +
            `${resolvedIncident.title}. Root causes: ${resolvedIncident.root_cause_tags.join(', ')}. ` +
            `Resolved in ${resolvedIncident.duration_minutes ?? 'unknown'} minutes. ` +
            (resolvedIncident.resolution_summary ?? ''),
          timestamp: dep.created_at,
          context: 'deployment-with-incident-outcome',
          document_id: `dep-outcome-${dep.id}`, // separate doc so it doesn't overwrite the original
          metadata: {
            org_id: ctx.org_id,
            service_name: svc?.name ?? '',
            environment: env?.name ?? '',
            version: dep.version,
            outcome: 'failure',
            incident_severity: resolvedIncident.severity,
            root_cause_tags: resolvedIncident.root_cause_tags.join(','),
          },
        }).catch(err => console.error('[hindsight deployment outcome update]', err));
      }
    }

    return ok(updated);
  } catch (err) {
    console.error('[PATCH /incidents/:id]', err);
    return serverError();
  }
}
