import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, conflict, serverError } from '@/src/lib/response';
import { hashPassword, signAccessToken, signRefreshToken } from '@/src/services/auth.service';
import { getUserByEmail, createUser } from '@/src/repositories/org.repo';
import { store } from '@/src/repositories/store';
import { nanoid } from '@/src/lib/nanoid';
import type { Organization, User } from '@/src/models/types';

const SignupSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
  org_name: z.string().min(2).max(255),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);

    if (!parsed.success) {
      const details = parsed.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return badRequest('Validation failed', details);
    }

    const { name, email, password, org_name } = parsed.data;

    // Check for existing user
    const existing = getUserByEmail(email);
    if (existing) {
      return conflict('An account with this email already exists');
    }

    const now = new Date().toISOString();
    const org_id = `org_${nanoid()}`;
    const user_id = `usr_${nanoid()}`;
    const org_slug = org_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Create org
    const org: Organization = {
      id: org_id,
      name: org_name,
      slug: org_slug,
      logo_url: null,
      plan: 'free',
      settings: {
        risk_alert_threshold: 70,
        default_timezone: 'UTC',
        allow_sso: false,
        hindsight_memory_window_days: 180,
      },
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    store.organizations.set(org_id, org);

    // Create user
    const password_hash = await hashPassword(password);
    const user: User = {
      id: user_id,
      org_id,
      email,
      name,
      avatar_url: null,
      role: 'owner',
      password_hash,
      sso_provider: null,
      sso_subject: null,
      mfa_enabled: false,
      mfa_secret: null,
      last_login_at: now,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    };
    createUser(user);

    return created({
      user: { id: user_id, email, name, role: 'owner' },
      org: { id: org_id, name: org_name, slug: org_slug },
      message: 'Account created successfully',
    });
  } catch (err) {
    console.error('[signup]', err);
    return serverError();
  }
}
