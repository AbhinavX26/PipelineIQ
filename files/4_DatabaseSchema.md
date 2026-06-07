# Database Schema — PipelineIQ
## DevOps Pipeline Agent

**Version:** 1.0  
**Date:** June 2026  
**Database:** PostgreSQL 15+  
**ORM Layer:** Prisma (recommended) or SQLAlchemy

---

## Schema Overview

```
organizations ─┬─< users
               ├─< services
               ├─< environments
               └─< api_keys

services ──────┬─< deployments ──┬─< deployment_infra_changes
               │                  └─< deployment_risk_factors
               └─< incidents ────┬─< incident_deployments (junction)
                                  └─< incident_timeline_entries

deployments ───┬─< build_failures
               └─< risk_analyses ──< risk_analysis_memories

memory_events ─────────────────── (Hindsight sync table — append-only)

audit_logs ────────────────────── (immutable event log)
webhook_deliveries ─────────────── (inbound webhook log)
notifications ──────────────────── (outbound notification queue)
```

---

## Tables

---

### `organizations`

Represents a team or company using PipelineIQ.

```sql
CREATE TABLE organizations (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name            VARCHAR(255)  NOT NULL,
  slug            VARCHAR(100)  NOT NULL UNIQUE,   -- URL-safe identifier e.g. "acme-corp"
  logo_url        TEXT,
  plan            VARCHAR(50)   NOT NULL DEFAULT 'free',  -- free | pro | enterprise
  settings        JSONB         NOT NULL DEFAULT '{}',    -- feature flags, thresholds
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ   -- soft delete
);

-- settings JSONB example:
-- {
--   "risk_alert_threshold": 70,
--   "default_timezone": "Asia/Kolkata",
--   "allow_sso": true,
--   "hindsight_memory_window_days": 180
-- }
```

---

### `users`

Team members with access to PipelineIQ.

```sql
CREATE TABLE users (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email           VARCHAR(320)  NOT NULL,
  name            VARCHAR(255)  NOT NULL,
  avatar_url      TEXT,
  role            VARCHAR(50)   NOT NULL DEFAULT 'member',  -- owner | admin | member | viewer
  password_hash   TEXT,                                     -- NULL if SSO-only
  sso_provider    VARCHAR(50),                              -- github | google | okta
  sso_subject     VARCHAR(255),                             -- provider user ID
  mfa_enabled     BOOLEAN       NOT NULL DEFAULT FALSE,
  mfa_secret      TEXT,                                     -- TOTP secret (encrypted)
  last_login_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ,
  UNIQUE (org_id, email)
);

CREATE INDEX idx_users_org ON users(org_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
```

---

### `api_keys`

Machine-to-machine authentication (CI/CD webhook auth).

```sql
CREATE TABLE api_keys (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by      UUID          REFERENCES users(id),
  name            VARCHAR(255)  NOT NULL,           -- "GitHub Actions Key"
  key_hash        VARCHAR(64)   NOT NULL UNIQUE,    -- SHA-256 hash of the actual key
  key_prefix      VARCHAR(12)   NOT NULL,           -- "piq_live_xxxx" shown in UI
  scopes          TEXT[]        NOT NULL DEFAULT ARRAY['deployments:write', 'incidents:write'],
  last_used_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  revoked_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
```

---

### `environments`

Named deployment environments (e.g. production, staging, dev).

```sql
CREATE TABLE environments (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            VARCHAR(100)  NOT NULL,           -- "production", "staging", "dev"
  slug            VARCHAR(100)  NOT NULL,
  tier            VARCHAR(50)   NOT NULL DEFAULT 'other',  -- production | staging | development | other
  color           VARCHAR(7),                       -- hex color for UI badge e.g. "#EF4444"
  is_protected    BOOLEAN       NOT NULL DEFAULT FALSE,    -- locks require 2FA or approval
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, slug)
);
```

---

### `services`

Microservices, applications, or components being deployed.

```sql
CREATE TABLE services (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            VARCHAR(255)  NOT NULL,           -- "auth-service"
  slug            VARCHAR(100)  NOT NULL,
  description     TEXT,
  repo_url        TEXT,                             -- GitHub/GitLab repo link
  tech_stack      TEXT[],                           -- ["Node.js", "PostgreSQL", "Redis"]
  owner_team      VARCHAR(255),
  tags            TEXT[]        NOT NULL DEFAULT '{}',
  is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, slug)
);

CREATE INDEX idx_services_org ON services(org_id) WHERE is_active = TRUE;
```

---

### `deployments`

Core table. Every deployment event logged to PipelineIQ.

