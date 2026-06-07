import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { ok, serverError } from '@/src/lib/response';
import { requireAuth } from '@/src/lib/auth-middleware';
import { importTryDataset } from '@/src/services/dataset.service';

const TRY_DIR = path.join(process.cwd(), 'try');

/** Detect what kind of records are in the uploaded array */
function detectRecordType(records: any[]): 'deployments' | 'incidents' | 'build_failures' | 'mixed' {
  if (!records.length) return 'mixed';
  const sample = records[0];
  if (sample.incident_id && !sample.deployment_id) return 'incidents';
  if (sample.deployment_id && sample.service && sample.environment) return 'deployments';
  if (sample.memory_id && !sample.incident_id && !sample.deployment_id) return 'build_failures';
  // Mixed file — contains multiple types
  return 'mixed';
}

export async function POST(req: NextRequest) {
  try {
    const ctx = requireAuth(req);

    // If the client uploaded records, write them to the try/ folder first so
    // the existing importTryDataset can pick them up.
    const contentType = req.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => null);
      if (body && Array.isArray(body.records) && body.records.length > 0) {
        await mkdir(TRY_DIR, { recursive: true });

        const type = detectRecordType(body.records);

        if (type === 'deployments') {
          await writeFile(path.join(TRY_DIR, 'deployments_filled.json'), JSON.stringify(body.records, null, 2), 'utf8');
        } else if (type === 'incidents') {
          await writeFile(path.join(TRY_DIR, 'incidents.json'), JSON.stringify(body.records, null, 2), 'utf8');
        } else if (type === 'build_failures') {
          await writeFile(path.join(TRY_DIR, 'build_failures.json'), JSON.stringify(body.records, null, 2), 'utf8');
        } else {
          // Mixed — write to all relevant files by splitting
          const deploymentRecs = body.records.filter((r: any) => r.deployment_id && r.service && r.environment && !r.incident_id);
          const incidentRecs   = body.records.filter((r: any) => !!r.incident_id);
          const bfRecs         = body.records.filter((r: any) => r.memory_id && !r.incident_id && !r.deployment_id);
          if (deploymentRecs.length) await writeFile(path.join(TRY_DIR, 'deployments_filled.json'), JSON.stringify(deploymentRecs, null, 2), 'utf8');
          if (incidentRecs.length)   await writeFile(path.join(TRY_DIR, 'incidents.json'), JSON.stringify(incidentRecs, null, 2), 'utf8');
          if (bfRecs.length)         await writeFile(path.join(TRY_DIR, 'build_failures.json'), JSON.stringify(bfRecs, null, 2), 'utf8');
        }
      }
    }

    const summary = await importTryDataset(ctx.org_id);
    return ok({ message: 'Dataset imported successfully', summary });
  } catch (err) {
    console.error('[POST /dataset/import]', err);
    return serverError('Dataset import failed');
  }
}
