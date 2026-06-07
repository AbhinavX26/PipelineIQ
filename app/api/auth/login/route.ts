import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, badRequest, unauthorized, serverError } from '@/src/lib/response';
import {
  verifyPassword, signAccessToken, signRefreshToken, toPublicUser,
} from '@/src/services/auth.service';
import { getUserByEmail, updateUser } from '@/src/repositories/org.repo';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Email and password are required');
    }

    const { email, password } = parsed.data;

    const user = getUserByEmail(email);
    if (!user || !user.password_hash) {
      // Generic message to avoid user enumeration
      return unauthorized('Invalid email or password');
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return unauthorized('Invalid email or password');
    }

    // Update last login
    updateUser(user.id, { last_login_at: new Date().toISOString() });

    const tokenPayload = { sub: user.id, org_id: user.org_id, role: user.role };
    const access_token = signAccessToken(tokenPayload);
    const refresh_token = signRefreshToken(tokenPayload);

    return ok({
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 3600,
      mfa_required: false,
      user: toPublicUser(user),
    });
  } catch (err) {
    console.error('[login]', err);
    return serverError();
  }
}