```sql
CREATE TABLE deployments (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                UUID          NOT NULL REFERENCES organizations(id),
  service_id            UUID          NOT NULL REFERENCES services(id),
  environment_id        UUID          NOT NULL REFERENCES environments(id),
  deployed_by           UUID          REFERENCES users(id),     -- NULL if API/automated
  deployed_by_name      VARCHAR(255),                            -- display name fallback
  
  -- Version info
  version               VARCHAR(255)  NOT NULL,                  -- "v2.4.1", "sha:abc123"
  commit_sha            VARCHAR(40),                             -- git SHA
  pr_url                TEXT,
  ticket_url            TEXT,
  
  -- Content
  change_summary        TEXT,                                    -- human description
  diff_summary          TEXT,                                    -- auto-generated from diff
  
  -- Status
  status                VARCHAR(50)   NOT NULL DEFAULT 'pending',
  -- pending | in_progress | success | failed | rolled_back | cancelled
  
  started_at            TIMESTAMPTZ,
  completed_at          TIMESTAMPTZ,
  duration_seconds      INTEGER,                                  -- computed
  
  -- Risk (denormalized for fast queries)
  risk_score            SMALLINT,                                 -- 0-100
  risk_level            VARCHAR(20),                              -- low | medium | elevated | high
  
  -- Source
  source                VARCHAR(50)   NOT NULL DEFAULT 'manual',  -- manual | webhook | api
  webhook_delivery_id   UUID          REFERENCES webhook_deliveries(id),
  
  -- Memory
  hindsight_event_id    VARCHAR(255),                            -- Hindsight external reference
  
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deployments_org_service ON deployments(org_id, service_id);
CREATE INDEX idx_deployments_env ON deployments(environment_id);
CREATE INDEX idx_deployments_created ON deployments(org_id, created_at DESC);
CREATE INDEX idx_deployments_risk ON deployments(org_id, risk_score DESC);
```

---

### `deployment_infra_changes`

Infrastructure modifications associated with a deployment.

```sql
CREATE TABLE deployment_infra_changes (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id   UUID          NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
  change_type     VARCHAR(100)  NOT NULL,
  -- config_change | db_migration | scaling_event | network_change | dependency_update | secret_rotation
  description     TEXT          NOT NULL,
  affected_system VARCHAR(255),                     -- "users_db", "redis-cache", "nginx"
  is_reversible   BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
```

---

### `build_failures`

CI/CD pipeline failures. Linked to a deployment attempt.

```sql
CREATE TABLE build_failures (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id            UUID          NOT NULL REFERENCES organizations(id),
  service_id        UUID          NOT NULL REFERENCES services(id),
  deployment_id     UUID          REFERENCES deployments(id),    -- NULL if pre-deploy stage
  environment_id    UUID          REFERENCES environments(id),
  
  stage             VARCHAR(100)  NOT NULL,  -- "build" | "test" | "lint" | "integration" | "deploy"
  failure_type      VARCHAR(100)  NOT NULL,
  -- compilation_error | test_failure | timeout | dependency_error | oom | config_error | network_error
  
  error_message     TEXT,
  log_url           TEXT,
  
  triggered_by      UUID          REFERENCES users(id),
  branch            VARCHAR(255),
  commit_sha        VARCHAR(40),
  
  failed_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  resolved_at       TIMESTAMPTZ,                                  -- NULL = unresolved
  
  hindsight_event_id VARCHAR(255),
  
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_build_failures_service ON build_failures(service_id, failed_at DESC);
CREATE INDEX idx_build_failures_org ON build_failures(org_id, failed_at DESC);
```

---

### `incidents`

Production incidents, degradation events, or outages.

```sql
CREATE TABLE incidents (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID          NOT NULL REFERENCES organizations(id),
  
  title               VARCHAR(500)  NOT NULL,
  description         TEXT,
  severity            VARCHAR(10)   NOT NULL,   -- P1 | P2 | P3 | P4
  
  status              VARCHAR(50)   NOT NULL DEFAULT 'open',
  -- open | investigating | identified | monitoring | resolved | closed
  
  type                VARCHAR(100)  NOT NULL,
  -- production_outage | performance_degradation | data_issue | security | partial_outage | other
  
  started_at          TIMESTAMPTZ   NOT NULL,
  resolved_at         TIMESTAMPTZ,
  duration_minutes    INTEGER,                  -- computed on close
  
  -- Root cause (filled during/after incident)
  root_cause_tags     TEXT[]        DEFAULT '{}',
  -- e.g. ["db_migration", "memory_leak", "config_change", "third_party"]
  root_cause_summary  TEXT,
  resolution_summary  TEXT,
  
  -- Post-mortem
  postmortem_url      TEXT,
  lessons_learned     TEXT,
  ai_lessons_summary  TEXT,                     -- AI-generated from incident data
  
  created_by          UUID          REFERENCES users(id),
  incident_commander  UUID          REFERENCES users(id),
  
  hindsight_event_id  VARCHAR(255),
  
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_incidents_org ON incidents(org_id, started_at DESC);
CREATE INDEX idx_incidents_severity ON incidents(org_id, severity, status);
```

