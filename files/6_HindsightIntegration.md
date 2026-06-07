# Hindsight Integration Guide — PipelineIQ
## Memory-Driven Operational Intelligence with Hindsight

**Version:** 1.0  
**Date:** June 2026

---

## 1. What is Hindsight?

**Hindsight** is an episodic memory platform for AI agents. Unlike vector databases (which store static embeddings) or traditional databases (which require structured queries), Hindsight is purpose-built for AI agents that need to **remember events over time and retrieve contextually relevant past experiences**.

In human terms: Hindsight is PipelineIQ's long-term memory. Every deployment, failure, and incident gets stored as a memory event. When something new happens, Hindsight retrieves the most semantically relevant past experiences — not just keyword matches, but true contextual similarity.

**Key Hindsight capabilities used by PipelineIQ:**
| Capability | What it does | How PipelineIQ uses it |
|-----------|-------------|------------------------|
| **Store** | Save structured + unstructured event data with metadata | Store every deployment, incident, build failure |
| **Retrieve** | Semantic search over stored memories | Find similar past deploys when computing risk |
| **Filter** | Filter memories by metadata (service, outcome, date) | "Show me only failures for auth-service" |
| **Context Window** | Return memories sized for LLM context | Feed retrieved memories to Claude for analysis |

---

## 2. The Core Concept: Episodic Memory

Traditional DevOps tools answer: *"What happened?"*  
PipelineIQ + Hindsight answers: *"What does the past tell us about what's about to happen?"*

Hindsight stores each event as an **episode** — a rich, contextual snapshot:

```
Episode = {
  what happened (description),
  when it happened (timestamp),
  why it matters (outcome, impact),
  structured metadata (service, env, risk tags),
  embedding (vector representation for semantic search)
}
```

When a new deployment is logged, PipelineIQ queries Hindsight: *"What are the most similar past episodes, and what was their outcome?"* This retrieved context powers:
1. **Risk Score** — weighted by how many similar past events ended badly
2. **Recommendations** — drawn from resolution patterns in past incidents
3. **NL Query answers** — Claude synthesizes past episodes into natural language responses

---

## 3. What Gets Stored in Hindsight

### 3.1 Deployment Episode

Stored when a deployment is logged (manual or webhook).

```json
{
  "event_type": "deployment",
  "timestamp": "2026-06-07T14:00:00Z",
  "content": "auth-service v2.4.1 deployed to production by Arjun Mehta. Changes include OAuth2 PKCE support and a database schema migration (adding pkce_verifier column to sessions table). Linked to PR #142 and ticket ENG-891.",
  "metadata": {
    "org_id": "org_xyz789",
    "service_id": "svc_abc",
    "service_name": "auth-service",
    "environment": "production",
    "version": "v2.4.1",
    "status": "success",
    "risk_score": 67,
    "has_db_migration": true,
    "has_infra_change": true,
    "deployer": "arjun-mehta",
    "day_of_week": 6,
    "hour_utc": 14,
    "outcome": "success"
  }
}
```

**Important:** The `content` field is a **natural language narrative** of the event. This is what Hindsight embeds. The `metadata` is used for filtering. Both together enable powerful semantic retrieval.

### 3.2 Incident Episode

Stored when an incident is created and when it is resolved.

```json
{
  "event_type": "incident",
  "timestamp": "2025-12-12T18:30:00Z",
  "content": "P2 incident: auth-service latency spike in production triggered 8 minutes after deployment of v2.3.8. Root cause: database migration on sessions table took longer than expected under production load, causing session lookup timeouts. Resolved by rolling back to v2.3.7. Lesson: always test migration performance under load in staging before promoting to production.",
  "metadata": {
    "org_id": "org_xyz789",
    "service_id": "svc_abc",
    "service_name": "auth-service",
    "environment": "production",
    "severity": "P2",
    "type": "performance_degradation",
    "root_cause_tags": ["db_migration"],
    "duration_minutes": 8,
    "outcome": "failure",
    "linked_deployment_version": "v2.3.8",
    "resolution_method": "rollback"
  }
}
```

### 3.3 Build Failure Episode

