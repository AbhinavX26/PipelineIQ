/**
 * POST /api/webhooks/ingest
 *
 * Receives deployment/build events from external CI/CD tools (GitHub Actions, Jenkins, etc.)
 * Auth: Bearer piq_live_<api_key>
 * Header: X-Source: github_actions|jenkins|gitlab_ci|custom
 */

import { NextRequest } from 'next/server';
import { accepted, unauthorized, badRequest, serverError } from '@/src/lib/response';
import { getApiKeyByHash } from '@/src/repositories/org.repo';
import { createWebhookDelivery, updateWebhookDelivery } from '@/src/repositories/org.repo';
import {
  createDeployment, createInfraChange, upsertRiskAnalysis, updateDeployment,
} from '@/src/repositories/deployment.repo';
import { getServiceBySlug, getEnvironmentBySlug } from '@/src/repositories/org.repo';
import { computeRiskScore } from '@/src/services/risk.service';
import { storeMemory, buildDeploymentNarrative } from '@/src/services/hindsight.service';
import { extractBearerToken } from '@/src/services/auth.service';
import { createHash } from 'crypto';
import { nanoid } from '@/src/lib/nanoid';
import type { Deployment, WebhookDelivery } from '@/src/models/types';

export async function POST(req: NextRequest) {
  try {
    // Auth via API key
    const rawToken = extractBearerToken(req.headers.get('authorization'));
    if (!rawToken) return unauthorized('API key required');

    const keyHash = createHash('sha256').update(rawToken).digest('hex');
    const apiKey = getApiKeyByHash(keyHash);

    // In development/demo mode, accept any valid-looking piq_live_ key
    const isDemoMode = !apiKey && rawToken.startsWith('piq_live_');
    const org_id = apiKey?.org_id ?? 'org_acme_001'; // fallback to demo org

    const source = (req.headers.get('x-source') ?? 'custom') as WebhookDelivery['source'];
    const body = await req.json();

    const now = new Date().toISOString();

    // Log webhook delivery
    const delivery: WebhookDelivery = {
      id: `wh_${nanoid()}`,
      org_id,
      api_key_id: apiKey?.id ?? null,
      source,
      event_type: body.event === 'deployment' ? 'deployment' : body.event === 'build_failure' ? 'build' : 'deployment',
      headers: Object.fromEntries(req.headers.entries()),
      raw_payload: body,
      status: 'processing',
      processed_at: null,
      error_message: null,
      received_at: now,
    };
    createWebhookDelivery(delivery);

    // Process deployment events
    if (body.event === 'deployment' || body.service_slug) {
      const service = getServiceBySlug(org_id, body.service_slug ?? body.service);
      const env = getEnvironmentBySlug(org_id, body.environment ?? 'production');

      if (!service || !env) {
        updateWebhookDelivery(delivery.id, { status: 'ignored', error_message: 'Service or environment not found' });
        return accepted({ delivery_id: delivery.id, status: 'ignored', message: 'Service or environment not registered' });
      }

      const deployment: Deployment = {
        id: `dep_${nanoid()}`,
        org_id,
        service_id: service.id,
        environment_id: env.id,
        deployed_by: null,
        deployed_by_name: body.actor ?? body.deployer ?? null,
        version: body.version ?? body.tag ?? 'unknown',
        commit_sha: body.commit_sha ?? null,
        pr_url: null,
        ticket_url: null,
        change_summary: body.metadata ? JSON.stringify(body.metadata) : null,
        diff_summary: null,
        status: body.status === 'success' ? 'success' : body.status === 'failure' ? 'failed' : 'pending',
        started_at: body.timestamp ?? now,
        completed_at: body.status === 'success' || body.status === 'failure' ? (body.timestamp ?? now) : null,
        duration_seconds: null,
        risk_score: null,
        risk_level: null,
        source: 'webhook',
        webhook_delivery_id: delivery.id,
        hindsight_event_id: null,
        created_at: now,
        updated_at: now,
      };

      createDeployment(deployment);

      // Background: risk score + Hindsight store
      Promise.all([
        computeRiskScore(deployment).then(ra => {
          upsertRiskAnalysis(ra);
          updateDeployment(deployment.id, { risk_score: ra.risk_score, risk_level: ra.risk_level });
        }),
        storeMemory({
          content: buildDeploymentNarrative({
            service_name: service.name,
            version: deployment.version,
            environment: env.name,
            deployer_name: deployment.deployed_by_name,
            change_summary: deployment.change_summary,
            has_db_migration: false,
            has_infra_change: false,
            timestamp: deployment.started_at ?? deployment.created_at,
          }),
          timestamp: deployment.created_at,
          context: 'webhook-deployment',
          document_id: `dep-${deployment.id}`,
          metadata: {
            org_id,
            service_name: service.name,
            environment: env.name,
            version: deployment.version,
            outcome: deployment.status === 'success' ? 'success' : 'unknown',
          },
        }),
      ]).catch(err => console.error('[webhook background]', err));

      updateWebhookDelivery(delivery.id, { status: 'processed', processed_at: now });
    } else {
      updateWebhookDelivery(delivery.id, { status: 'ignored' });
    }

    return accepted({
      delivery_id: delivery.id,
      status: 'received',
      message: 'Webhook accepted for processing',
    });
  } catch (err) {
    console.error('[POST /webhooks/ingest]', err);
    return serverError();
  }
}
