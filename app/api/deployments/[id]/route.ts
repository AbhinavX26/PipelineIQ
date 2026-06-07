import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, badRequest, notFound, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import {
  getDeploymentById, updateDeployment, getInfraChangesByDeployment,
  getRiskAnalysisByDeployment,
} from '@/src/repositories/deployment.repo';
import { getServiceById, getEnvironmentById, getUserById } from '@/src/repositories/org.repo';
import { enrichDeployment } from '../route';

const PatchDeploymentSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'success', 'failed', 'rolled_back', 'cancelled']).optional(),
  completed_at: z.string().datetime().optional(),
  change_summary: z.string().optional(),
}).strict();

// ── GET /api/deployments/:id ───────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const deployment = getDeploymentById(id);

    if (!deployment || deployment.org_id !== ctx.org_id) {
      return notFound('Deployment not found');
    }

    const infraChanges = getInfraChangesByDeployment(id);
    const riskAnalysis = getRiskAnalysisByDeployment(id);
    const deployer = deployment.deployed_by ? getUserById(deployment.deployed_by) : null;

    const enriched = enrichDeployment(deployment, ctx.org_id);

    return ok({
      ...enriched,
      deployed_by: deployer
        ? { id: deployer.id, name: deployer.name }
        : deployment.deployed_by_name
        ? { id: null, name: deployment.deployed_by_name }
        : null,
      infra_changes: infraChanges,
      risk_analysis: riskAnalysis
        ? {
            risk_score: riskAnalysis.risk_score,
            risk_level: riskAnalysis.risk_level,
            factors: riskAnalysis.risk_factors,
            recommendations: riskAnalysis.recommendations,
            hindsight_memories: [],
          }
        : null,
    });
  } catch (err) {
    console.error('[GET /deployments/:id]', err);
    return serverError();
  }
}

// ── PATCH /api/deployments/:id ─────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const deployment = getDeploymentById(id);

    if (!deployment || deployment.org_id !== ctx.org_id) {
      return notFound('Deployment not found');
    }

    const body = await req.json();
    const parsed = PatchDeploymentSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })));
    }

    const patch: Partial<typeof deployment> = { ...parsed.data };

    // Auto-compute duration if completing
    if (parsed.data.status === 'success' || parsed.data.status === 'failed') {
      const startMs = deployment.started_at ? new Date(deployment.started_at).getTime() : null;
      const endMs = parsed.data.completed_at
        ? new Date(parsed.data.completed_at).getTime()
        : Date.now();
      if (startMs) {
        patch.duration_seconds = Math.round((endMs - startMs) / 1000);
      }
    }

    const updated = updateDeployment(id, patch);
    if (!updated) return notFound('Deployment not found');

    return ok(enrichDeployment(updated, ctx.org_id));
  } catch (err) {
    console.error('[PATCH /deployments/:id]', err);
    return serverError();
  }
}