---

### `incident_deployments`

Junction table linking incidents to the deployment(s) that caused or correlated with them.

```sql
CREATE TABLE incident_deployments (
  incident_id     UUID          NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  deployment_id   UUID          NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
  relationship    VARCHAR(50)   NOT NULL DEFAULT 'correlated',
  -- caused_by | correlated | occurred_during | rolled_back_to_fix
  notes           TEXT,
  PRIMARY KEY (incident_id, deployment_id)
);
```

---

### `incident_timeline_entries`

Chronological log of actions taken during an incident.

```sql
CREATE TABLE incident_timeline_entries (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id   UUID          NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  author_id     UUID          REFERENCES users(id),
  author_name   VARCHAR(255),                    -- fallback
  event_type    VARCHAR(100)  NOT NULL,
  -- status_change | action_taken | diagnosis | escalation | communication | resolution_step
  content       TEXT          NOT NULL,
  occurred_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_incident_timeline ON incident_timeline_entries(incident_id, occurred_at);
```

---

### `risk_analyses`

Stored risk analysis results for each deployment.

```sql
CREATE TABLE risk_analyses (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id       UUID          NOT NULL REFERENCES deployments(id) ON DELETE CASCADE UNIQUE,
  
  risk_score          SMALLINT      NOT NULL,         -- 0-100
  risk_level          VARCHAR(20)   NOT NULL,         -- low | medium | elevated | high
  
  -- Score breakdown
  historical_factor   SMALLINT,                       -- contribution from past failures
  temporal_factor     SMALLINT,                       -- time-of-day/week risk
  infra_factor        SMALLINT,                       -- infra change risk contribution
  frequency_factor    SMALLINT,                       -- recent deploy volume
  
  risk_factors        JSONB         NOT NULL DEFAULT '[]',
  -- [{ "label": "3 failures in last 14 days", "weight": 35, "category": "historical" }, ...]
  
  recommendations     JSONB         NOT NULL DEFAULT '[]',
  -- [{ "text": "Run smoke tests first", "priority": "high" }, ...]
  
  model_version       VARCHAR(50),                    -- AI model used e.g. "claude-sonnet-4"
  computed_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
```

---

### `risk_analysis_memories`

Hindsight memory events retrieved for a specific risk analysis.

```sql
CREATE TABLE risk_analysis_memories (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  risk_analysis_id    UUID          NOT NULL REFERENCES risk_analyses(id) ON DELETE CASCADE,
  
  hindsight_event_id  VARCHAR(255)  NOT NULL,       -- Hindsight's event ID
  similarity_score    NUMERIC(5,4),                  -- 0.0000 to 1.0000
  
  -- Denormalized snapshot of retrieved memory
  event_type          VARCHAR(100),                  -- deployment | incident | build_failure
  event_summary       TEXT,
  event_occurred_at   TIMESTAMPTZ,
  event_outcome       VARCHAR(100),                  -- success | failure | degraded
  
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
```

---

### `memory_events`

Local sync table tracking all events sent to Hindsight. Append-only.

```sql
CREATE TABLE memory_events (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID          NOT NULL REFERENCES organizations(id),
  
  hindsight_event_id  VARCHAR(255)  UNIQUE,          -- returned by Hindsight API
  
  source_type         VARCHAR(100)  NOT NULL,         -- deployment | incident | build_failure
  source_id           UUID          NOT NULL,         -- FK to the source table record
  
  -- What was stored in Hindsight
  event_payload       JSONB         NOT NULL,
  
  status              VARCHAR(50)   NOT NULL DEFAULT 'pending',
  -- pending | stored | failed
  
  error_message       TEXT,
  retry_count         SMALLINT      NOT NULL DEFAULT 0,
  
  sent_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memory_events_org ON memory_events(org_id, created_at DESC);
CREATE INDEX idx_memory_events_source ON memory_events(source_type, source_id);
```

---

### `webhook_deliveries`

Log of all inbound webhook payloads from CI/CD tools.

```sql
CREATE TABLE webhook_deliveries (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id),
  api_key_id      UUID          REFERENCES api_keys(id),
  
  source          VARCHAR(100)  NOT NULL,   -- github_actions | jenkins | gitlab_ci | custom
  event_type      VARCHAR(100)  NOT NULL,   -- deployment | build | incident
  
  headers         JSONB         NOT NULL,
  raw_payload     JSONB         NOT NULL,
  
  status          VARCHAR(50)   NOT NULL DEFAULT 'received',
  -- received | processing | processed | failed | ignored
  
  processed_at    TIMESTAMPTZ,
  error_message   TEXT,
  
  received_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_webhook_deliveries_org ON webhook_deliveries(org_id, received_at DESC);
```