```json
{
  "event_type": "build_failure",
  "timestamp": "2026-06-06T10:15:00Z",
  "content": "Build failure in auth-service during test stage on branch feat/oauth-pkce. Test auth.spec.js:42 failed with assertion error: expected 200 but received 401. This is a regression introduced by the new PKCE token validation middleware.",
  "metadata": {
    "org_id": "org_xyz789",
    "service_id": "svc_abc",
    "service_name": "auth-service",
    "stage": "test",
    "failure_type": "test_failure",
    "branch": "feat/oauth-pkce",
    "outcome": "failure"
  }
}
```

---

## 4. Hindsight API Integration

### 4.1 Storing a Memory

```javascript
// hindsight.service.js
const HINDSIGHT_BASE_URL = process.env.HINDSIGHT_API_URL;
const HINDSIGHT_API_KEY = process.env.HINDSIGHT_API_KEY;

async function storeMemory(episode) {
  const response = await fetch(`${HINDSIGHT_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HINDSIGHT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: episode.content,        // natural language narrative
      timestamp: episode.timestamp,
      metadata: episode.metadata,      // structured filters
    })
  });

  const data = await response.json();
  return data.event_id;                // Hindsight's ID — store in memory_events table
}
```

### 4.2 Retrieving Similar Memories

```javascript
async function retrieveSimilarMemories(query, filters = {}, limit = 5) {
  const response = await fetch(`${HINDSIGHT_BASE_URL}/events/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HINDSIGHT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,                          // natural language query
      metadata_filters: filters,      // structured filters
      limit,
      min_similarity: 0.65,           // only retrieve meaningfully similar events
    })
  });

  const data = await response.json();
  return data.events;                 // array of { event_id, content, metadata, similarity_score }
}
```

---

## 5. Where Hindsight Fits in the PipelineIQ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PipelineIQ Backend                        │
│                                                                   │
│  ┌────────────┐    ┌──────────────────┐    ┌────────────────┐   │
│  │  Webhook   │    │  Deployment/     │    │  AI Query      │   │
│  │  Ingest    │───▶│  Incident API    │───▶│  Engine (NL)   │   │
│  │  Service   │    │  Controllers     │    │  (Claude API)  │   │
│  └────────────┘    └──────────────────┘    └───────┬────────┘   │
│                             │                       │             │
│                    ┌────────▼──────────┐            │             │
│                    │  Hindsight        │◀───────────┘             │
│                    │  Memory Service   │                          │
│                    │  (store/retrieve) │                          │
│                    └────────┬──────────┘                          │
│                             │                                      │
│                    ┌────────▼──────────┐                          │
│                    │  Risk Scoring     │                          │
│                    │  Engine           │                          │
│                    └───────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────▼──────────┐
                    │    HINDSIGHT      │
                    │  Memory Platform  │
                    │  (External API)   │
                    └───────────────────┘
                             │
                    ┌────────▼──────────┐
                    │   PostgreSQL DB   │
                    │  (memory_events   │
                    │   sync table)     │
                    └───────────────────┘
```

---

## 6. Risk Scoring with Hindsight

The risk engine runs whenever a new deployment is logged. Here's the full implementation pattern:

```javascript
// risk-engine.service.js
async function computeRiskScore(deployment) {
  const service = await getService(deployment.service_id);
  const environment = await getEnvironment(deployment.environment_id);

  // 1. Build a rich natural language description of the deployment
  const deploymentDescription = buildDeploymentNarrative(deployment, service, environment);
  // e.g.: "auth-service v2.4.1 being deployed to production on Friday afternoon.
  //        Includes a database schema migration on sessions table.
  //        PR includes 847 lines changed across auth and session modules."

  // 2. Retrieve similar past events from Hindsight
  const similarEvents = await retrieveSimilarMemories(
    deploymentDescription,
    {
      org_id: deployment.org_id,
      service_name: service.name,
    },
    limit: 10
  );

  // 3. Compute risk factors
  const factors = [];
  let totalScore = 0;

  // Factor A: Historical failure rate from similar events (from Hindsight)
  const failedSimilarEvents = similarEvents.filter(e => e.metadata.outcome === 'failure');
  if (similarEvents.length > 0) {
    const failureRate = failedSimilarEvents.length / similarEvents.length;
    const historicalScore = Math.round(failureRate * 40); // max 40 points
    totalScore += historicalScore;
    if (historicalScore > 10) {
      factors.push({
        label: `${failedSimilarEvents.length}/${similarEvents.length} similar past deploys caused failures`,
        weight: historicalScore,
        category: 'historical'
      });
    }
  }

  // Factor B: Infrastructure change risk
  if (deployment.infra_changes?.some(c => c.change_type === 'db_migration')) {
    totalScore += 20;
    factors.push({ label: 'Database migration included', weight: 20, category: 'infra' });
  }

  // Factor C: Temporal risk (Friday afternoon = high risk)
  const deployTime = new Date(deployment.started_at || Date.now());
  const dayOfWeek = deployTime.getUTCDay(); // 0=Sun, 5=Fri
  const hourUTC = deployTime.getUTCHours();
  if (dayOfWeek === 5 && hourUTC >= 14) {
    totalScore += 18;
    factors.push({ label: 'Friday afternoon deploy (historically risky)', weight: 18, category: 'temporal' });
  }

  // Factor D: Recent failure streak for this service
  const recentFailures = await getRecentBuildFailures(deployment.service_id, 14);
  if (recentFailures.length >= 2) {
    const streakScore = Math.min(recentFailures.length * 6, 22);
    totalScore += streakScore;
    factors.push({ label: `${recentFailures.length} failures in last 14 days`, weight: streakScore, category: 'historical' });
  }

  // 4. Generate recommendations using Claude + Hindsight context
  const recommendations = await generateRecommendations(
    deployment, factors, similarEvents, service
  );

  return {
    risk_score: Math.min(totalScore, 100),
    risk_level: getRiskLevel(totalScore),
    factors,
    recommendations,
    hindsight_memories: similarEvents.slice(0, 3).map(e => ({
      event_type: e.metadata.event_type,
      event_summary: e.content.substring(0, 200),
      event_occurred_at: e.timestamp,
      event_outcome: e.metadata.outcome,
      similarity_score: e.similarity_score,
    }))
  };
}

function getRiskLevel(score) {
  if (score < 30) return 'low';
  if (score < 55) return 'medium';
  if (score < 75) return 'elevated';
  return 'high';
}
```

---

## 7. Natural Language Query with Hindsight + Claude

```javascript
// query-engine.service.js
async function answerQuery(query, orgId, conversationHistory = []) {
  // 1. Retrieve relevant memories from Hindsight
  const memories = await retrieveSimilarMemories(
    query,
    { org_id: orgId },
    limit: 8
  );

  // 2. Format memories as context for Claude
  const memoryContext = memories.map((event, i) =>
    `[Memory ${i+1}] Type: ${event.metadata.event_type} | Date: ${event.timestamp}
     Outcome: ${event.metadata.outcome} | Similarity: ${Math.round(event.similarity_score * 100)}%
     Details: ${event.content}`
  ).join('\n\n');

  // 3. Build Claude prompt
  const systemPrompt = `You are PipelineIQ, a DevOps intelligence agent. 
You have access to the organization's operational memory, retrieved from Hindsight.
Answer the user's question using the provided memory context.
Be specific, cite dates and versions when available.
If the memory doesn't contain enough information, say so honestly.
Always suggest actionable next steps when relevant.`;

  const userMessage = `
Memory context retrieved from Hindsight:
${memoryContext}

User question: ${query}
`;

  // 4. Call Claude
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ]
    })
  });

  const data = await response.json();
  return {
    answer: data.content[0].text,
    hindsight_events_used: memories.length,
    sources: extractSourceLinks(memories),
  };
}
```

---

## 8. Event Lifecycle: End-to-End Flow

```
1. Developer triggers deploy (manual form or CI/CD webhook)
          │
