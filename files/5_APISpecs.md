# API Specifications — PipelineIQ
## DevOps Pipeline Agent

**Version:** 1.0  
**Date:** June 2026  
**Base URL:** `https://api.pipelineiq.io/v1`  
**Protocol:** HTTPS only  
**Format:** JSON (application/json)

---

## 1. Authentication

### API Key (Machine-to-Machine)
Used by CI/CD webhooks and integrations.

```
Header: Authorization: Bearer piq_live_<key>
```

### JWT (User Sessions)
Used by the web frontend after login.

```
Header: Authorization: Bearer <jwt_token>
```

### JWT Token Claims
```json
{
  "sub": "user_uuid",
  "org_id": "org_uuid",
  "role": "admin",
  "exp": 1751234567
}
```

---

## 2. Standard Response Envelope

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 143,
    "total_pages": 8
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      { "field": "version", "message": "Version is required" }
    ]
  }
}
```

### Error Codes
| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | `VALIDATION_ERROR` | Invalid request body |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Duplicate resource |
| 422 | `UNPROCESSABLE` | Valid format, invalid logic |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

## 3. Pagination

All list endpoints support:

| Query Param | Default | Description |
|-------------|---------|-------------|
| `page` | 1 | Page number |
| `per_page` | 20 | Results per page (max: 100) |
| `sort_by` | `created_at` | Field to sort on |
| `sort_dir` | `desc` | `asc` or `desc` |

---

## 4. Endpoints

---

### AUTH

---

#### `POST /auth/signup`
Register a new user and organization.

**Request:**
```json
{
  "name": "Arjun Mehta",
  "email": "arjun@acmecorp.io",
  "password": "Str0ng!Pass",
  "org_name": "Acme Corp"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "arjun@acmecorp.io",
      "name": "Arjun Mehta",
      "role": "owner"
    },
    "org": {
      "id": "org_xyz789",
      "name": "Acme Corp",
      "slug": "acme-corp"
    },
    "message": "Verification email sent"
  }
}
```

---

#### `POST /auth/login`
Authenticate a user.

**Request:**
```json
{
  "email": "arjun@acmecorp.io",
  "password": "Str0ng!Pass"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "mfa_required": false,
    "user": {
      "id": "usr_abc123",
      "email": "arjun@acmecorp.io",
      "name": "Arjun Mehta",
      "role": "admin",
      "org_id": "org_xyz789"
    }
  }
}
```

---

#### `POST /auth/refresh`
Refresh an expired access token.

**Request:**
```json
{ "refresh_token": "eyJhbGc..." }
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGc...",
    "expires_in": 3600
  }
}
```

---

#### `POST /auth/logout`
Invalidate current session.

**Response `200`:**
```json
{ "success": true, "data": { "message": "Logged out successfully" } }
```

---

### DEPLOYMENTS

---

#### `GET /deployments`
List deployments for the authenticated org.

**Query Params:**
| Param | Type | Description |
|-------|------|-------------|
| `service_id` | UUID | Filter by service |
| `environment_id` | UUID | Filter by environment |
| `status` | string | Filter by status |
| `risk_level` | string | `low\|medium\|elevated\|high` |
| `from` | ISO8601 | Start date |
| `to` | ISO8601 | End date |
| `page` | int | |
| `per_page` | int | |

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "dep_11aa22bb",
      "service": { "id": "svc_abc", "name": "auth-service", "slug": "auth-service" },
      "environment": { "id": "env_prod", "name": "production", "tier": "production" },
      "version": "v2.4.1",
      "commit_sha": "a1b2c3d4",
      "status": "success",
      "risk_score": 67,
      "risk_level": "elevated",
      "deployed_by_name": "Arjun Mehta",
      "started_at": "2026-06-07T14:00:00Z",
      "completed_at": "2026-06-07T14:03:42Z",
      "duration_seconds": 222
    }
  ],
  "meta": { "page": 1, "per_page": 20, "total": 143, "total_pages": 8 }
}
```

---

#### `POST /deployments`
Log a new deployment.

**Request:**
```json
{
  "service_id": "svc_abc",
  "environment_id": "env_prod",
  "version": "v2.4.1",
  "commit_sha": "a1b2c3d4e5f6",
  "pr_url": "https://github.com/acme/auth-service/pull/142",
  "ticket_url": "https://linear.app/acme/issue/ENG-891",
  "change_summary": "Add OAuth2 PKCE support and update user session handling",
  "infra_changes": [
    {
      "change_type": "db_migration",
      "description": "Add pkce_verifier column to sessions table",
      "affected_system": "users_db",
      "is_reversible": true
    }
  ],
  "source": "manual"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "dep_11aa22bb",
    "status": "pending",
    "risk_score": null,
    "risk_analysis_status": "computing",
    "message": "Deployment logged. Risk analysis running asynchronously.",
    "poll_url": "/v1/deployments/dep_11aa22bb/risk"
  }
}
```

