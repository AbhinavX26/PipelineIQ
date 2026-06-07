import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, conflict, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { listServices, createService, getServiceBySlug } from '@/src/repositories/org.repo';
import { listDeployments } from '@/src/repositories/deployment.repo';
import { listIncidents } from '@/src/repositories/incident.repo';
import { nanoid } from '@/src/lib/nanoid';
import type { Service } from '@/src/models/types';

const CreateServiceSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().optional(),
  repo_url: z.string().url().optional().or(z.literal('')),
  tech_stack: z.array(z.string()).optional(),
  owner_team: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// ── GET /api/services ──────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const services = listServices(ctx.org_id);

    const enriched = services.map(s => {
      const recentDeploys = listDeployments({ org_id: ctx.org_id, service_id: s.id, per_page: 1 });
      const lastDeploy = recentDeploys.data[0];

      const openIncidents = listIncidents({ org_id: ctx.org_id, service_id: s.id, status: 'open' });
      const investigatingIncidents = listIncidents({ org_id: ctx.org_id, service_id: s.id, status: 'investigating' });

      const allDeploys = listDeployments({ org_id: ctx.org_id, service_id: s.id, per_page: 100 });
      const failed = allDeploys.data.filter(d => d.status === 'failed').length;
      const total = allDeploys.data.length;

      return {
        ...s,
        health_summary: {
          last_deployment: lastDeploy?.created_at ?? null,
          last_risk_score: lastDeploy?.risk_score ?? null,
          open_incidents: openIncidents.meta.total + investigatingIncidents.meta.total,
          failure_rate_7d: total > 0 ? parseFloat((failed / total).toFixed(3)) : 0,
        },
      };
    });

    return ok(enriched);
  } catch (err) {
    console.error('[GET /services]', err);
    return serverError();
  }
}

// ── POST /api/services ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = CreateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const data = parsed.data;
    const slug =
      data.slug ??
      data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const existing = getServiceBySlug(ctx.org_id, slug);
    if (existing) return conflict(`Service with slug '${slug}' already exists`);

    const now = new Date().toISOString();
    const service: Service = {
      id: `svc_${nanoid()}`,
      org_id: ctx.org_id,
      name: data.name,
      slug,
      description: data.description ?? null,
      repo_url: data.repo_url || null,
      tech_stack: data.tech_stack ?? [],
      owner_team: data.owner_team ?? null,
      tags: data.tags ?? [],
      is_active: true,
      created_at: now,
      updated_at: now,
    };

    createService(service);
    return created(service);
  } catch (err) {
    console.error('[POST /services]', err);
    return serverError();
  }
}
