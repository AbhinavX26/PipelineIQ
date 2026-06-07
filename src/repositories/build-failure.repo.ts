import { store } from './store';
import type { BuildFailure } from '../models/types';

export interface ListBuildFailuresFilter {
  org_id: string;
  service_id?: string;
  stage?: string;
  failure_type?: string;
  from?: string;
  to?: string;
  page?: number;
  per_page?: number;
}

export function listBuildFailures(filter: ListBuildFailuresFilter) {
  let results = Array.from(store.buildFailures.values()).filter(
    bf => bf.org_id === filter.org_id
  );

  if (filter.service_id) results = results.filter(bf => bf.service_id === filter.service_id);
  if (filter.stage) results = results.filter(bf => bf.stage === filter.stage);
  if (filter.failure_type) results = results.filter(bf => bf.failure_type === filter.failure_type);
  if (filter.from) results = results.filter(bf => bf.failed_at >= filter.from!);
  if (filter.to) results = results.filter(bf => bf.failed_at <= filter.to!);

  results.sort((a, b) => (a.failed_at < b.failed_at ? 1 : -1));

  const page = filter.page ?? 1;
  const perPage = Math.min(filter.per_page ?? 20, 100);
  const total = results.length;
  const paged = results.slice((page - 1) * perPage, page * perPage);

  return {
    data: paged,
    meta: { page, per_page: perPage, total, total_pages: Math.ceil(total / perPage) },
  };
}

export function getBuildFailureById(id: string): BuildFailure | undefined {
  return store.buildFailures.get(id);
}

export function createBuildFailure(bf: BuildFailure): BuildFailure {
  store.buildFailures.set(bf.id, bf);
  return bf;
}

export function getRecentBuildFailures(service_id: string, days: number): BuildFailure[] {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return Array.from(store.buildFailures.values())
    .filter(bf => bf.service_id === service_id && bf.failed_at >= cutoff)
    .sort((a, b) => (a.failed_at < b.failed_at ? 1 : -1));
}
