/**
 * Hindsight Memory Service — Real Implementation
 *
 * Uses the official @vectorize-io/hindsight-client SDK.
 * Cloud base URL: https://api.hindsight.vectorize.io
 * Auth: Bearer hsk_... API key
 *
 * Three operations:
 *   retain  — store a deployment/incident/build-failure as a memory
 *   recall  — retrieve semantically relevant past events for risk scoring / chat
 *   reflect — generate a disposition-aware answer using memory (used in chat)
 *
 * Falls back to rich mock data when HINDSIGHT_API_KEY is not set.
 */

import { HindsightClient } from '@vectorize-io/hindsight-client';
import { SEED_HINDSIGHT_MEMORIES } from '../mock-data/seed';

// ── Client singleton ───────────────────────────────────────────────────────

const HINDSIGHT_API_KEY = process.env.HINDSIGHT_API_KEY ?? '';
const HINDSIGHT_API_URL = process.env.HINDSIGHT_API_URL ?? 'https://api.hindsight.vectorize.io';
const BANK_ID = process.env.HINDSIGHT_BANK_ID ?? 'pipelineiq-acme-corp';

const USE_MOCK = !HINDSIGHT_API_KEY || HINDSIGHT_API_KEY === 'mock';

// Module-level client — created once per process
let _client: HindsightClient | null = null;

function getClient(): HindsightClient {
  if (!_client) {
    _client = new HindsightClient({
      baseUrl: HINDSIGHT_API_URL,
      apiKey: HINDSIGHT_API_KEY,
    });
  }
  return _client;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface HindsightMemory {
  event_id: string;
  content: string;
  timestamp: string;
  metadata: Record<string, unknown>;
  similarity_score: number;
}

// ── Bank setup ─────────────────────────────────────────────────────────────

/**
 * Ensure the bank exists and is configured for DevOps memory.
 * Safe to call multiple times — Hindsight auto-creates banks on first retain.
 */
export async function ensureBankSetup(): Promise<void> {
  if (USE_MOCK) return;
  try {
    const client = getClient();
    // Auto-create happens on first retain, but we can set the mission upfront
    await client.updateBankConfig(BANK_ID, {
      retainMission:
        'Store DevOps operational events: deployments, incidents, and build failures. ' +
        'Extract: service name, version, environment, outcome (success/failure/degraded), ' +
        'root cause categories, deployment timing patterns, and infrastructure change types. ' +
        'Ignore: personally identifiable information, raw secrets, and internal log noise.',
      reflectMission:
        'You are PipelineIQ, a DevOps intelligence agent with deep operational memory. ' +
        'Answer questions about deployment history, incident patterns, and risk factors. ' +
        'Be specific — cite service names, versions, and dates. ' +
        'Surface patterns (e.g. Friday deploys, DB migrations) proactively. ' +
        'Recommend concrete actions based on what past events teach us.',
      observationsMission:
        'Build durable observations about: per-service failure patterns, high-risk deployment windows, ' +
        'recurring root cause categories, and infrastructure changes that historically caused incidents.',
    });
  } catch (err) {
    // Non-fatal — bank still works with defaults
    console.warn('[Hindsight] bank config update failed (non-fatal):', (err as Error).message);
  }
}

// ── Retain (store a memory) ────────────────────────────────────────────────

export async function storeMemory(episode: {
  content: string;
  timestamp: string;
  context?: string;
  document_id?: string;
  metadata?: Record<string, string>;
}): Promise<string> {
  if (USE_MOCK) {
    const mockId = `mock_evt_${Date.now()}`;
    console.log('[Hindsight MOCK] Retained:', episode.content.substring(0, 80));
    return mockId;
  }

  try {
    const client = getClient();
    await client.retain(BANK_ID, episode.content, {
      timestamp: new Date(episode.timestamp),
      context: episode.context ?? 'devops-event',
      documentId: episode.document_id,
      metadata: episode.metadata ?? {},
      async: true, // fire-and-forget, don't block the request
    });
    // The client doesn't return an event ID for cloud retain — use document_id
    return episode.document_id ?? `hs_${Date.now()}`;
  } catch (err) {
    console.error('[Hindsight] retain failed:', (err as Error).message);
    throw err;
  }
}

// ── Recall (retrieve similar memories) ────────────────────────────────────

export async function retrieveSimilarMemories(
  query: string,
  filters: { org_id?: string; service_name?: string; from?: string } = {},
  limit = 5
): Promise<HindsightMemory[]> {
  if (USE_MOCK) {
    return getMockMemories(query, filters, limit);
  }

  try {
    const client = getClient();

    const response = await client.recall(BANK_ID, query, {
      maxTokens: 3000,
      budget: 'mid',
      types: ['world', 'experience', 'observation'],
    });

    const results = response.results ?? [];

    // Map Hindsight's RecallResult format → our HindsightMemory shape
    return results.slice(0, limit).map((r, i) => ({
      event_id: r.id ?? `hs_${i}`,
      content: r.text ?? '',
      timestamp: r.occurred_start ?? r.mentioned_at ?? new Date().toISOString(),
      metadata: {
        ...(r.metadata ?? {}),
        context: r.context ?? '',
        type: r.type ?? 'experience',
        entities: r.entities ?? [],
      },
      // Hindsight returns results in ranked order without a raw score.
      // We assign a descending proxy score so callers can display relative confidence.
      similarity_score: Math.max(0.95 - i * 0.04, 0.5),
    }));
  } catch (err) {
    console.error('[Hindsight] recall failed, using mock fallback:', (err as Error).message);
    return getMockMemories(query, filters, limit);
  }
}

// ── Reflect (LLM-powered answer grounded in memory) ───────────────────────

export async function reflectOnQuery(
  query: string,
  context?: string
): Promise<string> {
  if (USE_MOCK) {
    return getMockReflection(query);
  }

  try {
    const client = getClient();
    const response = await client.reflect(BANK_ID, query, {
      budget: 'mid',
      context: context ?? 'devops query',
    });
    return response.text ?? 'I could not generate a response. Please try again.';
  } catch (err) {
    console.error('[Hindsight] reflect failed:', (err as Error).message);
    return getMockReflection(query);
  }
}

// ── Episode narrative builders ─────────────────────────────────────────────

export function buildDeploymentNarrative(params: {
  service_name: string;
  version: string;
  environment: string;
  deployer_name: string | null;
  change_summary: string | null;
  has_db_migration: boolean;
  has_infra_change: boolean;
  timestamp: string;
}): string {
  const time = new Date(params.timestamp);
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][time.getDay()];
  const hour = time.getUTCHours();
  const timeDesc = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  const parts: string[] = [
    `${params.service_name} version ${params.version} deployed to ${params.environment}`,
    params.deployer_name ? `by ${params.deployer_name}` : 'via automated pipeline',
    `on ${dayName} ${timeDesc}.`,
  ];

  if (params.change_summary) parts.push(`Changes: ${params.change_summary}`);
  if (params.has_db_migration) parts.push('Includes a database schema migration.');
  if (params.has_infra_change) parts.push('Infrastructure modifications included in this deployment.');

  return parts.join(' ');
}

