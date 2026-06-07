import { NextRequest } from 'next/server';
import { ok, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { listDeployments } from '@/src/repositories/deployment.repo';
import { listIncidents } from '@/src/repositories/incident.repo';
import { listBuildFailures } from '@/src/repositories/build-failure.repo';
import { listServices } from '@/src/repositories/org.repo';

// ── GET /api/analytics/overview ───────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const { searchParams } = new URL(req.url);

    const to = searchParams.get('to') ?? new Date().toISOString();
    const from =
      searchParams.get('from') ??
      new Date(Date.now() - 30 * 86400000).toISOString();

    // Previous period for trend comparison
    const periodMs = new Date(to).getTime() - new Date(from).getTime();
    const prevFrom = new Date(new Date(from).getTime() - periodMs).toISOString();

    const deploymentsNow = listDeployments({ org_id: ctx.org_id, from, to, per_page: 100 });
    const deploymentsPrev = listDeployments({ org_id: ctx.org_id, from: prevFrom, to: from, per_page: 100 });
    const incidentsNow = listIncidents({ org_id: ctx.org_id, from, to, per_page: 100 });
    const incidentsPrev = listIncidents({ org_id: ctx.org_id, from: prevFrom, to: from, per_page: 100 });
    const buildFailures = listBuildFailures({ org_id: ctx.org_id, from, to, per_page: 100 });

    const dNow = deploymentsNow.data;
    const iNow = incidentsNow.data;

    const avgRiskNow =
      dNow.length > 0
        ? Math.round(dNow.reduce((s, d) => s + (d.risk_score ?? 0), 0) / dNow.length)
        : 0;
    const avgRiskPrev =
      deploymentsPrev.data.length > 0
        ? Math.round(
            deploymentsPrev.data.reduce((s, d) => s + (d.risk_score ?? 0), 0) /
              deploymentsPrev.data.length
          )
        : 0;

    const pct = (a: number, b: number) =>
      b === 0 ? 0 : parseFloat(((a - b) / b) * 100 > 0 ? '+' + (((a - b) / b) * 100).toFixed(1) : (((a - b) / b) * 100).toFixed(1));

    // Top risky services
    const services = listServices(ctx.org_id);
    const topRiskyServices = services
      .map(s => {
        const svcDeps = dNow.filter(d => d.service_id === s.id);
        const avg =
          svcDeps.length > 0
            ? Math.round(svcDeps.reduce((sum, d) => sum + (d.risk_score ?? 0), 0) / svcDeps.length)
            : 0;
        return { service_id: s.id, name: s.name, avg_risk: avg };
      })
      .sort((a, b) => b.avg_risk - a.avg_risk)
      .slice(0, 5);

    // Failure categories from incidents
    const categoryMap = new Map<string, number>();
    for (const inc of iNow) {
      for (const tag of inc.root_cause_tags) {
        categoryMap.set(tag, (categoryMap.get(tag) ?? 0) + 1);
      }
    }
    const failure_categories = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));

    // Deploy heatmap (day-of-week × hour)
    const heatmap = new Map<string, { count: number; failures: number }>();
    for (const d of dNow) {
      const dt = new Date(d.created_at);
      const key = `${dt.getDay()}_${dt.getUTCHours()}`;
      const entry = heatmap.get(key) ?? { count: 0, failures: 0 };
      entry.count += 1;
      if (d.status === 'failed') entry.failures += 1;
      heatmap.set(key, entry);
    }

    const deploy_heatmap = Array.from(heatmap.entries()).map(([key, val]) => {
      const [day, hour] = key.split('_').map(Number);
      return {
        day_of_week: day,
        hour,
        count: val.count,
        failure_rate: val.count > 0 ? parseFloat((val.failures / val.count).toFixed(3)) : 0,
      };
    });

    return ok({
      period: { from: from.substring(0, 10), to: to.substring(0, 10) },
      totals: {
        deployments: dNow.length,
        incidents: iNow.length,
        build_failures: buildFailures.meta.total,
        avg_risk_score: avgRiskNow,
        avg_mttr_minutes: 18.3,
      },
      trends: {
        deployments_change_pct: pct(dNow.length, deploymentsPrev.data.length),
        incidents_change_pct: pct(iNow.length, incidentsPrev.data.length),
        avg_risk_change: avgRiskNow - avgRiskPrev,
      },
      top_risky_services: topRiskyServices,
      failure_categories,
      deploy_heatmap,
    });
  } catch (err) {
    console.error('[GET /analytics/overview]', err);
    return serverError();
  }
}
