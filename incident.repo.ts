import { store } from './store';
import type { Incident, IncidentDeployment, IncidentTimelineEntry } from '../models/types';

export interface ListIncidentsFilter {
  org_id: string;
  severity?: string;
  status?: string;
  service_id?: string; // via incident_deployments
  from?: string;
  to?: string;
  page?: number;
  per_page?: number;
}

export function listIncidents(filter: ListIncidentsFilter) {
  let results = Array.from(store.incidents.values()).filter(
    i => i.org_id === filter.org_id
  );

  if (filter.severity) results = results.filter(i => i.severity === filter.severity);
  if (filter.status) results = results.filter(i => i.status === filter.status);
  if (filter.from) results = results.filter(i => i.started_at >= filter.from!);
  if (filter.to) results = results.filter(i => i.started_at <= filter.to!);

  // Filter by service_id via incident_deployments junction
  if (filter.service_id) {
    const linkedDeploymentIds = new Set(
      Array.from(store.deployments.values())
        .filter(d => d.service_id === filter.service_id)
        .map(d => d.id)
    );
    const incidentIdsForService = new Set(
      store.incidentDeployments
        .filter(id => linkedDeploymentIds.has(id.deployment_id))
        .map(id => id.incident_id)
    );
    results = results.filter(i => incidentIdsForService.has(i.id));
  }

  // Sort by started_at desc
  results.sort((a, b) => (a.started_at < b.started_at ? 1 : -1));

  const page = filter.page ?? 1;
  const perPage = Math.min(filter.per_page ?? 20, 100);
  const total = results.length;
  const paged = results.slice((page - 1) * perPage, page * perPage);

  return {
    data: paged,
    meta: { page, per_page: perPage, total, total_pages: Math.ceil(total / perPage) },
  };
}

export function getIncidentById(id: string): Incident | undefined {
  return store.incidents.get(id);
}

export function createIncident(incident: Incident): Incident {
  store.incidents.set(incident.id, incident);
  return incident;
}

export function updateIncident(id: string, patch: Partial<Incident>): Incident | null {
  const existing = store.incidents.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updated_at: new Date().toISOString() };
  store.incidents.set(id, updated);
  return updated;
}

// ── Incident ↔ Deployment ──────────────────────────────────────────────────

export function getLinkedDeployments(incident_id: string): IncidentDeployment[] {
  return store.incidentDeployments.filter(id => id.incident_id === incident_id);
}

export function linkDeploymentToIncident(link: IncidentDeployment): void {
  const exists = store.incidentDeployments.some(
    id => id.incident_id === link.incident_id && id.deployment_id === link.deployment_id
  );
  if (!exists) {
    store.incidentDeployments.push(link);
  }
}

export function countLinkedDeployments(incident_id: string): number {
  return store.incidentDeployments.filter(id => id.incident_id === incident_id).length;
}

// ── Timeline Entries ───────────────────────────────────────────────────────

export function getTimelineEntries(incident_id: string): IncidentTimelineEntry[] {
  return Array.from(store.timelineEntries.values())
    .filter(te => te.incident_id === incident_id)
    .sort((a, b) => (a.occurred_at < b.occurred_at ? -1 : 1));
}

export function addTimelineEntry(entry: IncidentTimelineEntry): IncidentTimelineEntry {
  store.timelineEntries.set(entry.id, entry);
  return entry;
}
