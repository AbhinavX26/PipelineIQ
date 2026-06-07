/**
 * In-memory data store — single source of truth for all repositories.
 * This is a singleton module-level object so it persists across requests
 * in the same Next.js process (dev mode with hot reload will reset it).
 *
 * Prisma migration path: replace each Map with a Prisma client call
 * in the corresponding repository. Types stay the same.
 */

import type {
  Organization, User, Environment, Service,
  Deployment, DeploymentInfraChange, BuildFailure,
  Incident, IncidentDeployment, IncidentTimelineEntry,
  RiskAnalysis, MemoryEvent, WebhookDelivery, ApiKey,
} from '../models/types';

import {
  SEED_ORG, SEED_USERS, SEED_ENVIRONMENTS, SEED_SERVICES,
  SEED_DEPLOYMENTS, SEED_INFRA_CHANGES, SEED_BUILD_FAILURES,
  SEED_INCIDENTS, SEED_INCIDENT_DEPLOYMENTS, SEED_TIMELINE_ENTRIES,
  SEED_RISK_ANALYSES, SEED_WEBHOOK_DELIVERIES, SEED_API_KEYS,
} from '../mock-data/seed';

// Use a module-level global to survive Next.js hot-reload in dev
declare global {
  // eslint-disable-next-line no-var
  var __piqStore: PiqStore | undefined;
}

interface PiqStore {
  organizations: Map<string, Organization>;
  users: Map<string, User>;
  environments: Map<string, Environment>;
  services: Map<string, Service>;
  deployments: Map<string, Deployment>;
  infraChanges: Map<string, DeploymentInfraChange>;
  buildFailures: Map<string, BuildFailure>;
  incidents: Map<string, Incident>;
  incidentDeployments: IncidentDeployment[];
  timelineEntries: Map<string, IncidentTimelineEntry>;
  riskAnalyses: Map<string, RiskAnalysis>; // key = deployment_id
  memoryEvents: Map<string, MemoryEvent>;
  webhookDeliveries: Map<string, WebhookDelivery>;
  apiKeys: Map<string, ApiKey>;
}

function createStore(): PiqStore {
  const organizations = new Map<string, Organization>();
  const users = new Map<string, User>();
  const environments = new Map<string, Environment>();
  const services = new Map<string, Service>();
  const deployments = new Map<string, Deployment>();
  const infraChanges = new Map<string, DeploymentInfraChange>();
  const buildFailures = new Map<string, BuildFailure>();
  const incidents = new Map<string, Incident>();
  const incidentDeployments: IncidentDeployment[] = [];
  const timelineEntries = new Map<string, IncidentTimelineEntry>();
  const riskAnalyses = new Map<string, RiskAnalysis>();
  const memoryEvents = new Map<string, MemoryEvent>();
  const webhookDeliveries = new Map<string, WebhookDelivery>();
  const apiKeys = new Map<string, ApiKey>();

  // Seed data
  organizations.set(SEED_ORG.id, SEED_ORG);
  SEED_USERS.forEach(u => users.set(u.id, u));
  SEED_ENVIRONMENTS.forEach(e => environments.set(e.id, e));
  SEED_SERVICES.forEach(s => services.set(s.id, s));
  SEED_DEPLOYMENTS.forEach(d => deployments.set(d.id, d));
  SEED_INFRA_CHANGES.forEach(ic => infraChanges.set(ic.id, ic));
  SEED_BUILD_FAILURES.forEach(bf => buildFailures.set(bf.id, bf));
  SEED_INCIDENTS.forEach(inc => incidents.set(inc.id, inc));
  SEED_INCIDENT_DEPLOYMENTS.forEach(id => incidentDeployments.push(id));
  SEED_TIMELINE_ENTRIES.forEach(te => timelineEntries.set(te.id, te));
  SEED_RISK_ANALYSES.forEach(ra => riskAnalyses.set(ra.deployment_id, ra));
  SEED_WEBHOOK_DELIVERIES.forEach(wh => webhookDeliveries.set(wh.id, wh));
  SEED_API_KEYS.forEach(k => apiKeys.set(k.id, k));

  return {
    organizations, users, environments, services,
    deployments, infraChanges, buildFailures,
    incidents, incidentDeployments, timelineEntries,
    riskAnalyses, memoryEvents, webhookDeliveries, apiKeys,
  };
}

if (!global.__piqStore) {
  global.__piqStore = createStore();
}

export const store = global.__piqStore;
