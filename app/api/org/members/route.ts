import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { listOrgUsers, createUser } from '@/src/repositories/org.repo';
import { toPublicUser, hashPassword } from '@/src/services/auth.service';
import { nanoid } from '@/src/lib/nanoid';
import type { User } from '@/src/models/types';

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member', 'viewer']).default('member'),
});

export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const members = listOrgUsers(ctx.org_id);
    return ok(members.map(toPublicUser));
  } catch (err) {
    console.error('[GET /org/members]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = InviteSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const now = new Date().toISOString();
    // Create invited user with a temporary password
    const user: User = {
      id: `usr_${nanoid()}`,
      org_id: ctx.org_id,
      email: parsed.data.email,
      name: parsed.data.email.split('@')[0],
      avatar_url: null,
      role: parsed.data.role,
      password_hash: await hashPassword(`temp_${nanoid(12)}`),
      sso_provider: null,
      sso_subject: null,
      mfa_enabled: false,
      mfa_secret: null,
      last_login_at: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    createUser(user);

    return created({
      ...toPublicUser(user),
      message: 'Invitation sent (mock — email delivery not implemented in MVP)',
    });
  } catch (err) {
    console.error('[POST /org/members]', err);
    return serverError();
  }
}