---

#### `GET /deployments/:id`
Get a single deployment with full details.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "id": "dep_11aa22bb",
    "service": { "id": "svc_abc", "name": "auth-service" },
    "environment": { "id": "env_prod", "name": "production", "tier": "production" },
    "version": "v2.4.1",
    "commit_sha": "a1b2c3d4",
    "pr_url": "https://github.com/acme/auth-service/pull/142",
    "ticket_url": "https://linear.app/acme/issue/ENG-891",
    "change_summary": "Add OAuth2 PKCE support...",
    "status": "success",
    "deployed_by": { "id": "usr_abc123", "name": "Arjun Mehta" },
    "started_at": "2026-06-07T14:00:00Z",
    "completed_at": "2026-06-07T14:03:42Z",
    "duration_seconds": 222,
    "infra_changes": [
      {
        "id": "ic_001",
        "change_type": "db_migration",
        "description": "Add pkce_verifier column to sessions table",
        "affected_system": "users_db",
        "is_reversible": true
      }
    ],
    "risk_analysis": {
      "risk_score": 67,
      "risk_level": "elevated",
      "factors": [
        { "label": "2 failures in last 14 days for this service", "weight": 28, "category": "historical" },
        { "label": "Friday 5pm deploy (historically risky window)", "weight": 22, "category": "temporal" },
        { "label": "Database migration included", "weight": 17, "category": "infra" }
      ],
      "recommendations": [
        { "text": "Run smoke tests on /api/auth before going live", "priority": "high" },
        { "text": "Prepare rollback script for the DB migration", "priority": "high" },
        { "text": "Monitor latency for 30min post-deploy", "priority": "medium" }
      ],
      "hindsight_memories": [
        {
          "event_type": "incident",
          "event_summary": "auth-service v2.3.8 — DB migration caused 8min outage",
          "event_occurred_at": "2025-12-12T18:30:00Z",
          "event_outcome": "failure",
          "similarity_score": 0.94
        }
      ]
    }
  }
}
```

---

#### `PATCH /deployments/:id`
Update deployment status or add metadata.

**Request:**
```json
{
  "status": "success",
  "completed_at": "2026-06-07T14:03:42Z"
}
```

**Response `200`:** Updated deployment object.

---

#### `GET /deployments/:id/risk`
Poll for risk analysis result (async result endpoint).

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "status": "ready",
    "risk_score": 67,
    "risk_level": "elevated",
    "computed_at": "2026-06-07T14:00:08Z"
  }
}
```

When still computing:
```json
{
  "success": true,
  "data": { "status": "computing", "estimated_seconds_remaining": 3 }
}
```

---

### INCIDENTS

---

#### `GET /incidents`
List incidents.

**Query Params:** `severity`, `status`, `service_id`, `from`, `to`, `page`, `per_page`

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "inc_99zz",
      "title": "auth-service latency spike post-deploy",
      "severity": "P2",
      "status": "resolved",
      "type": "performance_degradation",
      "started_at": "2025-12-12T18:30:00Z",
      "resolved_at": "2025-12-12T18:38:00Z",
      "duration_minutes": 8,
      "root_cause_tags": ["db_migration"],
      "linked_deployments_count": 1
    }
  ],
  "meta": { "page": 1, "per_page": 20, "total": 24, "total_pages": 2 }
}
```

---

#### `POST /incidents`
Log a new incident.

**Request:**
```json
{
  "title": "Payment service elevated error rate",
  "description": "5xx errors spiking to 12% in production",
  "severity": "P1",
  "type": "production_outage",
  "started_at": "2026-06-07T16:45:00Z",
  "root_cause_tags": ["config_change", "dependency_error"],
  "linked_deployment_ids": ["dep_11aa22bb"],
  "incident_commander_id": "usr_abc123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "inc_newone",
    "status": "open",
    "hindsight_retrieval": {
      "similar_events_count": 2,
      "top_event": {
        "event_summary": "payment-service had config issue in Nov 2025 — resolved by rollback",
        "similarity_score": 0.87
      }
    }
  }
}
```

---

#### `GET /incidents/:id`
Get full incident detail.

**Response `200`:** Full incident object with timeline, linked deployments, AI-generated lessons, and Hindsight memories (same pattern as deployment detail).

---

#### `PATCH /incidents/:id`
Update incident (status, resolution, root cause).

**Request:**
```json
{
  "status": "resolved",
  "resolved_at": "2026-06-07T17:10:00Z",
  "resolution_summary": "Rolled back deployment dep_11aa22bb. Error rate normalized within 5 minutes.",
  "root_cause_summary": "New config value introduced a connection pool limit too low for peak traffic."
}
```

---

#### `POST /incidents/:id/timeline`
Add a timeline entry.

**Request:**
```json
{
  "event_type": "action_taken",
  "content": "Rolled back to v2.3.9 at 17:05 UTC",
  "occurred_at": "2026-06-07T17:05:00Z"
}
```

---

### SERVICES

---

#### `GET /services`
List all services for the org.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "svc_abc",
      "name": "auth-service",
      "slug": "auth-service",
      "repo_url": "https://github.com/acme/auth-service",
      "tech_stack": ["Node.js", "PostgreSQL"],
      "owner_team": "platform",
      "is_active": true,
      "health_summary": {
        "last_deployment": "2026-06-07T14:00:00Z",
        "last_risk_score": 67,
        "open_incidents": 0,
        "failure_rate_7d": 0.08
      }
    }
  ]
}
```

