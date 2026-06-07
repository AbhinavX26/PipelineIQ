(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStoredData",
    ()=>getStoredData,
    "resetStoredData",
    ()=>resetStoredData,
    "saveStoredData",
    ()=>saveStoredData
]);
const INITIAL_DEPLOYMENTS = [
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
const INITIAL_INCIDENTS = [
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
const INITIAL_WEBHOOKS = [
    {
        id: 'wh-001',
        event: 'deployment.created',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        payload: JSON.stringify({
            service: 'auth-service',
            version: 'v2.4.1',
            trigger: 'git.push',
            deployer: 'arjun'
        }, null, 2)
    },
    {
        id: 'wh-002',
        event: 'build.failed',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        payload: JSON.stringify({
            service: 'auth-service',
            pipelineId: 'pr-12',
            stage: 'compile',
            error: 'SyntaxError: Unexpected token'
        }, null, 2)
    },
    {
        id: 'wh-003',
        event: 'deployment.created',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        payload: JSON.stringify({
            service: 'api-gateway',
            version: 'v1.9.0',
            trigger: 'git.push',
            deployer: 'sarah'
        }, null, 2)
    },
    {
        id: 'wh-004',
        event: 'incident.triggered',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        payload: JSON.stringify({
            alertId: 'alert-stripe-err',
            service: 'payment-service',
            metric: 'api_latency_99p',
            threshold: '5000ms'
        }, null, 2)
    }
];
function getStoredData() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const storedDeps = localStorage.getItem('piq_deployments');
    const storedIncs = localStorage.getItem('piq_incidents');
    const storedWhs = localStorage.getItem('piq_webhooks');
    const deployments = storedDeps ? JSON.parse(storedDeps) : INITIAL_DEPLOYMENTS;
    const incidents = storedIncs ? JSON.parse(storedIncs) : INITIAL_INCIDENTS;
    const webhooks = storedWhs ? JSON.parse(storedWhs) : INITIAL_WEBHOOKS;
    if (!storedDeps) localStorage.setItem('piq_deployments', JSON.stringify(INITIAL_DEPLOYMENTS));
    if (!storedIncs) localStorage.setItem('piq_incidents', JSON.stringify(INITIAL_INCIDENTS));
    if (!storedWhs) localStorage.setItem('piq_webhooks', JSON.stringify(INITIAL_WEBHOOKS));
    return {
        deployments,
        incidents,
        webhooks
    };
}
function saveStoredData(data) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
function resetStoredData() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem('piq_deployments');
    localStorage.removeItem('piq_incidents');
    localStorage.removeItem('piq_webhooks');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IncidentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/lib/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/session.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function IncidentsPage() {
    _s();
    const [incidents, setIncidents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newIncident, setNewIncident] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        service: 'payment-service',
        severity: 'P1',
        resolution: '',
        linkedDeploy: 'v1.8.2'
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [expandedLogs, setExpandedLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IncidentsPage.useEffect": ()=>{
            async function load() {
                try {
                    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
                    const headers = token ? {
                        Authorization: `Bearer ${token}`
                    } : {};
                    const res = await fetch('/api/incidents?per_page=100', {
                        headers
                    });
                    if (!res.ok) throw new Error('API unavailable');
                    const json = await res.json();
                    const apiIncidents = (json.data ?? []).map({
                        "IncidentsPage.useEffect.load.apiIncidents": (inc)=>({
                                id: inc.id,
                                type: inc.type ?? 'Production Incident',
                                severity: inc.severity ?? 'P3',
                                title: inc.title,
                                service: inc.service ?? 'unknown',
                                time: inc.started_at ? `Started ${new Date(inc.started_at).toLocaleString()}` : 'Unknown time',
                                duration: inc.duration_minutes ? `${inc.duration_minutes}m` : 'Ongoing',
                                status: inc.status === 'resolved' ? 'Resolved' : 'Active',
                                resolution: inc.resolution_summary ?? inc.description ?? '',
                                linkedDeploy: inc.linked_deployment_ids?.[0] ?? 'unknown',
                                timestamp: inc.created_at ?? new Date().toISOString(),
                                logs: inc.logs ?? []
                            })
                    }["IncidentsPage.useEffect.load.apiIncidents"]);
                    setIncidents(apiIncidents);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveStoredData"])({
                        incidents: apiIncidents
                    });
                } catch  {
                    // Fallback to localStorage if backend is down
                    setIncidents((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredData"])().incidents);
                } finally{
                    setLoading(false);
                }
            }
            load();
        }
    }["IncidentsPage.useEffect"], []);
    const handleCreateIncident = (e)=>{
        e.preventDefault();
        if (!newIncident.title || !newIncident.resolution) {
            alert('Please fill in incident title and resolution details.');
            return;
        }
        const item = {
            id: `inc-${Date.now().toString().slice(-3)}`,
            type: 'Production Incident',
            severity: newIncident.severity,
            title: newIncident.title,
            service: newIncident.service,
            time: 'Started just now',
            duration: 'Ongoing',
            status: 'Active',
            resolution: newIncident.resolution,
            linkedDeploy: newIncident.linkedDeploy,
            timestamp: new Date().toISOString()
        };
        const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredData"])();
        const updated = [
            item,
            ...stored.incidents
        ];
        // update mock webhooks logs too
        const whLog = {
            id: `wh-${Date.now().toString().slice(-3)}`,
            event: 'incident.triggered',
            timestamp: new Date().toISOString(),
            status: 'success',
            payload: JSON.stringify({
                severity: newIncident.severity,
                title: newIncident.title,
                service: newIncident.service
            }, null, 2)
        };
        const updatedWhs = [
            whLog,
            ...stored.webhooks
        ];
        setIncidents(updated);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveStoredData"])({
            incidents: updated,
            webhooks: updatedWhs
        });
        setShowModal(false);
        setNewIncident({
            title: '',
            service: 'payment-service',
            severity: 'P1',
            resolution: '',
            linkedDeploy: 'v1.8.2'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 space-y-8 animate-fade-in max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex justify-between items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold tracking-tight text-[#F0F2FF]",
                                children: "Outages & Failures"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#8B91B5] mt-1",
                                children: "Audit active incident response alerts and resolved post-mortem logs"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowModal(true),
                        className: "bg-[#EF4444] hover:bg-[#EF4444]/90 text-white text-xs px-4 py-2.5 rounded-lg font-bold shadow-lg shadow-[#EF4444]/15 transition-all",
                        children: "+ Log Outage Alert"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: incidents.map((inc)=>{
                    const isActive = inc.status === 'Active';
                    const isP1 = inc.severity === 'P1';
                    let severityColor = 'border-l-[#F97316]';
                    let badgeColor = 'text-[#F97316] bg-[#F97316]/10 border-[#F97316]/20';
                    if (isP1) {
                        severityColor = 'border-l-[#EF4444]';
                        badgeColor = 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20';
                    } else if (inc.severity === 'P3') {
                        severityColor = 'border-l-[#EAB308]';
                        badgeColor = 'text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/20';
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `bg-[#13161E] border border-[#2A2F45] border-l-4 ${severityColor} rounded-xl p-5 space-y-3.5`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 py-0.5 rounded text-[9px] font-bold border ${badgeColor}`,
                                                children: inc.severity
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs font-bold text-[#F0F2FF]",
                                                children: inc.title
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${isActive ? 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20 animate-pulse' : 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20'}`,
                                        children: inc.status
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 text-[10px] text-[#8B91B5]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Service: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-white",
                                                children: inc.service
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Duration: ",
                                            inc.duration
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: [
                                            "Linked Deploy: ",
                                            inc.linkedDeploy
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#8B91B5] leading-relaxed italic border-t border-[#2A2F45]/50 pt-2.5",
                                children: [
                                    "Resolution steps: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[#F0F2FF]",
                                        children: inc.resolution
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this),
                            inc.logs && inc.logs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-[#2A2F45]/50 pt-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setExpandedLogs((prev)=>{
                                                const next = new Set(prev);
                                                if (next.has(inc.id)) next.delete(inc.id);
                                                else next.add(inc.id);
                                                return next;
                                            });
                                        },
                                        className: "flex items-center gap-1.5 text-[10px] font-bold text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 21
                                            }, this),
                                            "Logs (",
                                            inc.logs.length,
                                            ")",
                                            expandedLogs.has(inc.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 49
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 75
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 19
                                    }, this),
                                    expandedLogs.has(inc.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 bg-[#0D0F14] border border-[#2A2F45]/60 rounded-lg p-3 max-h-48 overflow-y-auto space-y-1.5 font-mono",
                                        children: inc.logs.map((log, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full ${log.startsWith('[Build Failure]') ? 'bg-[#EF4444]' : 'bg-[#F97316]'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${log.startsWith('[Build Failure]') ? 'text-[#EF4444]/90' : 'text-[#8B91B5]'} leading-relaxed break-all`,
                                                        children: log
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 188,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                lineNumber: 171,
                                columnNumber: 17
                            }, this)
                        ]
                    }, inc.id, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleCreateIncident,
                    className: "w-full max-w-md bg-[#13161E] border border-[#2A2F45] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-4 border-b border-[#2A2F45]/60 flex justify-between items-center bg-[#1C2030]/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-sm text-[#F0F2FF]",
                                    children: "Log Outage Incident"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowModal(false),
                                    className: "text-[#8B91B5] hover:text-[#F0F2FF] p-1.5 hover:bg-[#1C2030] rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                            lineNumber: 218,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-semibold text-[#8B91B5]",
                                            children: "Incident Title"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newIncident.title,
                                            onChange: (e)=>setNewIncident({
                                                    ...newIncident,
                                                    title: e.target.value
                                                }),
                                            placeholder: "e.g. Memory Leak Spike on Transaction Writes",
                                            className: "w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3.5 py-2.5 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-semibold text-[#8B91B5]",
                                                    children: "Affected Service"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: newIncident.service,
                                                    onChange: (e)=>setNewIncident({
                                                            ...newIncident,
                                                            service: e.target.value
                                                        }),
                                                    className: "w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3 py-2.5 text-xs text-[#F0F2FF] focus:outline-none focus:border-[#4F7FFF]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "auth-service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "payment-service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "api-gateway"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "notification-service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-xs font-semibold text-[#8B91B5]",
                                                    children: "Severity Scale"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: newIncident.severity,
                                                    onChange: (e)=>setNewIncident({
                                                            ...newIncident,
                                                            severity: e.target.value
                                                        }),
                                                    className: "w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3 py-2.5 text-xs text-[#F0F2FF] focus:outline-none focus:border-[#4F7FFF]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "P1 - Critical"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "P2 - High"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            children: "P3 - Medium"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-semibold text-[#8B91B5]",
                                            children: "Linked Deployment Version"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newIncident.linkedDeploy,
                                            onChange: (e)=>setNewIncident({
                                                    ...newIncident,
                                                    linkedDeploy: e.target.value
                                                }),
                                            placeholder: "v1.8.2",
                                            className: "w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3.5 py-2.5 text-xs text-[#F0F2FF] font-mono placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-semibold text-[#8B91B5]",
                                            children: "Resolution Description / Outage Cause"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: newIncident.resolution,
                                            onChange: (e)=>setNewIncident({
                                                    ...newIncident,
                                                    resolution: e.target.value
                                                }),
                                            rows: 3,
                                            placeholder: "Investigating DB locks, preparing hotfix...",
                                            className: "w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3.5 py-2.5 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF]"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-4 border-t border-[#2A2F45]/60 bg-[#1C2030]/30 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowModal(false),
                                    className: "text-xs font-semibold text-[#8B91B5] hover:text-[#F0F2FF] px-4 py-2 transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "bg-[#EF4444] hover:bg-[#EF4444]/90 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all shadow-lg",
                                    children: "Log Outage Alert"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
                lineNumber: 212,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/incidents/page.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(IncidentsPage, "+piLa4ZTWIwY4hcc/bKPpV71a+A=");
_c = IncidentsPage;
var _c;
__turbopack_context__.k.register(_c, "IncidentsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>X
]);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("X", __iconNode);
;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Terminal
]);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "polyline",
        {
            points: "4 17 10 11 4 5",
            key: "akl6gq"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "20",
            y1: "19",
            y2: "19",
            key: "q2wloq"
        }
    ]
];
const Terminal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Terminal", __iconNode);
;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Terminal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript)");
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronDown
]);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ChevronDown", __iconNode);
;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript)");
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronUp
]);
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m18 15-6-6-6 6",
            key: "153udz"
        }
    ]
];
const ChevronUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ChevronUp", __iconNode);
;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=OneDrive_Desktop_This%20Is%20Me%20-%20God_Projects_Useful_HackBaroda_1olyfyn._.js.map