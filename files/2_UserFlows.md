# User Flows — PipelineIQ
## DevOps Pipeline Agent

**Version:** 1.0  
**Date:** June 2026

---

## Overview

All flows begin at the Landing Page (`/`) and proceed through authentication. The system is web-first. Flows are organized by user journey and labeled with page routes.

---

## Flow 1: Onboarding — Sign Up & Organization Setup

```
Landing Page (/)
    │
    ├── [Click "Get Started"] ──▶ Sign Up Page (/auth/signup)
    │                               │
    │                               ├── Enter: Name, Work Email, Password
    │                               ├── Click "Create Account"
    │                               └── Email verification sent
    │                                       │
    │                               Verify Email (/auth/verify)
    │                                       │
    │                               Organization Setup (/onboarding/org)
    │                                       │
    │                               ├── Enter: Org Name, Team Size, Primary CI/CD tool
    │                               ├── [Optional] Connect GitHub / GitLab / Jenkins
    │                               └── Click "Set Up My Pipeline"
    │                                       │
    │                               Webhook Setup Guide (/onboarding/webhooks)
    │                                       │
    │                               ├── Copy webhook URL
    │                               ├── Add to CI/CD tool
    │                               └── Click "Done, take me to dashboard"
    │                                       │
    └───────────────────────────────▶ Dashboard (/dashboard)
```

---

## Flow 2: Returning User — Login

```
Landing Page (/)
    │
    ├── [Click "Log In"] ──▶ Login Page (/auth/login)
    │                           │
    │                           ├── Enter: Email, Password
    │                           ├── [Option] "Login with SSO"
    │                           └── Click "Sign In"
    │                                   │
    │                           ┌───────┴────────┐
    │                     [Success]          [MFA Required]
    │                           │                │
    │                     Dashboard         MFA Page (/auth/mfa)
    │                   (/dashboard)             │
    │                                      Enter OTP code
    │                                           │
    │                                      Dashboard (/dashboard)
```

---

## Flow 3: Dashboard → View Deployment Timeline

```
Dashboard (/dashboard)
    │
    ├── View: Health summary cards (all services)
    ├── View: Deployment timeline (last 7 days, color-coded by risk)
    ├── View: Active incidents banner (if any)
    │
    ├── [Click on a service card] ──▶ Service Detail Page (/services/:serviceId)
    │                                       │
    │                               ├── Deployment history list
    │                               ├── Risk trend chart (30 days)
    │                               ├── Incident frequency heatmap
    │                               └── [Click a deployment] ──▶ Deployment Detail (/deployments/:id)
    │                                                                   │
    │                                                           ├── Deployment metadata
    │                                                           ├── Risk score breakdown
    │                                                           ├── Hindsight memory panel:
    │                                                           │     "3 similar past events found"
    │                                                           └── Recommended actions
    │
    └── [Click "View Full Timeline"] ──▶ Timeline Page (/timeline)
                                            │
                                    ├── Filter by: Service, Environment, Date range
                                    ├── Toggle: Show incidents overlay
                                    └── Click any event → Deployment or Incident Detail
```

---

## Flow 4: Log a New Deployment (Manual Entry)

```
Dashboard (/dashboard) or any page
    │
    [Click "+ New Deployment" button]
    │
    ▼
New Deployment Modal / Page (/deployments/new)
    │
    ├── Step 1: Basics
    │       ├── Select Service (dropdown)
    │       ├── Select Environment (Dev / Staging / Production)
    │       ├── Version / Tag (text field)
    │       └── Description / Change Summary (textarea)
    │
    ├── Step 2: Context
    │       ├── Link PR / Commit URL (optional)
    │       ├── Link Jira/Linear ticket (optional)
    │       └── Any infrastructure changes? (Yes / No toggle → if Yes, describe)
    │
    ├── [Click "Analyze Risk Before Deploying"]
    │       │
    │       ▼
    │   Risk Analysis Panel (inline)
    │       ├── Risk Score: [0–100] with color (green/yellow/red)
    │       ├── Top risk factors (3 bullet points)
    │       ├── Hindsight memory: "Similar past deployments retrieved"
    │       │       └── List: Date | Service | Outcome | Similarity Score
    │       └── Recommendations: ["Run smoke tests", "Avoid Friday 5pm deploys", ...]
    │
    ├── [Click "Log Deployment"] ──▶ Deployment saved
    │                                       │
    │                               ├── Toast: "Deployment logged ✓"
    │                               └── Redirect to Deployment Detail page (/deployments/:id)
    │
    └── [Click "Cancel"] ──▶ Return to previous page
```

---

## Flow 5: Log a Build Failure or Incident

