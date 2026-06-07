export interface Deployment {
  id: string;
  service: string;
  version: string;
  risk: number;
  status: string;
  time: string;
  deployer: string;
  changeSummary: string;
  commit: string;
  ticket: string;
  infraChanged: boolean;
  infraSummary?: string;
  timestamp: string;
}

export interface Incident {
  id: string;
  type: string;
  severity: string;
  title: string;
  service: string;
  time: string;
  duration: string;
  status: string;
  resolution: string;
  linkedDeploy: string;
  timestamp: string;
  logs?: string[];
}

export interface WebhookLog {
  id: string;
  event: string;
  timestamp: string;
  status: 'success' | 'failed';
  payload: string;
}

const INITIAL_DEPLOYMENTS: Deployment[] = [
  {
    id: 'dep-101',
    service: 'auth-service',
    version: 'v2.4.1',
    risk: 67,
    status: 'Staging',
    time: '4h ago',
    deployer: '@arjun',
    changeSummary: "Implement JWT rotation and update DB schema for user sessions. Includes migration for 'refresh_tokens' table.",
    commit: 'a1b2c3d',
    ticket: 'PIQ-452',
    infraChanged: true,
    infraSummary: "Added index on user_id inside refresh_tokens table.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dep-102',
    service: 'api-gateway',
    version: 'v1.9.0',
    risk: 18,
    status: 'Production',
    time: '6h ago',
    deployer: '@sarah',
    changeSummary: "Rate limiting adjustments for API paths. Minor bugfix for CORS headers.",
    commit: 'f9e8d7c',
    ticket: 'PIQ-119',
    infraChanged: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dep-103',
    service: 'payment-service',
    version: 'v1.8.2',
    risk: 89,
    status: 'Production',
    time: 'Yesterday',
    deployer: '@alex',
    changeSummary: "Migrate legacy Stripe API client to v3 SDK. Involves critical transaction execution path change.",
    commit: 'b8c9d0e',
    ticket: 'PIQ-731',
    infraChanged: true,
    infraSummary: "Created Stripe webhook listening pipeline endpoint.",
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dep-104',
    service: 'notification-service',
    version: 'v0.7.5',
    risk: 24,
    status: 'Dev',
    time: '2 days ago',
    deployer: '@arjun',
    changeSummary: "Optimize email templating render engine. Reduces CPU utilization under load.",
    commit: 'e2f3g4h',
    ticket: 'PIQ-882',
    infraChanged: false,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'dep-105',
    service: 'payment-service',
    version: 'v1.8.1',
    risk: 42,
    status: 'Staging',
    time: '3 days ago',
    deployer: '@sarah',
    changeSummary: "Add retry logic to failed capture charges endpoints.",
    commit: 'c5d6e7f',
    ticket: 'PIQ-730',
    infraChanged: false,
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
];

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-201',
    type: 'Production Incident',
    severity: 'P1',
    title: 'Latency Spike post-deploy',
    service: 'payment-service',
    time: 'Started 2h ago',
    duration: 'Ongoing',
    status: 'Active',
    resolution: 'Investigating database locks on transaction write tables.',
    linkedDeploy: 'v1.8.2',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inc-202',
    type: 'Build Failure',
    severity: 'P2',
    title: 'Webpack compile syntax error',
    service: 'auth-service',
    time: 'Started 5h ago',
    duration: 'Ongoing',
    status: 'Active',
    resolution: 'Resolving TS syntax incompatibility in middleware wrapper.',
    linkedDeploy: 'v2.4.1',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'inc-203',
    type: 'Performance Degradation',
    severity: 'P3',
    title: 'Memory leak in notification thread',
    service: 'notification-service',
    time: 'Resolved 1d ago',
    duration: '4h 12m',
    status: 'Resolved',
    resolution: 'Garbage collection cycle manually forced, optimized email stream arrays.',
    linkedDeploy: 'v0.7.5',
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString()
  }
];

const INITIAL_WEBHOOKS: WebhookLog[] = [
  {
    id: 'wh-001',
    event: 'deployment.created',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    payload: JSON.stringify({ service: 'auth-service', version: 'v2.4.1', trigger: 'git.push', deployer: 'arjun' }, null, 2)
  },
  {
    id: 'wh-002',
    event: 'build.failed',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    payload: JSON.stringify({ service: 'auth-service', pipelineId: 'pr-12', stage: 'compile', error: 'SyntaxError: Unexpected token' }, null, 2)
  },
  {
    id: 'wh-003',
    event: 'deployment.created',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    payload: JSON.stringify({ service: 'api-gateway', version: 'v1.9.0', trigger: 'git.push', deployer: 'sarah' }, null, 2)
  },
  {
    id: 'wh-004',
    event: 'incident.triggered',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'success',
    payload: JSON.stringify({ alertId: 'alert-stripe-err', service: 'payment-service', metric: 'api_latency_99p', threshold: '5000ms' }, null, 2)
  }
];

export function getStoredData() {
  if (typeof window === 'undefined') {
    return { deployments: INITIAL_DEPLOYMENTS, incidents: INITIAL_INCIDENTS, webhooks: INITIAL_WEBHOOKS };
  }
  
  const storedDeps = localStorage.getItem('piq_deployments');
  const storedIncs = localStorage.getItem('piq_incidents');
  const storedWhs = localStorage.getItem('piq_webhooks');

  const deployments = storedDeps ? JSON.parse(storedDeps) : INITIAL_DEPLOYMENTS;
  const incidents = storedIncs ? JSON.parse(storedIncs) : INITIAL_INCIDENTS;
  const webhooks = storedWhs ? JSON.parse(storedWhs) : INITIAL_WEBHOOKS;

  if (!storedDeps) localStorage.setItem('piq_deployments', JSON.stringify(INITIAL_DEPLOYMENTS));
  if (!storedIncs) localStorage.setItem('piq_incidents', JSON.stringify(INITIAL_INCIDENTS));
  if (!storedWhs) localStorage.setItem('piq_webhooks', JSON.stringify(INITIAL_WEBHOOKS));

  return { deployments, incidents, webhooks };
}

export function saveStoredData(data: { deployments?: Deployment[]; incidents?: Incident[]; webhooks?: WebhookLog[] }) {
  if (typeof window === 'undefined') return;

  if (data.deployments) {
    localStorage.setItem('piq_deployments', JSON.stringify(data.deployments));
  }
  if (data.incidents) {
    localStorage.setItem('piq_incidents', JSON.stringify(data.incidents));
  }
  if (data.webhooks) {
    localStorage.setItem('piq_webhooks', JSON.stringify(data.webhooks));
  }
}

export function resetStoredData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('piq_deployments');
  localStorage.removeItem('piq_incidents');
  localStorage.removeItem('piq_webhooks');
}
