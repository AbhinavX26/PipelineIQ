// Core domain types matching the database schema exactly
// Field names mirror PostgreSQL schema for easy Prisma migration

export type OrgPlan = 'free' | 'pro' | 'enterprise';
export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
export type EnvironmentTier = 'production' | 'staging' | 'development' | 'other';
export type DeploymentStatus = 'pending' | 'in_progress' | 'success' | 'failed' | 'rolled_back' | 'cancelled';
export type DeploymentSource = 'manual' | 'webhook' | 'api';
export type RiskLevel = 'low' | 'medium' | 'elevated' | 'high';
export type IncidentStatus = 'open' | 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'closed';
export type IncidentSeverity = 'P1' | 'P2' | 'P3' | 'P4';
export type IncidentType =
  | 'production_outage'
  | 'performance_degradation'
  | 'data_issue'
  | 'security'
  | 'partial_outage'
  | 'other';
export type BuildFailureStage = 'build' | 'test' | 'lint' | 'integration' | 'deploy';
export type BuildFailureType =
  | 'compilation_error'
  | 'test_failure'
  | 'timeout'
  | 'dependency_error'
  | 'oom'
  | 'config_error'
  | 'network_error';
export type InfraChangeType =
  | 'config_change'
  | 'db_migration'
  | 'scaling_event'
  | 'network_change'
  | 'dependency_update'
  | 'secret_rotation';
export type MemoryEventStatus = 'pending' | 'stored' | 'failed';

// ── Organizations ──────────────────────────────────────────────────────────
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  plan: OrgPlan;
  settings: {
    risk_alert_threshold?: number;
    default_timezone?: string;
    allow_sso?: boolean;
    hindsight_memory_window_days?: number;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Users ──────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  org_id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: UserRole;
  password_hash: string | null;
  sso_provider: string | null;
  sso_subject: string | null;
  mfa_enabled: boolean;
  mfa_secret: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Environments ───────────────────────────────────────────────────────────
export interface Environment {
  id: string;
  org_id: string;
  name: string;
  slug: string;
  tier: EnvironmentTier;
  color: string | null;
  is_protected: boolean;
  created_at: string;
}

// ── Services ───────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  org_id: string;
  name: string;
  slug: string;
  description: string | null;
  repo_url: string | null;
  tech_stack: string[];
  owner_team: string | null;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ── Deployments ────────────────────────────────────────────────────────────
export interface Deployment {
  id: string;
  org_id: string;
  service_id: string;
  environment_id: string;
  deployed_by: string | null;
  deployed_by_name: string | null;
  version: string;
  commit_sha: string | null;
  pr_url: string | null;
  ticket_url: string | null;
  change_summary: string | null;
  diff_summary: string | null;
  status: DeploymentStatus;
  started_at: string | null;
  completed_at: string | null;
  duration_seconds: number | null;
  risk_score: number | null;
  risk_level: RiskLevel | null;
  source: DeploymentSource;
  webhook_delivery_id: string | null;
  hindsight_event_id: string | null;
  created_at: string;
  updated_at: string;
}

// ── Infra Changes ──────────────────────────────────────────────────────────
export interface DeploymentInfraChange {
  id: string;
  deployment_id: string;
  change_type: InfraChangeType;
  description: string;
  affected_system: string | null;
  is_reversible: boolean;
  created_at: string;
}

// ── Build Failures ─────────────────────────────────────────────────────────
export interface BuildFailure {
  id: string;
  org_id: string;
  service_id: string;
  deployment_id: string | null;
  environment_id: string | null;
  stage: BuildFailureStage;
  failure_type: BuildFailureType;
  error_message: string | null;
  log_url: string | null;
  triggered_by: string | null;
  branch: string | null;
  commit_sha: string | null;
  failed_at: string;
  resolved_at: string | null;
  hindsight_event_id: string | null;
  created_at: string;
}

// ── Incidents ──────────────────────────────────────────────────────────────
export interface Incident {
  id: string;
  org_id: string;
  title: string;
  description: string | null;
  severity: IncidentSeverity;
  status: IncidentStatus;
  type: IncidentType;
  started_at: string;
  resolved_at: string | null;
  duration_minutes: number | null;
  root_cause_tags: string[];
  root_cause_summary: string | null;
  resolution_summary: string | null;
  postmortem_url: string | null;
  lessons_learned: string | null;
  ai_lessons_summary: string | null;
  created_by: string | null;
  incident_commander: string | null;
  hindsight_event_id: string | null;
  created_at: string;
  updated_at: string;
}

// ── Incident ↔ Deployment junction ────────────────────────────────────────
export interface IncidentDeployment {
  incident_id: string;
  deployment_id: string;
  relationship: 'caused_by' | 'correlated' | 'occurred_during' | 'rolled_back_to_fix';
  notes: string | null;
}

// ── Incident Timeline ──────────────────────────────────────────────────────
export interface IncidentTimelineEntry {
  id: string;
  incident_id: string;
  author_id: string | null;
  author_name: string | null;
  event_type:
    | 'status_change'
    | 'action_taken'
    | 'diagnosis'
    | 'escalation'
    | 'communication'
    | 'resolution_step';
  content: string;
  occurred_at: string;
}

// ── Risk Analysis ──────────────────────────────────────────────────────────
export interface RiskFactor {
  label: string;
  weight: number;
  category: 'historical' | 'temporal' | 'infra' | 'frequency';
}

export interface Recommendation {
  text: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RiskAnalysis {
  id: string;
  deployment_id: string;
  risk_score: number;
  risk_level: RiskLevel;
  historical_factor: number | null;
  temporal_factor: number | null;
  infra_factor: number | null;
  frequency_factor: number | null;
  risk_factors: RiskFactor[];
  recommendations: Recommendation[];
  model_version: string | null;
  computed_at: string;
}

// ── Memory Events ──────────────────────────────────────────────────────────
export interface MemoryEvent {
  id: string;
  org_id: string;
  hindsight_event_id: string | null;
  source_type: 'deployment' | 'incident' | 'build_failure';
  source_id: string;
  event_payload: Record<string, unknown>;
  status: MemoryEventStatus;
  error_message: string | null;
  retry_count: number;
  sent_at: string | null;
  created_at: string;
}

// ── Webhook Deliveries ─────────────────────────────────────────────────────
export interface WebhookDelivery {
  id: string;
  org_id: string;
  api_key_id: string | null;
  source: 'github_actions' | 'jenkins' | 'gitlab_ci' | 'custom';
  event_type: 'deployment' | 'build' | 'incident';
  headers: Record<string, string>;
  raw_payload: Record<string, unknown>;
  status: 'received' | 'processing' | 'processed' | 'failed' | 'ignored';
  processed_at: string | null;
  error_message: string | null;
  received_at: string;
}

// ── API Keys ───────────────────────────────────────────────────────────────
export interface ApiKey {
  id: string;
  org_id: string;
  created_by: string | null;
  name: string;
  key_hash: string;
  key_prefix: string;
  scopes: string[];
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

// ── Hindsight Memory (retrieved events) ───────────────────────────────────
export interface HindsightMemory {
  event_id: string;
  content: string;
  timestamp: string;
  metadata: {
    org_id?: string;
    service_name?: string;
    environment?: string;
    outcome?: string;
    event_type?: string;
    severity?: string;
    root_cause_tags?: string[];
    has_db_migration?: boolean;
    [key: string]: unknown;
  };
  similarity_score: number;
}
