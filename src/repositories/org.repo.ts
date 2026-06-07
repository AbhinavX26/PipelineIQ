import { store } from './store';
import type { Organization, User, Service, Environment, ApiKey, WebhookDelivery } from '../models/types';

// ── Organization ───────────────────────────────────────────────────────────

export function getOrg(org_id: string): Organization | undefined {
  return store.organizations.get(org_id);
}

export function updateOrg(org_id: string, patch: Partial<Organization>): Organization | null {
  const existing = store.organizations.get(org_id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updated_at: new Date().toISOString() };
  store.organizations.set(org_id, updated);
  return updated;
}

// ── Users ──────────────────────────────────────────────────────────────────

export function getUserById(id: string): User | undefined {
  return store.users.get(id);
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(store.users.values()).find(u => u.email === email && !u.deleted_at);
}

export function listOrgUsers(org_id: string): User[] {
  return Array.from(store.users.values()).filter(u => u.org_id === org_id && !u.deleted_at);
}

export function createUser(user: User): User {
  store.users.set(user.id, user);
  return user;
}

export function updateUser(id: string, patch: Partial<User>): User | null {
  const existing = store.users.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch, updated_at: new Date().toISOString() };
  store.users.set(id, updated);
  return updated;
}

export function softDeleteUser(id: string): boolean {
  const existing = store.users.get(id);
  if (!existing) return false;
  store.users.set(id, { ...existing, deleted_at: new Date().toISOString() });
  return true;
}

// ── Services ───────────────────────────────────────────────────────────────

export function listServices(org_id: string): Service[] {
  return Array.from(store.services.values()).filter(s => s.org_id === org_id && s.is_active);
}

export function getServiceById(id: string): Service | undefined {
  return store.services.get(id);
}

export function getServiceBySlug(org_id: string, slug: string): Service | undefined {
  return Array.from(store.services.values()).find(
    s => s.org_id === org_id && s.slug === slug
  );
}

export function createService(service: Service): Service {
  store.services.set(service.id, service);
  return service;
}
export function createEnvironment(environment: Environment): Environment {
  store.environments.set(environment.id, environment);
  return environment;
}
// ── Environments ───────────────────────────────────────────────────────────

export function listEnvironments(org_id: string): Environment[] {
  return Array.from(store.environments.values()).filter(e => e.org_id === org_id);
}

export function getEnvironmentById(id: string): Environment | undefined {
  return store.environments.get(id);
}

export function getEnvironmentBySlug(org_id: string, slug: string): Environment | undefined {
  return Array.from(store.environments.values()).find(
    e => e.org_id === org_id && e.slug === slug
  );
}

// ── API Keys ───────────────────────────────────────────────────────────────

export function listApiKeys(org_id: string): ApiKey[] {
  return Array.from(store.apiKeys.values()).filter(
    k => k.org_id === org_id && !k.revoked_at
  );
}

export function getApiKeyById(id: string): ApiKey | undefined {
  return store.apiKeys.get(id);
}

export function getApiKeyByHash(hash: string): ApiKey | undefined {
  return Array.from(store.apiKeys.values()).find(k => k.key_hash === hash && !k.revoked_at);
}

export function createApiKey(key: ApiKey): ApiKey {
  store.apiKeys.set(key.id, key);
  return key;
}

export function revokeApiKey(id: string): boolean {
  const existing = store.apiKeys.get(id);
  if (!existing) return false;
  store.apiKeys.set(id, { ...existing, revoked_at: new Date().toISOString() });
  return true;
}

// ── Webhook Deliveries ─────────────────────────────────────────────────────

export function listWebhookDeliveries(org_id: string, limit = 50): WebhookDelivery[] {
  return Array.from(store.webhookDeliveries.values())
    .filter(wh => wh.org_id === org_id)
    .sort((a, b) => (a.received_at < b.received_at ? 1 : -1))
    .slice(0, limit);
}

export function createWebhookDelivery(delivery: WebhookDelivery): WebhookDelivery {
  store.webhookDeliveries.set(delivery.id, delivery);
  return delivery;
}

export function updateWebhookDelivery(
  id: string,
  patch: Partial<WebhookDelivery>
): WebhookDelivery | null {
  const existing = store.webhookDeliveries.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  store.webhookDeliveries.set(id, updated);
  return updated;
}