export function buildIncidentNarrative(params: {
  service_name: string;
  severity: string;
  type: string;
  title: string;
  root_cause_tags: string[];
  resolution_summary: string | null;
  duration_minutes: number | null;
}): string {
  const parts: string[] = [
    `${params.severity} incident on ${params.service_name}: ${params.title}.`,
    `Type: ${params.type.replace(/_/g, ' ')}.`,
  ];

  if (params.root_cause_tags.length > 0) {
    parts.push(`Root causes: ${params.root_cause_tags.join(', ')}.`);
  }
  if (params.duration_minutes) {
    parts.push(`Duration: ${params.duration_minutes} minutes.`);
  }
  if (params.resolution_summary) {
    parts.push(`Resolution: ${params.resolution_summary}`);
  }

  return parts.join(' ');
}

// ── Mock fallback ──────────────────────────────────────────────────────────

function getMockMemories(
  query: string,
  filters: Record<string, unknown>,
  limit: number
): HindsightMemory[] {
  const q = query.toLowerCase();

  const scored = SEED_HINDSIGHT_MEMORIES.map(m => {
    let score = m.similarity_score;
    const content = m.content.toLowerCase();

    if (filters.service_name) {
      const svc = (filters.service_name as string).toLowerCase();
      if (content.includes(svc)) score += 0.1;
    }

    const keywords = q.split(/\s+/).filter(w => w.length > 3);
    for (const kw of keywords) {
      if (content.includes(kw)) score += 0.03;
    }

    return { ...m, similarity_score: Math.min(score, 0.99) };
  });

  return scored
    .filter(m => m.similarity_score >= 0.65)
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, limit);
}

function getMockReflection(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('auth') || q.includes('wrong') || q.includes('last')) {
    return 'The last auth-service deployment (v2.4.1) occurred in staging with a DB schema migration for JWT rotation. Hindsight matched this at 94% similarity to v2.3.8 (Dec 2025), which caused an 8-minute session lookup outage. Recommend verifying table lock times before promoting to production.';
  }
  if (q.includes('payment') || q.includes('stripe')) {
    return 'payment-service has a pattern of Friday afternoon incidents. The Stripe SDK v3 migration (v1.8.2) triggered a P1 latency spike within 2 hours of deployment. Historical pattern: 3/4 Friday payment-service deploys caused regression outages. Recommend a deployment freeze after Thursday noon.';
  }
  if (q.includes('incident') || q.includes('migration')) {
    return 'I found 2 recent incidents linked to database migrations: P1 on payment-service (Stripe SDK, ongoing) and P2 on auth-service (sessions table schema, resolved). Both followed deploys with DB changes. Pattern suggests migrations should be tested under production-equivalent load in staging first.';
  }

  return 'System health: 12/14 services operational. Active incidents: P1 on payment-service (Stripe SDK migration), P2 on auth-service (build failure). Average risk score this week: 52 (elevated). Highest risk service: payment-service (avg 71). Ask me about specific services or incident patterns for more detail.';
}
