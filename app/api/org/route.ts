import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, notFound, badRequest, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { getOrg, updateOrg } from '@/src/repositories/org.repo';

const PatchOrgSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
}).strict();

export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const org = getOrg(ctx.org_id);
    if (!org) return notFound('Organization not found');
    return ok(org);
  } catch (err) {
    console.error('[GET /org]', err);
    return serverError();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = PatchOrgSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }
    const updated = updateOrg(ctx.org_id, parsed.data as Parameters<typeof updateOrg>[1]);
    if (!updated) return notFound('Organization not found');
    return ok(updated);
  } catch (err) {
    console.error('[PATCH /org]', err);
    return serverError();
  }
}
