import { NextRequest } from 'next/server';
import { z } from 'zod';
import { created, badRequest, notFound, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { getIncidentById, addTimelineEntry } from '@/src/repositories/incident.repo';
import { getUserById } from '@/src/repositories/org.repo';
import { nanoid } from '@/src/lib/nanoid';
import type { IncidentTimelineEntry } from '@/src/models/types';

const TimelineSchema = z.object({
  event_type: z.enum([
    'status_change', 'action_taken', 'diagnosis',
    'escalation', 'communication', 'resolution_step',
  ]),
  content: z.string().min(1),
  occurred_at: z.string().datetime().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = requireAuth(req);
    const { id } = await params;
    const incident = getIncidentById(id);

    if (!incident || incident.org_id !== ctx.org_id) {
      return notFound('Incident not found');
    }

    const body = await req.json();
    const parsed = TimelineSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest('Validation failed', parsed.error.issues.map(e => ({
        field: e.path.join('.'), message: e.message,
      })));
    }

    const user = getUserById(ctx.sub);
    const entry: IncidentTimelineEntry = {
      id: `ite_${nanoid()}`,
      incident_id: id,
      author_id: ctx.sub,
      author_name: user?.name ?? null,
      event_type: parsed.data.event_type,
      content: parsed.data.content,
      occurred_at: parsed.data.occurred_at ?? new Date().toISOString(),
    };

    addTimelineEntry(entry);
    return created(entry);
  } catch (err) {
    console.error('[POST /incidents/:id/timeline]', err);
    return serverError();
  }
}
