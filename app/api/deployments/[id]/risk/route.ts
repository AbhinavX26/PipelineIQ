import { NextRequest } from 'next/server';
import { ok, notFound, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { getDeploymentById, getRiskAnalysisByDeployment, upsertRiskAnalysis, updateDeployment } from '@/src/repositories/deployment.repo';
import { computeRiskScore } from '@/src/services/risk.service';

// ── GET /api/deployments/:id/risk ──────────────────────────────────────────
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

    const existing = getRiskAnalysisByDeployment(id);

    if (existing) {
      return ok({
        status: 'ready',
        risk_score: existing.risk_score,
        risk_level: existing.risk_level,
        factors: existing.risk_factors,
        recommendations: existing.recommendations,
        computed_at: existing.computed_at,
      });
    }

    // Trigger computation if missing (shouldn't normally happen)
    try {
      const ra = await computeRiskScore(deployment);
      upsertRiskAnalysis(ra);
      updateDeployment(id, { risk_score: ra.risk_score, risk_level: ra.risk_level });
      return ok({
        status: 'ready',
        risk_score: ra.risk_score,
        risk_level: ra.risk_level,
        factors: ra.risk_factors,
        recommendations: ra.recommendations,
        computed_at: ra.computed_at,
      });
    } catch {
      return ok({
        status: 'computing',
        estimated_seconds_remaining: 3,
      });
    }
  } catch (err) {
    console.error('[GET /deployments/:id/risk]', err);
    return serverError();
  }
}