```
Dashboard (/dashboard)
    │
    [Click "+ Log Incident / Failure"]
    │
    ▼
New Incident Page (/incidents/new)
    │
    ├── Type: [Build Failure | Deployment Failure | Production Incident | Performance Degradation]
    ├── Affected Service (multi-select)
    ├── Severity: [P1 — Critical | P2 — High | P3 — Medium | P4 — Low]
    ├── Title / Short Description
    ├── Timeline: Start time, End time (or "Ongoing")
    ├── Root Cause Tags (multi-select: DB Migration, Config Change, Memory Leak, etc.)
    ├── Resolution Summary (textarea)
    └── Link to related Deployment (search/select)
            │
    [Click "Save Incident"]
            │
    ├── Hindsight stores event in memory
    ├── Toast: "Incident logged. Memory updated."
    └── Redirect to Incident Detail (/incidents/:id)
                    │
            ├── Full incident timeline
            ├── Linked deployments
            ├── AI-generated: "Lessons Learned" summary
            └── Button: "Create Post-Mortem Document"
```

---

## Flow 6: Natural Language Query (AI Chat)

```
Any Page
    │
    [Click chat bubble icon (bottom-right)] or navigate to (/chat)
    │
    ▼
AI Query Interface (/chat)
    │
    ├── Suggested prompts shown on first load:
    │       • "What went wrong the last time auth-service was deployed to prod?"
    │       • "Which services failed most often in Q1?"
    │       • "Show me all incidents linked to database migrations"
    │
    ├── User types query in text input
    │       │
    │       [Press Enter / Click Send]
    │       │
    │   Agent processes query:
    │       ├── Hindsight retrieves relevant memory events
    │       ├── LLM synthesizes answer with citations
    │       └── Response rendered in chat bubble
    │               ├── Text answer
    │               ├── Linked event cards (clickable)
    │               └── [Optional] Chart / table if query was analytical
    │
    ├── User follows up: "And what was the resolution?"
    │       └── Conversational context maintained in session
    │
    └── [Click "Export Conversation"] ──▶ Download as PDF or copy to clipboard
```

---

## Flow 7: View Analytics & Export

```
Dashboard (/dashboard)
    │
    [Click "Analytics" in sidebar]
    │
    ▼
Analytics Page (/analytics)
    │
    ├── Default view: Last 30 days, all services, all environments
    │
    ├── Charts shown:
    │       ├── Deployment frequency over time (line chart)
    │       ├── Failure rate by service (bar chart)
    │       ├── Risk score distribution (histogram)
    │       ├── MTTR trend (mean time to recovery)
    │       └── Top failure categories (donut chart)
    │
    ├── Filter Panel (sidebar):
    │       ├── Date range picker
    │       ├── Service multi-select
    │       ├── Environment filter
    │       └── Incident severity filter
    │               │
    │       [Apply Filters] ──▶ Charts update dynamically
    │
    └── [Click "Export"]
                │
        ├── Format: [PDF Report | CSV Data | JSON Raw]
        ├── Scope: [Current view | Full history]
        └── [Download] ──▶ File downloaded to browser
```

---

## Flow 8: Settings & Integrations

```
Any Page → [Click avatar / profile icon] → Settings (/settings)
    │
    ├── Profile Tab: Update name, email, password
    │
    ├── Organization Tab:
    │       ├── Org name, logo
    │       └── Manage members (invite, remove, change role)
    │
    ├── Integrations Tab (/settings/integrations):
    │       ├── GitHub — [Connect / Disconnect] — enables auto-ingestion of deployments
    │       ├── GitLab — [Connect / Disconnect]
    │       ├── Jenkins — Copy webhook URL
    │       ├── PagerDuty — [Connect] — auto-import incidents
    │       └── Slack — [Connect] — enable bot notifications
    │
    ├── Webhooks Tab (/settings/webhooks):
    │       ├── View inbound webhook URL (copy button)
    │       ├── Webhook secret key
    │       └── Event log (last 50 webhook deliveries with status)
    │
    └── Notifications Tab:
            ├── Email alerts: High-risk deploy detected
            ├── Email alerts: New incident logged
            └── Slack DM: Risk score > threshold
```

---

## Flow Summary Map

```
/ (Landing)
├── /auth/signup → /auth/verify → /onboarding/org → /onboarding/webhooks → /dashboard
├── /auth/login → [/auth/mfa] → /dashboard
│
/dashboard
├── /services/:id → /deployments/:id
├── /timeline
├── /deployments/new → /deployments/:id
├── /incidents/new → /incidents/:id
├── /chat
├── /analytics
└── /settings → /settings/integrations, /settings/webhooks
```
