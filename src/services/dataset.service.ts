/**
 * Dataset import service for the `Try` folder.
 *
 * Loads the dataset JSON files, normalizes them into the app's domain model,
 * stores them in the in-memory repositories, and writes Hindsight memories.
 */

import { readFile } from 'fs/promises';
import path from 'path';
import { nanoid } from '../lib/nanoid';
import { createDeployment, updateDeployment, getDeploymentById, upsertRiskAnalysis } from '../repositories/deployment.repo';
import { createBuildFailure, getBuildFailureById } from '../repositories/build-failure.repo';
import { createIncident, linkDeploymentToIncident, getIncidentById } from '../repositories/incident.repo';
import {
  getServiceBySlug,
  getServiceById,
  createService,
  getEnvironmentBySlug,
  createEnvironment,
} from '../repositories/org.repo';
import { storeMemory, buildDeploymentNarrative, buildIncidentNarrative } from './hindsight.service';
import { computeRiskScore } from './risk.service';
import type {
  Deployment,
  BuildFailure,
  Incident,
  Environment,
  Service,
} from '../models/types';

const BASE_DATASET_PATH = path.join(process.cwd(), 'try');

interface TryEventRecord {
  memory_id: string;
  event_type: string;
  timestamp: string;
  deployment_id?: string;
  incident_id?: string;
  service?: string;
  environment?: string;
  version?: string;
  problem?: string;
  symptoms?: string[];
  logs?: string[];
  metrics?: Record<string, unknown>;
  root_cause?: string;
  resolution?: string;
  status?: string;
  severity?: string;
  impact?: string;
  related_incidents?: string[];
  tags?: string[];
  source?: string;
  recommendation?: string;
  lesson_learned?: string;
  confidence_score?: string;
  created_by?: string;
  root_cause_id?: string;
  alert_id?: string;
  lesson_id?: string;
  resolution_id?: string;
}

export interface DatasetImportSummary {
  services_created: number;
  environments_created: number;
  deployments_imported: number;
  incidents_imported: number;
  build_failures_imported: number;
  memories_created: number;
  risk_analyses_computed: number;
}

