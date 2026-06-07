import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, created, badRequest, serverError, parseQueryInt } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { listBuildFailures, createBuildFailure } from '@/src/repositories/build-failure.repo';
import { storeMemory } from '@/src/services/hindsight.service';
import { retrieveSimilarMemories } from '@/src/services/hindsight.service';
import { nanoid } from '@/src/lib/nanoid';
import type { BuildFailure } from '@/src/models/types';

const CreateBuildFailureSchema = z.object({
  service_id: z.string(),
  environment_id: z.string().optional(),
  deployment_id: z.string().optional(),
  stage: z.enum(['build', 'test', 'lint', 'integration', 'deploy']),
  failure_type: z.enum([
    'compilation_error', 'test_failure', 'timeout',
    'dependency_error', 'oom', 'config_error', 'network_error',
  ]),
  error_message: z.string().optional(),
  log_url: z.string().url().optional().or(z.literal('')),
  branch: z.string().optional(),
  commit_sha: z.string().max(40).optional(),
});

// ── GET /api/build-failures ────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const { searchParams } = new URL(req.url);

    const result = listBuildFailures({
      org_id: ctx.org_id,
      service_id: searchParams.get('service_id') ?? undefined,
      stage: searchParams.get('stage') ?? undefined,
      failure_type: searchParams.get('failure_type') ?? undefined,
      from: searchParams.get('from') ?? undefined,
      to: searchParams.get('to') ?? undefined,
      page: parseQueryInt(searchParams.get('page'), 1),
      per_page: parseQueryInt(searchParams.get('per_page'), 20),
    });

    return ok(result.data, result.meta);
  } catch (err) {
    console.error('[GET /build-failures]', err);
    return serverError();
  }
}

// ── POST /api/build-failures ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = CreateBuildFailureSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const data = parsed.data;
    const now = new Date().toISOString();

    const bf: BuildFailure = {
      id: `bf_${nanoid()}`,
      org_id: ctx.org_id,
      service_id: data.service_id,
      deployment_id: data.deployment_id ?? null,
      environment_id: data.environment_id ?? null,
      stage: data.stage,
      failure_type: data.failure_type,
      error_message: data.error_message ?? null,
      log_url: data.log_url || null,
      triggered_by: ctx.sub,
      branch: data.branch ?? null,
      commit_sha: data.commit_sha ?? null,
      failed_at: now,
      resolved_at: null,
      hindsight_event_id: null,
      created_at: now,
    };

    createBuildFailure(bf);

    // Retrieve similar past failures from Hindsight
    let similar_failures: unknown[] = [];
    try {
      const memories = await retrieveSimilarMemories(
        `Build failure in ${data.stage} stage: ${data.failure_type}. ${data.error_message ?? ''}`,
        { org_id: ctx.org_id, service_name: data.service_id },
        3
      );
      similar_failures = memories.map(m => ({
        event_summary: m.content.substring(0, 200),
        similarity_score: m.similarity_score,
        occurred_at: m.timestamp,
      }));
    } catch { /* non-critical */ }

    // Store in Hindsight
    storeMemory({
      content: `Build failure in ${data.stage} stage: ${data.failure_type}. Error: ${data.error_message ?? 'unknown'}. Branch: ${data.branch ?? 'unknown'}.`,
      timestamp: now,
      metadata: {
        org_id: ctx.org_id,
        service_id: data.service_id,
        stage: data.stage,
        failure_type: data.failure_type,
        outcome: 'failure',
        event_type: 'build_failure',
      },
    }).catch(err => console.error('[hindsight bf store]', err));

    return created({ ...bf, similar_failures });
  } catch (err) {
    console.error('[POST /build-failures]', err);
    return serverError();
  }
}
