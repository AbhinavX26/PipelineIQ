import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, notFound, serverError, parseQueryInt } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import {
  listDeployments, createDeployment, createInfraChange, upsertRiskAnalysis,
  updateDeployment,
} from '@/src/repositories/deployment.repo';
import { getServiceBySlug, getEnvironmentBySlug, getServiceById, getEnvironmentById } from '@/src/repositories/org.repo';
import { computeRiskScore } from '@/src/services/risk.service';
import { storeMemory, buildDeploymentNarrative } from '@/src/services/hindsight.service';
import { nanoid } from '@/src/lib/nanoid';
import type { Deployment, DeploymentInfraChange } from '@/src/models/types';

const InfraChangeSchema = z.object({
  change_type: z.enum([
    'config_change', 'db_migration', 'scaling_event',
    'network_change', 'dependency_update', 'secret_rotation',
  ]),
  description: z.string().min(1),
  affected_system: z.string().optional(),
  is_reversible: z.boolean().default(true),
});

const CreateDeploymentSchema = z.object({
  service_id: z.string().optional(),
  service_slug: z.string().optional(),
  environment_id: z.string().optional(),
  environment_slug: z.string().optional(),
  version: z.string().min(1).max(255),
  commit_sha: z.string().max(40).optional(),
  pr_url: z.string().url().optional().or(z.literal('')),
  ticket_url: z.string().url().optional().or(z.literal('')),
  change_summary: z.string().max(5000).optional(),
  infra_changes: z.array(InfraChangeSchema).optional(),
  source: z.enum(['manual', 'webhook', 'api']).default('manual'),
  deployed_by_name: z.string().optional(),
});

// ── GET /api/deployments ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const { searchParams } = new URL(req.url);

    const result = listDeployments({
      org_id: ctx.org_id,
      service_id: searchParams.get('service_id') ?? undefined,
      environment_id: searchParams.get('environment_id') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      risk_level: searchParams.get('risk_level') ?? undefined,
      from: searchParams.get('from') ?? undefined,
      to: searchParams.get('to') ?? undefined,
      page: parseQueryInt(searchParams.get('page'), 1),
      per_page: parseQueryInt(searchParams.get('per_page'), 20),
      sort_by: searchParams.get('sort_by') ?? 'created_at',
      sort_dir: (searchParams.get('sort_dir') as 'asc' | 'desc') ?? 'desc',
    });

    // Enrich with service + environment names
    const enriched = result.data.map(d => enrichDeployment(d, ctx.org_id));

    return ok(enriched, result.meta);
  } catch (err) {
    console.error('[GET /deployments]', err);
    return serverError();
  }
}

// ── POST /api/deployments ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = CreateDeploymentSchema.safeParse(body);

    if (!parsed.success) {
      const details = parsed.error.issues.map(e => ({ field: e.path.join('.'), message: e.message }));
      return badRequest('Validation failed', details);
    }

    const data = parsed.data;
    const now = new Date().toISOString();

    // Resolve service
    let service_id = data.service_id;
    if (!service_id && data.service_slug) {
      const svc = getServiceBySlug(ctx.org_id, data.service_slug);
      if (!svc) return notFound(`Service '${data.service_slug}' not found`);
      service_id = svc.id;
    }
    if (!service_id) return badRequest('service_id or service_slug is required');

    // Resolve environment
    let environment_id = data.environment_id;
    if (!environment_id && data.environment_slug) {
      const env = getEnvironmentBySlug(ctx.org_id, data.environment_slug);
      if (!env) return notFound(`Environment '${data.environment_slug}' not found`);
      environment_id = env.id;
    }
    if (!environment_id) return badRequest('environment_id or environment_slug is required');

    const deployment: Deployment = {
      id: `dep_${nanoid()}`,
      org_id: ctx.org_id,
      service_id,
      environment_id,
      deployed_by: ctx.sub,
      deployed_by_name: data.deployed_by_name ?? null,
      version: data.version,
      commit_sha: data.commit_sha ?? null,
      pr_url: data.pr_url || null,
      ticket_url: data.ticket_url || null,
      change_summary: data.change_summary ?? null,
      diff_summary: null,
      status: 'pending',
      started_at: now,
      completed_at: null,
      duration_seconds: null,
      risk_score: null,
      risk_level: null,
      source: data.source,
      webhook_delivery_id: null,
      hindsight_event_id: null,
      created_at: now,
      updated_at: now,
    };

    createDeployment(deployment);

    // Store infra changes
    if (data.infra_changes) {
      for (const ic of data.infra_changes) {
        const change: DeploymentInfraChange = {
          id: `ic_${nanoid()}`,
          deployment_id: deployment.id,
          change_type: ic.change_type,
          description: ic.description,
          affected_system: ic.affected_system ?? null,
          is_reversible: ic.is_reversible,
          created_at: now,
        };
        createInfraChange(change);
      }
    }

    // Kick off async risk analysis + Hindsight store (fire-and-forget)
    runBackgroundTasks(deployment, ctx.org_id).catch(err =>
      console.error('[background tasks]', err)
    );

    return created({
      id: deployment.id,
      status: 'pending',
      risk_score: null,
      risk_analysis_status: 'computing',
      message: 'Deployment logged. Risk analysis running asynchronously.',
      poll_url: `/api/deployments/${deployment.id}/risk`,
    });
  } catch (err) {
    console.error('[POST /deployments]', err);
    return serverError();
  }
}

// ── Background work ────────────────────────────────────────────────────────

async function runBackgroundTasks(deployment: Deployment, org_id: string) {
  // 1. Compute risk score
  try {
    const riskAnalysis = await computeRiskScore(deployment);
    upsertRiskAnalysis(riskAnalysis);
    updateDeployment(deployment.id, {
      risk_score: riskAnalysis.risk_score,
      risk_level: riskAnalysis.risk_level,
      status: 'in_progress',
    });
  } catch (err) {
    console.error('[risk compute]', err);
  }

  // 2. Store in Hindsight
  try {
    const service = getServiceById(deployment.service_id);
    const env = getEnvironmentById(deployment.environment_id);

    const narrative = buildDeploymentNarrative({
      service_name: service?.name ?? 'unknown',
      version: deployment.version,
      environment: env?.name ?? 'unknown',
      deployer_name: deployment.deployed_by_name,
      change_summary: deployment.change_summary,
      has_db_migration: false,
      has_infra_change: false,
      timestamp: deployment.started_at ?? deployment.created_at,
    });

    const hindsight_event_id = await storeMemory({
      content: narrative,
      timestamp: deployment.created_at,
      metadata: {
        org_id,
        service_id: deployment.service_id,
        service_name: service?.name ?? 'unknown',
        environment: env?.name ?? 'unknown',
        version: deployment.version,
        status: deployment.status,
        outcome: deployment.status === 'success' ? 'success' : 'pending',
      },
    });

    updateDeployment(deployment.id, { hindsight_event_id });
  } catch (err) {
    console.error('[hindsight store]', err);
  }
}

// ── Enrichment helper ──────────────────────────────────────────────────────

export function enrichDeployment(d: Deployment, org_id: string) {
  const service = getServiceById(d.service_id);
  const environment = getEnvironmentById(d.environment_id);

  return {
    ...d,
    service: service
      ? { id: service.id, name: service.name, slug: service.slug }
      : { id: d.service_id, name: d.service_id, slug: d.service_id },
    environment: environment
      ? { id: environment.id, name: environment.name, tier: environment.tier }
      : { id: d.environment_id, name: d.environment_id, tier: 'other' },
  };
}