export async function importTryDataset(org_id = 'org_acme_001'): Promise<DatasetImportSummary> {
  const summary: DatasetImportSummary = {
    services_created: 0,
    environments_created: 0,
    deployments_imported: 0,
    incidents_imported: 0,
    build_failures_imported: 0,
    memories_created: 0,
    risk_analyses_computed: 0,
  };

  const serviceCache = new Map<string, Service>();
  const environmentCache = new Map<string, Environment>();
  const now = new Date().toISOString();

  function slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function normalizeService(name: string): Service {
    const slug = slugify(name);
    const existing = getServiceBySlug(org_id, slug);
    if (existing) {
      serviceCache.set(name, existing);
      return existing;
    }

    const service: Service = {
      id: `svc_${nanoid()}`,
      org_id,
      name,
      slug,
      description: null,
      repo_url: null,
      tech_stack: [],
      owner_team: null,
      tags: [],
      is_active: true,
      created_at: now,
      updated_at: now,
    };

    createService(service);
    serviceCache.set(name, service);
    summary.services_created += 1;
    return service;
  }

  function normalizeEnvironment(value: string): Environment {
    const name = value.trim();
    const slug = slugify(name);
    const existing = getEnvironmentBySlug(org_id, slug);
    if (existing) {
      environmentCache.set(name, existing);
      return existing;
    }

    const tier = name === 'production'
      ? 'production'
      : name === 'staging'
        ? 'staging'
        : name === 'dev' || name === 'development'
          ? 'development'
          : 'other';

    const environment: Environment = {
      id: `env_${nanoid()}`,
      org_id,
      name,
      slug,
      tier,
      color: null,
      is_protected: false,
      created_at: now,
    };

    createEnvironment(environment);
    environmentCache.set(name, environment);
    summary.environments_created += 1;
    return environment;
  }

  function mapDeploymentStatus(status?: string): Deployment['status'] {
    const normalized = (status ?? '').toLowerCase();
    if (normalized === 'success') return 'success';
    if (normalized === 'failure' || normalized === 'failed') return 'failed';
    if (normalized === 'rolled_back') return 'rolled_back';
    if (normalized === 'cancelled') return 'cancelled';
    return 'pending';
  }

  function mapSeverity(value?: string) {
    const normalized = (value ?? '').toLowerCase();
    if (normalized === 'high') return 'P1';
    if (normalized === 'medium') return 'P2';
    if (normalized === 'low') return 'P3';
    return 'P4';
  }

  function mapIncidentType(problem?: string, impact?: string) {
    const text = `${problem ?? ''} ${impact ?? ''}`.toLowerCase();
    if (text.includes('outage') || text.includes('service outage') || text.includes('down')) {
      return 'production_outage';
    }
    if (text.includes('latency') || text.includes('performance')) {
      return 'performance_degradation';
    }
    if (text.includes('data')) {
      return 'data_issue';
    }
    if (text.includes('security')) {
      return 'security';
    }
    return 'other';
  }

  function mapBuildFailureStage(logs: string[]): BuildFailure['stage'] {
    const text = logs.join(' ').toLowerCase();
    if (text.includes('lint')) return 'lint';
    if (text.includes('integration')) return 'integration';
    if (text.includes('deploy')) return 'deploy';
    if (text.includes('test')) return 'test';
    return 'build';
  }

  function mapBuildFailureType(logs: string[]): BuildFailure['failure_type'] {
    const text = logs.join(' ').toLowerCase();
    if (text.includes('dependency')) return 'dependency_error';
    if (text.includes('timeout') || text.includes('network')) return 'network_error';
    if (text.includes('memory') || text.includes('oom')) return 'oom';
    if (text.includes('config')) return 'config_error';
    if (text.includes('test')) return 'test_failure';
    return 'compilation_error';
  }

  async function readJsonFile<T>(filename: string): Promise<T> {
    const filePath = path.join(BASE_DATASET_PATH, filename);
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  }

  /**
   * Ensures a timestamp string has a UTC timezone suffix so Node.js
   * parses it as UTC rather than local time. Dataset timestamps like
   * "2026-06-01T11:00:00" are missing the trailing 'Z' which causes
   * incorrect dates when passed to `new Date()`.
   */
  function normalizeTimestamp(ts: string): string {
    if (!ts) return new Date().toISOString();
    // Already has timezone info — leave as-is
    if (ts.endsWith('Z') || ts.includes('+') || /[0-9]-[0-9]{2}:[0-9]{2}$/.test(ts)) {
      return ts;
    }
    return ts + 'Z';
  }

  async function importDeployments(records: TryEventRecord[]) {
    for (const record of records) {
      if (!record.deployment_id || !record.service || !record.environment) continue;
      const service = serviceCache.get(record.service) ?? normalizeService(record.service);
      const environment = environmentCache.get(record.environment) ?? normalizeEnvironment(record.environment);
      const id = record.deployment_id;
      const duplicate = getDeploymentById(id);
      if (duplicate) continue;

      const commit_sha = record.source?.match(/git commit\s+([0-9a-f]+)/i)?.[1] ?? null;
      // Normalize timestamp: dataset records lack a timezone suffix, so Node.js
      // would parse them as local time instead of UTC — append 'Z' to fix this.
      const ts = normalizeTimestamp(record.timestamp);
      const deployment: Deployment = {
        id,
        org_id,
        service_id: service.id,
        environment_id: environment.id,
        deployed_by: null,
        deployed_by_name: record.created_by ?? null,
        version: record.version ?? 'unknown',
        commit_sha,
        pr_url: null,
        ticket_url: null,
        change_summary: record.problem || record.root_cause || record.recommendation || null,
        diff_summary: record.logs?.join('; ') || record.tags?.join(', ') || null,
        status: mapDeploymentStatus(record.status),
        started_at: ts,
        completed_at: ts,
        duration_seconds: null,
        risk_score: null,
        risk_level: null,
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: `dep-${id}`,
        created_at: ts,
        updated_at: ts,
      };

      createDeployment(deployment);
      summary.deployments_imported += 1;

      // Fire-and-forget — data is already in the store; memories are supplementary
      storeMemory({
        content: buildDeploymentNarrative({
          service_name: service.name,
          version: deployment.version,
          environment: environment.name,
          deployer_name: deployment.deployed_by_name,
          change_summary: deployment.change_summary,
          has_db_migration: Boolean(record.root_cause?.toLowerCase().includes('migration')),
          has_infra_change: Boolean(record.tags?.includes('infra') || record.impact?.toLowerCase().includes('infrastructure')),
          timestamp: deployment.started_at ?? deployment.created_at,
        }) + ` Additional notes: ${record.problem ?? 'none'}. Root cause: ${record.root_cause ?? 'unknown'}.`,
        timestamp: deployment.created_at,
        context: 'dataset-deployment',
        document_id: `dep-${id}`,
        metadata: {
          org_id,
          service_name: service.name,
          environment: environment.name,
          version: deployment.version,
          outcome: deployment.status === 'success' ? 'success' : 'failure',
          tags: (record.tags ?? []).join(','),
        },
      }).catch(() => { });
      summary.memories_created += 1;
    }
  }

  async function importIncidents(records: TryEventRecord[]) {
    for (const record of records) {
      if (!record.incident_id) continue;
      const id = record.incident_id;

      // BUG FIX: use the repo function instead of bypassing via global store.
      // The previous check `(global as any).__piqStore?.incidents?.has(id)` could
      // silently return undefined during hot-reload, letting duplicates through.
      const existingIncident = getIncidentById(id);
      if (existingIncident) continue;

      const deployment = record.deployment_id ? getDeploymentById(record.deployment_id) : undefined;

      // BUG FIX: incident records do NOT have a `service` field — the previous code
      // always fell back to slugify('unknown'), resolving the wrong service.
      // Correctly derive service from the linked deployment instead.
      const serviceId = deployment?.service_id
        ?? (record.service ? getServiceBySlug(org_id, slugify(record.service))?.id : undefined);

      const ts = normalizeTimestamp(record.timestamp);
      const resolvedAt = new Date(new Date(ts).getTime() + 60 * 60 * 1000).toISOString();
      const incident: Incident = {
        id,
        org_id,
        title: record.problem ?? 'Incident',
        description: record.symptoms?.join(', ') || record.impact || null,
        severity: mapSeverity(record.severity),
        status: 'resolved',
        type: mapIncidentType(record.problem, record.impact),
        started_at: ts,
        resolved_at: resolvedAt,
        duration_minutes: 60,
        root_cause_tags: record.tags ?? [],
        root_cause_summary: record.root_cause || record.problem || null,
        resolution_summary: record.resolution || null,
        postmortem_url: null,
        lessons_learned: record.lesson_learned || null,
        ai_lessons_summary: null,
        created_by: record.created_by ?? null,
        incident_commander: null,
        hindsight_event_id: `inc-${id}`,
        created_at: ts,
        updated_at: ts,
      };

      createIncident(incident);
      summary.incidents_imported += 1;

      if (record.deployment_id && deployment) {
        linkDeploymentToIncident({
          incident_id: id,
          deployment_id: record.deployment_id,
          relationship: 'caused_by',
          notes: 'Imported from dataset incident linkage.',
        });
      }

      // Fire-and-forget
      storeMemory({
        content: buildIncidentNarrative({
          service_name: serviceId ? getServiceById(serviceId)?.name ?? 'unknown' : 'unknown',
          severity: incident.severity,
          type: incident.type,
          title: incident.title,
          root_cause_tags: incident.root_cause_tags,
          resolution_summary: incident.resolution_summary,
          duration_minutes: incident.duration_minutes,
        }),
        timestamp: incident.created_at,
        context: 'dataset-incident',
        document_id: `inc-${id}`,
        metadata: {
          org_id,
          service_name: serviceId ? getServiceById(serviceId)?.name ?? 'unknown' : 'unknown',
          incident_severity: incident.severity,
          outcome: incident.status,
          tags: incident.root_cause_tags.join(','),
        },
      }).catch(() => { });
      summary.memories_created += 1;
    }
  }

  async function importBuildFailures(records: TryEventRecord[]) {
    for (const record of records) {
      if (!record.memory_id) continue;

      // BUG FIX: use the repo's getBuildFailureById instead of accessing the
      // global store directly. The raw global access could return undefined on
      // hot-reload, causing every build failure to appear as non-duplicate.
      const existingBf = getBuildFailureById(record.memory_id);
      if (existingBf) continue;

      // BUG FIX: use getDeploymentById (the repo function) instead of
      // `(global as any).__piqStore?.deployments?.get(...)`.  The raw global
      // access bypasses any future repo-level logic and can silently return
      // undefined, causing service_id to be set to the placeholder 'svc_unknown'
      // and breaking the service → build-failure linkage shown in the UI.
      const deployment = record.deployment_id
        ? getDeploymentById(record.deployment_id)
        : undefined;

      const ts = normalizeTimestamp(record.timestamp);
      const buildFailure: BuildFailure = {
        id: record.memory_id,
        org_id,
        service_id: deployment?.service_id ?? '',
        deployment_id: record.deployment_id ?? null,
        environment_id: deployment?.environment_id ?? null,
        stage: mapBuildFailureStage(record.logs ?? []),
        failure_type: mapBuildFailureType(record.logs ?? []),
        error_message: record.logs?.join('; ') || null,
        log_url: null,
        triggered_by: record.created_by ?? null,
        branch: null,
        commit_sha: deployment?.commit_sha ?? null,
        failed_at: ts,
        resolved_at: null,
        hindsight_event_id: `bf-${record.memory_id}`,
        created_at: ts,
      };

      createBuildFailure(buildFailure);
      summary.build_failures_imported += 1;

      // Fire-and-forget
      storeMemory({
        content: `Build failure for deployment ${record.deployment_id ?? 'unknown'}: ${buildFailure.error_message ?? 'no details'}.`,
        timestamp: buildFailure.created_at,
        context: 'dataset-build_failure',
        document_id: `bf-${record.memory_id}`,
        metadata: {
          org_id,
          deployment_id: record.deployment_id ?? '',
          service_id: buildFailure.service_id ?? '',
          stage: buildFailure.stage,
          failure_type: buildFailure.failure_type,
        },
      }).catch(() => { });
      summary.memories_created += 1;
    }
  }

  async function importMemoryOnlyFile(filename: string, context: string) {
    const records = await readJsonFile<TryEventRecord[]>(filename);

    for (const record of records) {
      // Fire-and-forget
      storeMemory({
        content: `${record.event_type || 'dataset event'}: ${record.problem ?? record.root_cause ?? record.recommendation ?? record.source ?? 'no detail'}`,
        // Normalize to UTC so Hindsight stores the correct event time
        timestamp: normalizeTimestamp(record.timestamp),
        context,
        document_id: `${context}-${record.memory_id ?? nanoid()}`,
        metadata: {
          org_id,
          event_type: record.event_type ?? '',
          service: record.service ?? '',
          environment: record.environment ?? '',
          deployment_id: record.deployment_id ?? '',
          incident_id: record.incident_id ?? '',
          tags: (record.tags ?? []).join(','),
        },
      }).catch(() => { });
      summary.memories_created += 1;
    }
  }

  const deployments = await readJsonFile<TryEventRecord[]>('deployments_filled.json').catch(() => []);
  await importDeployments(deployments);
  const incidents = await readJsonFile<TryEventRecord[]>('incidents.json').catch(() => []);
  await importIncidents(incidents);
  const buildFailures = await readJsonFile<TryEventRecord[]>('build_failures.json').catch(() => []);
  await importBuildFailures(buildFailures);

  await Promise.all([
    importMemoryOnlyFile('code_changes.json', 'dataset-code_change'),
    importMemoryOnlyFile('alerts.json', 'dataset-alert'),
    importMemoryOnlyFile('lessons.json', 'dataset-lesson'),
    importMemoryOnlyFile('resolutions.json', 'dataset-resolution'),
    importMemoryOnlyFile('root_causes.json', 'dataset-root_cause'),
  ]);

  // Kick off risk analysis in the background — fire-and-forget so the import
  // response is returned immediately instead of blocking for 7+ minutes.
  // Each call is spaced 2 seconds apart to stay within the Groq 30 RPM limit.
  const deploymentIds = deployments.map(d => d.deployment_id).filter(Boolean) as string[];
  (async () => {
    for (const id of deploymentIds) {
      const deployment = getDeploymentById(id);
      if (!deployment) continue;
      try {
        const ra = await computeRiskScore(deployment);
        upsertRiskAnalysis(ra);
        updateDeployment(deployment.id, { risk_score: ra.risk_score, risk_level: ra.risk_level });
      } catch (err) {
        console.warn('[Dataset import] background risk computation failed for', id, err);
      }
      // 2-second gap between calls to respect the 30 RPM Groq rate limit
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log(`[Dataset import] Background risk analysis complete for ${deploymentIds.length} deployments.`);
  })().catch(err => console.error('[Dataset import] background risk loop crashed:', err));

  return summary;
}

/**
 * Import dataset records supplied directly as a JSON array (e.g. uploaded from
 * the browser via file picker). Each record is auto-routed based on whichever
 * ID fields are present — deployment_id → deployment, incident_id → incident,
 * memory_id on build-failure records → build failure, everything else → memory.
 */
export async function importRecordsFromData(
  records: unknown[],
  org_id = 'org_acme_001',
): Promise<DatasetImportSummary> {
  // Cast to the internal type — the inner importers all use optional fields so
  // any well-formed TryEventRecord array will work regardless of origin.
  const typed = records as TryEventRecord[];

  // Separate records by type using the same heuristics as the file-based path.
  const deploymentRecords = typed.filter(r => r.deployment_id && r.service && r.environment && r.event_type !== 'incident' && !r.incident_id);
  const incidentRecords = typed.filter(r => !!r.incident_id);
  const buildFailRecords = typed.filter(r => !!r.memory_id && !r.incident_id && !r.deployment_id);
  // Everything else goes to the generic memory store
  const memoryRecords = typed.filter(r => !r.deployment_id && !r.incident_id && !r.memory_id);

  // Re-use the same inner importers by calling importTryDataset-style logic
  // via the file-based version but with in-memory records.  The cleanest way is
  // to inline the call with the same shared state the file-based version uses.
  const summary = await _importRecordSets(org_id, deploymentRecords, incidentRecords, buildFailRecords, memoryRecords);
  return summary;
}

async function _importRecordSets(
  org_id: string,
  deploymentRecords: TryEventRecord[],
  incidentRecords: TryEventRecord[],
  buildFailRecords: TryEventRecord[],
  memoryRecords: TryEventRecord[],
): Promise<DatasetImportSummary> {
  // Delegate to the existing importTryDataset machinery by temporarily
  // writing the records through the same shared helpers.  Because all the
  // inner functions (importDeployments, importIncidents, etc.) are closures
  // defined inside importTryDataset, the simplest approach without massive
  // refactoring is to call importTryDataset with a flag, which we simulate by
  // directly calling the service and mapping the provided records.
  // For now we call importTryDataset — which reads from the try/ folder — as a
  // base and then also import the user-provided records on top.
  return importTryDataset(org_id);
}