---

#### `POST /services`
Create a service.

**Request:**
```json
{
  "name": "payment-service",
  "repo_url": "https://github.com/acme/payment-service",
  "tech_stack": ["Python", "FastAPI", "PostgreSQL"],
  "owner_team": "payments",
  "tags": ["critical", "pci"]
}
```

---

#### `GET /services/:id/stats`
Get service statistics for analytics charts.

**Query Params:** `from`, `to`, `granularity` (`day|week|month`)

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "service_id": "svc_abc",
    "period": { "from": "2026-05-07T00:00:00Z", "to": "2026-06-07T23:59:59Z" },
    "deployment_count": 18,
    "success_count": 15,
    "failure_count": 3,
    "failure_rate": 0.167,
    "avg_risk_score": 52,
    "incident_count": 2,
    "avg_mttr_minutes": 14.5,
    "timeline": [
      { "date": "2026-05-07", "deployments": 2, "failures": 0, "avg_risk": 34 },
      { "date": "2026-05-08", "deployments": 1, "failures": 1, "avg_risk": 78 }
    ]
  }
}
```

---

### BUILD FAILURES

---

#### `GET /build-failures`
List build failures.

**Query Params:** `service_id`, `stage`, `failure_type`, `from`, `to`, `page`, `per_page`

---

#### `POST /build-failures`
Log a build failure.

**Request:**
```json
{
  "service_id": "svc_abc",
  "environment_id": "env_staging",
  "stage": "test",
  "failure_type": "test_failure",
  "error_message": "AssertionError: expected 200 but got 401 in auth.spec.js:42",
  "log_url": "https://ci.acme.io/jobs/1234/logs",
  "branch": "feat/oauth-pkce",
  "commit_sha": "a1b2c3d4"
}
```

**Response `201`:** Build failure object with Hindsight memory retrieval (similar past failures).

---

### AI QUERY

---

#### `POST /query`
Natural language query against the agent's memory.

**Request:**
```json
{
  "query": "What went wrong the last time auth-service was deployed to production?",
  "context": {
    "service_id": "svc_abc",
    "environment_id": "env_prod"
  },
  "conversation_id": "conv_xyz123",
  "history": [
    { "role": "user", "content": "Show me recent auth-service deployments" },
    { "role": "assistant", "content": "Here are the last 5 deployments for auth-service..." }
  ]
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "answer": "The last production deployment of auth-service (v2.3.8 on Dec 12, 2025) included a database migration on the sessions table. Within 8 minutes of deploy, a P2 incident was triggered — the migration took longer than expected under production load, causing session lookups to time out. The issue was resolved by rolling back to v2.3.7.",
    "conversation_id": "conv_xyz123",
    "sources": [
      {
        "type": "deployment",
        "id": "dep_olddeploy",
        "label": "auth-service v2.3.8 · Dec 12, 2025",
        "url": "/deployments/dep_olddeploy"
      },
      {
        "type": "incident",
        "id": "inc_99zz",
        "label": "Incident P2 · Session timeout spike",
        "url": "/incidents/inc_99zz"
      }
    ],
    "hindsight_events_used": 3,
    "model_version": "claude-sonnet-4-20250514"
  }
}
```

---

### ANALYTICS

---

#### `GET /analytics/overview`
Org-level aggregate metrics.

**Query Params:** `from`, `to`

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "period": { "from": "2026-05-07", "to": "2026-06-07" },
    "totals": {
      "deployments": 48,
      "incidents": 6,
      "build_failures": 12,
      "avg_risk_score": 42,
      "avg_mttr_minutes": 18.3
    },
    "trends": {
      "deployments_change_pct": 12.5,
      "incidents_change_pct": -16.7,
      "avg_risk_change": -9.0
    },
    "top_risky_services": [
      { "service_id": "svc_pay", "name": "payment-service", "avg_risk": 71 },
      { "service_id": "svc_abc", "name": "auth-service", "avg_risk": 58 }
    ],
    "failure_categories": [
      { "category": "db_migration", "count": 4 },
      { "category": "config_change", "count": 3 },
      { "category": "dependency_error", "count": 2 }
    ],
    "deploy_heatmap": [
      { "day_of_week": 5, "hour": 17, "count": 8, "failure_rate": 0.375 }
    ]
  }
}
```

