import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, badRequest, unauthorized } from '@/src/lib/response';
import { verifyToken, signAccessToken } from '@/src/services/auth.service';

const RefreshSchema = z.object({ refresh_token: z.string() });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = RefreshSchema.safeParse(body);
  if (!parsed.success) return badRequest('refresh_token is required');

  const payload = verifyToken(parsed.data.refresh_token);
  if (!payload) return unauthorized('Invalid or expired refresh token');

  const access_token = signAccessToken({ sub: payload.sub, org_id: payload.org_id, role: payload.role });
  return ok({ access_token, expires_in: 3600 });
}
