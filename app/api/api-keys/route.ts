import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { listApiKeys, createApiKey } from '@/src/repositories/org.repo';
import { nanoid } from '@/src/lib/nanoid';
import { createHash, randomBytes } from 'crypto';
import type { ApiKey } from '@/src/models/types';

const CreateKeySchema = z.object({
  name: z.string().min(1).max(255),
  scopes: z.array(z.string()).default(['deployments:write', 'incidents:write']),
  expires_at: z.string().datetime().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const keys = listApiKeys(ctx.org_id);
    // Never expose key_hash — only show prefix
    return ok(keys.map(k => ({
      id: k.id,
      name: k.name,
      key_prefix: k.key_prefix,
      scopes: k.scopes,
      last_used_at: k.last_used_at,
      expires_at: k.expires_at,
      created_at: k.created_at,
    })));
  } catch (err) {
    console.error('[GET /api-keys]', err);
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = CreateKeySchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    // Generate the actual key
    const rawKey = `piq_live_${randomBytes(24).toString('hex')}`;
    const key_prefix = rawKey.substring(0, 12);
    const key_hash = createHash('sha256').update(rawKey).digest('hex');

    const apiKey: ApiKey = {
      id: `key_${nanoid()}`,
      org_id: ctx.org_id,
      created_by: ctx.sub,
      name: parsed.data.name,
      key_hash,
      key_prefix,
      scopes: parsed.data.scopes,
      last_used_at: null,
      expires_at: parsed.data.expires_at ?? null,
      revoked_at: null,
      created_at: new Date().toISOString(),
    };

    createApiKey(apiKey);

    return created({
      id: apiKey.id,
      name: apiKey.name,
      key: rawKey, // Only shown once at creation time
      key_prefix,
      scopes: apiKey.scopes,
      message: 'Store this key securely. It will not be shown again.',
    });
  } catch (err) {
    console.error('[POST /api-keys]', err);
    return serverError();
  }
}
