import { store } from './store';
import type { Deployment, DeploymentInfraChange, RiskAnalysis } from '../models/types';

// ── Deployment Repository ──────────────────────────────────────────────────
// All methods here map 1:1 to Prisma operations for easy migration.

export interface ListDeploymentsFilter {
  org_id: string;
  service_id?: string;
  environment_id?: string;
  status?: string;
  risk_level?: string;
  from?: string;
  to?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
}

export function listDeployments(filter: ListDeploymentsFilter) {
  let results = Array.from(store.deployments.values()).filter(
    d => d.org_id === filter.org_id
  );

  if (filter.service_id) results = results.filter(d => d.service_id === filter.service_id);
  if (filter.environment_id) results = results.filter(d => d.environment_id === filter.environment_id);
  if (filter.status) results = results.filter(d => d.status === filter.status);
  if (filter.risk_level) results = results.filter(d => d.risk_level === filter.risk_level);
  if (filter.from) results = results.filter(d => d.created_at >= filter.from!);
  if (filter.to) results = results.filter(d => d.created_at <= filter.to!);

  // Sort
  const sortBy = (filter.sort_by as keyof Deployment) || 'created_at';
  const dir = filter.sort_dir === 'asc' ? 1 : -1;
  results.sort((a, b) => {
    const va = a[sortBy] ?? '';
    const vb = b[sortBy] ?? '';
    return va < vb ? -dir : va > vb ? dir : 0;
  });

  // Paginate
  const page = filter.page ?? 1;
  const perPage = Math.min(filter.per_page ?? 20, 100);
  const total = results.length;
  const paged = results.slice((page - 1) * perPage, page * perPage);

  return {
    data: paged,
    meta: { page, per_page: perPage, total, total_pages: Math.ceil(total / perPage) },
  };
}

export function getDeploymentById(id: string): Deployment | undefined {
  return store.deployments.get(id);
}

export function createDeployment(deployment: Deployment): Deployment {
  store.deployments.set(deployment.id, deployment);
  return deployment;
}

export function updateDeployment(id: string, patch: Partial<Deployment>): Deployment | null {
  const existing = store.deployments.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updated_at: new Date().toISOString() };
  store.deployments.set(id, updated);
  return updated;
}

// ── Infra Changes ──────────────────────────────────────────────────────────

export function getInfraChangesByDeployment(deployment_id: string): DeploymentInfraChange[] {
  return Array.from(store.infraChanges.values()).filter(
    ic => ic.deployment_id === deployment_id
  );
}

export function createInfraChange(change: DeploymentInfraChange): DeploymentInfraChange {
  store.infraChanges.set(change.id, change);
  return change;
}

// ── Risk Analysis ──────────────────────────────────────────────────────────

export function getRiskAnalysisByDeployment(deployment_id: string): RiskAnalysis | undefined {
  return store.riskAnalyses.get(deployment_id);
}

export function upsertRiskAnalysis(ra: RiskAnalysis): RiskAnalysis {
  store.riskAnalyses.set(ra.deployment_id, ra);
  return ra;
}

// ── Aggregations (used by analytics & risk engine) ─────────────────────────

export function getRecentDeploymentsByService(
  service_id: string,
  limit: number
): Deployment[] {
  return Array.from(store.deployments.values())
    .filter(d => d.service_id === service_id)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, limit);
}

export function countDeploymentsByService(service_id: string, from?: string): number {
  return Array.from(store.deployments.values()).filter(
    d => d.service_id === service_id && (!from || d.created_at >= from)
  ).length;
}