2. PipelineIQ logs deployment to PostgreSQL (deployments table)
          │
3. Hindsight Memory Service called:
   a. Build narrative (deployment description as natural language)
   b. POST to Hindsight /events → receive hindsight_event_id
   c. Store hindsight_event_id in deployment record
   d. Insert into memory_events (sync log)
          │
4. Risk Engine runs (async, ~3-5 seconds):
   a. Query Hindsight for similar past events (semantic search)
   b. Compute risk score from retrieved memories + local DB factors
   c. Generate recommendations via Claude with Hindsight context
   d. Store risk_analysis record
   e. Emit WebSocket event to frontend (risk ready)
          │
5. Frontend renders risk panel with:
   - Risk score + breakdown
   - Top 3 Hindsight memory cards (most similar past events)
   - AI recommendations
          │
6. If incident occurs → repeat for incident:
   a. Incident stored → Hindsight memory updated
   b. Link incident to triggering deployment in DB
   c. Future risk analyses for same service now incorporate this incident
```

---

## 9. Hindsight Best Practices for This Project

### Write Rich Narratives
Don't just store raw data. The `content` field should read like a human engineer wrote it. Hindsight's semantic search is only as good as the text you provide.

```
BAD:  "auth-service v2.4.1 production deploy status:success"
GOOD: "auth-service v2.4.1 deployed to production on Friday afternoon by Arjun. 
       Change includes OAuth2 PKCE support and a database schema migration on the 
       sessions table. Previous version was v2.3.9. PR #142 included 847 lines changed."
