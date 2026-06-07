import { NextRequest } from 'next/server';
import { z } from 'zod';
import { ok, badRequest, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { retrieveSimilarMemories, reflectOnQuery } from '@/src/services/hindsight.service';

const QuerySchema = z.object({
  query: z.string().min(1).max(2000),
  context: z.object({
    service_id: z.string().optional(),
    environment_id: z.string().optional(),
  }).optional(),
  conversation_id: z.string().optional(),
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ).optional(),
});

// ── POST /api/query ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);
    const body = await req.json();
    const parsed = QuerySchema.safeParse(body);

    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const { query, context, conversation_id } = parsed.data;

    // 1. Retrieve relevant memories for citation sources
    const memories = await retrieveSimilarMemories(
      query,
      { org_id: ctx.org_id, ...(context ?? {}) },
      8
    );

    // 2. Use Hindsight's reflect for the LLM answer — it's memory-grounded natively
    const answer = await reflectOnQuery(
      query,
      'devops-query from PipelineIQ dashboard'
    );

    // 3. Build source citations from recalled memories
    const sources = memories.slice(0, 3).map(m => ({
      type: (m.metadata.context as string) ?? 'event',
      event_summary: m.content.substring(0, 150),
      similarity_score: m.similarity_score,
      occurred_at: m.timestamp,
    }));

    return ok({
      answer,
      conversation_id: conversation_id ?? `conv_${Date.now()}`,
      sources,
      hindsight_events_used: memories.length,
      model_version: 'hindsight/reflect+groq',
    });
  } catch (err) {
    console.error('[POST /query]', err);
    return serverError();
  }
}