---

### `integrations`

Third-party integration configurations per org.

```sql
CREATE TABLE integrations (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  provider        VARCHAR(100)  NOT NULL,
  -- github | gitlab | jenkins | pagerduty | slack | jira | linear
  
  status          VARCHAR(50)   NOT NULL DEFAULT 'connected',   -- connected | disconnected | error
  
  config          JSONB         NOT NULL DEFAULT '{}',
  -- { "repo_urls": [...], "workspace_id": "..." }
  credentials     JSONB         NOT NULL DEFAULT '{}',          -- ENCRYPTED at rest
  -- { "access_token": "...", "refresh_token": "...", "expires_at": "..." }
  
  last_synced_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, provider)
);
```

---

### `notifications`

Outbound notification queue (email, Slack alerts).

```sql
CREATE TABLE notifications (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID          NOT NULL REFERENCES organizations(id),
  user_id         UUID          REFERENCES users(id),          -- NULL = org-wide
  
  type            VARCHAR(100)  NOT NULL,
  -- high_risk_deploy | incident_created | incident_resolved | memory_insight | weekly_digest
  
  channel         VARCHAR(50)   NOT NULL,   -- email | slack | in_app
  
  title           VARCHAR(500)  NOT NULL,
  body            TEXT          NOT NULL,
  data            JSONB         NOT NULL DEFAULT '{}',
  
  status          VARCHAR(50)   NOT NULL DEFAULT 'pending',    -- pending | sent | failed | read
  sent_at         TIMESTAMPTZ,
  read_at         TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, status, created_at DESC);
```

---

### `audit_logs`

Immutable trail of all user and system actions.

```sql
CREATE TABLE audit_logs (
  id              BIGSERIAL     PRIMARY KEY,
  org_id          UUID          NOT NULL,
  actor_id        UUID,                               -- user or NULL (system)
  actor_name      VARCHAR(255),
  
  action          VARCHAR(255)  NOT NULL,
  -- deployment.create | incident.resolve | api_key.revoke | user.invite | settings.update
  
  resource_type   VARCHAR(100),
  resource_id     UUID,
  
  before_state    JSONB,                              -- snapshot before change
  after_state     JSONB,                              -- snapshot after change
  
  ip_address      INET,
  user_agent      TEXT,
  
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Monthly partitions recommended:
-- CREATE TABLE audit_logs_2026_06 PARTITION OF audit_logs
-- FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
```

---

## Entity-Relationship Summary

```
organizations (1)
  ├──< users (M)
  ├──< api_keys (M)
  ├──< services (M)
  │      └──< deployments (M)
  │              ├──< deployment_infra_changes (M)
  │              ├── risk_analysis (1)
  │              │      └──< risk_analysis_memories (M)
  │              └──< build_failures (M)
  │
  ├──< incidents (M)
  │      ├──< incident_deployments >──┤ (M:M with deployments)
  │      └──< incident_timeline_entries (M)
  │
  ├──< environments (M)
  ├──< integrations (M)
  ├──< memory_events (M)          ──── syncs to Hindsight
  ├──< webhook_deliveries (M)
  └──< notifications (M)
```

---

## Key Indexes Summary

```sql
-- Performance indexes for dashboard queries
CREATE INDEX idx_deployments_org_created ON deployments(org_id, created_at DESC);
CREATE INDEX idx_incidents_org_started ON incidents(org_id, started_at DESC);
CREATE INDEX idx_build_failures_service_time ON build_failures(service_id, failed_at DESC);
CREATE INDEX idx_risk_analyses_score ON risk_analyses(risk_score DESC);

-- Full-text search for NL query fallback
CREATE INDEX idx_deployments_fts ON deployments USING GIN(
  to_tsvector('english', COALESCE(change_summary, '') || ' ' || COALESCE(version, ''))
);
CREATE INDEX idx_incidents_fts ON incidents USING GIN(
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(root_cause_summary, ''))
);
```

---

## Notes

- All timestamps are `TIMESTAMPTZ` (timezone-aware UTC storage)
- UUIDs used as primary keys throughout for distributed-safe ID generation
- `credentials` in `integrations` must be encrypted at rest using app-level encryption (e.g. AES-256 via pgcrypto or application KMS)
- `audit_logs` should use table partitioning for high-volume orgs
- `memory_events` is append-only — no UPDATE or DELETE; use status field only