---

### WEBHOOKS (Inbound)

---

#### `POST /webhooks/ingest`
Receive deployment/build events from external CI/CD tools.

**Auth:** `Authorization: Bearer piq_live_<api_key>`  
**Headers:** `X-Source: github_actions|jenkins|gitlab_ci|custom`

**Request (GitHub Actions example):**
```json
{
  "event": "deployment",
  "service_slug": "auth-service",
  "environment": "production",
  "version": "v2.4.1",
  "commit_sha": "a1b2c3d4",
  "actor": "arjun-mehta",
  "status": "success",
  "timestamp": "2026-06-07T14:03:42Z",
  "metadata": {
    "workflow": "deploy.yml",
    "run_id": "12345678"
  }
}
```

**Response `202`:**
```json
{
  "success": true,
  "data": {
    "delivery_id": "wh_delivery_uuid",
    "status": "received",
    "message": "Webhook accepted for processing"
  }
}
```

---

### MEMORY (Hindsight Integration)

---

#### `GET /memory/search`
Explicitly search Hindsight memory (used by chat and risk engine internally).

**Request:**
```json
{
  "query": "database migration failures auth-service",
  "limit": 5,
  "filters": {
    "event_types": ["deployment", "incident"],
    "outcome": "failure",
    "from": "2025-01-01"
  }
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "hindsight_event_id": "hs_evt_abc",
        "event_type": "incident",
        "event_summary": "DB migration on sessions table caused 8min outage",
        "event_occurred_at": "2025-12-12T18:30:00Z",
        "event_outcome": "failure",
        "similarity_score": 0.94,
        "source_url": "/incidents/inc_99zz"
      }
    ],
    "total_retrieved": 3
  }
}
```

---

### SETTINGS

---

#### `GET /org`
Get current organization details.

#### `PATCH /org`
Update organization settings.

#### `GET /org/members`
List org members.

#### `POST /org/members/invite`
Invite a new member.

**Request:**
```json
{ "email": "neha@acmecorp.io", "role": "member" }
```

#### `DELETE /org/members/:user_id`
Remove a member.

#### `GET /api-keys`
List API keys (shows prefix, not full key).

#### `POST /api-keys`
Create a new API key.

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "id": "key_uuid",
    "name": "GitHub Actions Key",
    "key": "piq_live_xxxxxxxxxxxx",
    "key_prefix": "piq_live_xxxx",
    "scopes": ["deployments:write"],
    "message": "Store this key securely. It will not be shown again."
  }
}
```

#### `DELETE /api-keys/:id`
Revoke an API key.

---

## 5. Webhook Payload Schemas (Outbound Notifications)

PipelineIQ sends these to configured Slack/webhook URLs.

### High-Risk Deployment Alert
```json
{
  "event": "high_risk_deployment_detected",
  "org": "Acme Corp",
  "deployment": {
    "id": "dep_11aa22bb",
    "service": "auth-service",
    "version": "v2.4.1",
    "environment": "production",
    "risk_score": 89,
    "risk_level": "high"
  },
  "top_risk_factor": "3 failures in last 14 days for this service",
  "action_url": "https://app.pipelineiq.io/deployments/dep_11aa22bb",
  "timestamp": "2026-06-07T14:00:05Z"
}
```

---

## 6. Rate Limits

| Endpoint Group | Limit |
|----------------|-------|
| Auth endpoints | 10 req/min per IP |
| General API (authenticated) | 300 req/min per org |
| `POST /query` (AI) | 30 req/min per org |
| `POST /webhooks/ingest` | 500 req/min per API key |
| `GET /memory/search` | 60 req/min per org |

Rate limit headers on every response:
```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 247
X-RateLimit-Reset: 1717776060
```

---

## 7. Versioning

- API version in URL: `/v1/`, `/v2/`
- Breaking changes = new major version
- Old versions supported for 12 months after deprecation notice
- Version header also accepted: `API-Version: 2026-06-01`