```

### Use Metadata Filters to Scope Retrieval
Always filter by `org_id` to prevent cross-org memory leakage. Filter by `service_name` when doing service-specific risk analysis.

### Store on Write, Not Just on Success
Store the memory event **when a deployment is logged**, not when it succeeds. The risk analysis may need to reference failed deployments too.

### Update Memories on Outcome Change
When an incident is linked to a deployment, update the deployment's Hindsight memory with the outcome:

```javascript
await hindsight.updateEvent(hindsightEventId, {
  metadata: {
    ...existingMetadata,
    outcome: 'failure',
    linked_incident_id: incident.id,
    incident_severity: incident.severity,
  }
});
```

### Memory Window
Set a memory window in organization settings (default: 180 days). Filter Hindsight queries to stay within this window to keep results relevant and avoid overly stale context:

```javascript
const fromDate = new Date();
fromDate.setDate(fromDate.getDate() - org.settings.hindsight_memory_window_days);

const memories = await retrieveSimilarMemories(query, {
  org_id: orgId,
  from: fromDate.toISOString(),
});
```

---

## 10. Environment Variables Required

```bash
# Hindsight
HINDSIGHT_API_URL=https://api.hindsight.ai/v1
HINDSIGHT_API_KEY=hs_live_xxxxxxxxxxxx

# Anthropic (for NL Query + Recommendations)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx

# Database
DATABASE_URL=postgresql://user:pass@host:5432/pipelineiq

# App
JWT_SECRET=your_jwt_secret_here
WEBHOOK_SECRET=your_webhook_secret_here
```

---

## 11. Local Development Mock

During hackathon development, if Hindsight API access is unavailable, use this simple mock:

```javascript
// hindsight.mock.js
const MOCK_MEMORIES = [
  {
    event_id: 'mock_1',
    content: 'auth-service v2.3.8 deployed to production with DB migration — caused P2 incident, 8min downtime',
    timestamp: '2025-12-12T18:30:00Z',
    metadata: { service_name: 'auth-service', outcome: 'failure', event_type: 'incident' },
    similarity_score: 0.94,
  },
  {
    event_id: 'mock_2',
    content: 'auth-service v2.2.1 deployed Tuesday morning, no issues — DB migration ran cleanly',
    timestamp: '2025-10-07T09:00:00Z',
    metadata: { service_name: 'auth-service', outcome: 'success', event_type: 'deployment' },
    similarity_score: 0.81,
  }
];

export async function retrieveSimilarMemories(query, filters, limit) {
  // Return mock data for demo
  return MOCK_MEMORIES.slice(0, limit);
}

export async function storeMemory(episode) {
  console.log('[MOCK] Stored to Hindsight:', episode.content.substring(0, 80));
  return `mock_evt_${Date.now()}`;
}
```
