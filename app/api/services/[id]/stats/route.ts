import { NextRequest } from 'next/server';
import { ok, notFound, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { getServiceById } from '@/src/repositories/org.repo';
import { listDeployments } from '@/src/repositories/deployment.repo';
import { listIncidents } from '@/src/repositories/incident.repo';

// ── GET /api/services/:id/stats ────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const service = getServiceById(id);
    if (!service || service.org_id !== ctx.org_id) {
      return notFound('Service not found');
    }

    const from = searchParams.get('from') ?? new Date(Date.now() - 30 * 86400000).toISOString();
    const to = searchParams.get('to') ?? new Date().toISOString();

    const deploysResult = listDeployments({
      org_id: ctx.org_id,
      service_id: id,
      from,
      to,
      per_page: 100,
    });

    const deployments = deploysResult.data;
    const incidentsResult = listIncidents({ org_id: ctx.org_id, service_id: id, from, to, per_page: 100 });

    const success_count = deployments.filter(d => d.status === 'success').length;
    const failure_count = deployments.filter(d => d.status === 'failed').length;
    const avg_risk_score =
      deployments.length > 0
        ? Math.round(
            deployments.reduce((sum, d) => sum + (d.risk_score ?? 0), 0) / deployments.length
          )
        : 0;

    // Build timeline (group by day)
    const byDay = new Map<string, { deployments: number; failures: number; risk_sum: number; risk_count: number }>();
    for (const d of deployments) {
      const day = d.created_at.substring(0, 10);
      const entry = byDay.get(day) ?? { deployments: 0, failures: 0, risk_sum: 0, risk_count: 0 };
      entry.deployments += 1;
      if (d.status === 'failed') entry.failures += 1;
      if (d.risk_score !== null) { entry.risk_sum += d.risk_score; entry.risk_count += 1; }
      byDay.set(day, entry);
    }

    const timeline = Array.from(byDay.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([date, entry]) => ({
        date,
        deployments: entry.deployments,
        failures: entry.failures,
        avg_risk: entry.risk_count > 0 ? Math.round(entry.risk_sum / entry.risk_count) : 0,
      }));

    return ok({
      service_id: id,
      period: { from, to },
      deployment_count: deployments.length,
      success_count,
      failure_count,
      failure_rate: deployments.length > 0 ? parseFloat((failure_count / deployments.length).toFixed(3)) : 0,
      avg_risk_score,
      incident_count: incidentsResult.meta.total,
      avg_mttr_minutes: 14.5, // computed from resolved incidents — mocked constant for now
      timeline,
    });
  } catch (err) {
    console.error('[GET /services/:id/stats]', err);
    return serverError();
  }
}
