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
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalyticsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/filter.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/lib/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AnalyticsPage() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        deployments: [],
        incidents: []
    });
    const [serviceFilter, setServiceFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [envFilter, setEnvFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsPage.useEffect": ()=>{
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredData"])();
            setData({
                deployments: stored.deployments,
                incidents: stored.incidents
            });
        }
    }["AnalyticsPage.useEffect"], []);
    // Filter calculations
    const filteredDeps = data.deployments.filter((d)=>{
        if (serviceFilter !== 'all' && d.service !== serviceFilter) return false;
        if (envFilter !== 'all' && d.status !== envFilter) return false;
        return true;
    });
    const filteredIncs = data.incidents.filter((i)=>{
        if (serviceFilter !== 'all' && i.service !== serviceFilter) return false;
        return true;
    });
    // Calculate MTTR (Mean Time to Recovery) - mock average
    const activeIncidents = filteredIncs.filter((i)=>i.status === 'Active');
    const resolvedIncidents = filteredIncs.filter((i)=>i.status === 'Resolved');
    // Custom SVG Charts
    const chartW = 500;
    const chartH = 150;
    // 1. Deployments per day (stacked area visual mock representation)
    const deployData = [
        4,
        6,
        8,
        5,
        9,
        12,
        8,
        14,
        10,
        12,
        9,
        11,
        15,
        10,
        8,
        12,
        14,
        16,
        11,
        9,
        13,
        15,
        17,
        12,
        10,
        8,
        11,
        14,
        12,
        10
    ];
    const maxDeploy = Math.max(...deployData);
    const getAreaPaths = (vals)=>{
        const points = vals.map((v, i)=>{
            const x = i / (vals.length - 1) * chartW;
            const y = chartH - v / maxDeploy * chartH * 0.7 - chartH * 0.1;
            return {
                x,
                y
            };
        });
        const linePath = points.map((p, i)=>`${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
        const areaPath = `${linePath} L ${chartW} ${chartH} L 0 ${chartH} Z`;
        return {
            linePath,
            areaPath
        };
    };
    const deployPaths = getAreaPaths(deployData);
    // 2. Incident severity distribution (bar chart)
    const severityCounts = {
        P1: filteredIncs.filter((i)=>i.severity === 'P1').length,
        P2: filteredIncs.filter((i)=>i.severity === 'P2').length,
        P3: filteredIncs.filter((i)=>i.severity === 'P3').length,
        P4: filteredIncs.filter((i)=>i.severity === 'P4').length || 0
    };
    const maxSeverity = Math.max(...Object.values(severityCounts), 1);
    // Heatmap: Day of Week (7 days) x Hour of Day (24 hours -> mock as 12 groupings for space)
    // 0 = low deployments, 4 = heavy deployments. Peak is Friday afternoon (Day 4, Hour 8-9)
    const days = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];
    const hours = [
        '00-02',
        '02-04',
        '04-06',
        '06-08',
        '08-10',
        '10-12',
        '12-14',
        '14-16',
        '16-18',
        '18-20',
        '20-22',
        '22-00'
    ];
    const getHeatmapColor = (dayIdx, hourIdx)=>{
        // Friday afternoon (Fri = index 4, 16-18 = index 8) is peak-risk deployments
        if (dayIdx === 4 && hourIdx === 8) return 'bg-[#EF4444] shadow-[#EF4444]/20 hover:scale-110'; // Red - high risk deploy block
        if (dayIdx === 4 && hourIdx === 7) return 'bg-[#F97316]'; // Orange
        if (dayIdx === 4 && hourIdx === 9) return 'bg-[#F97316]'; // Orange
        // Normal schedule distributions
        const val = (dayIdx * hourIdx + 3) % 5;
        if (val === 4) return 'bg-[#4F7FFF]/60'; // Blue medium-high
        if (val === 3) return 'bg-[#4F7FFF]/40'; // Blue medium
        if (val === 2) return 'bg-[#4F7FFF]/25'; // Blue low-medium
        if (val === 1) return 'bg-[#4F7FFF]/10'; // Blue low
        return 'bg-[#1C2030]/30 border border-[#2A2F45]/50'; // Empty
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 space-y-8 animate-fade-in max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold tracking-tight text-[#F0F2FF]",
                                children: "Analytics Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#8B91B5] mt-1",
                                children: "Operational metrics and retrospective risk analytics"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3 w-full md:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 bg-[#13161E] border border-[#2A2F45] rounded-lg px-2.5 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 12,
                                        className: "text-[#8B91B5]"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: serviceFilter,
                                        onChange: (e)=>setServiceFilter(e.target.value),
                                        className: "bg-transparent text-xs text-[#F0F2FF] focus:outline-none pr-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All Services"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "auth-service",
                                                children: "auth-service"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "payment-service",
                                                children: "payment-service"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "api-gateway",
                                                children: "api-gateway"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "notification-service",
                                                children: "notification-service"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 bg-[#13161E] border border-[#2A2F45] rounded-lg px-2.5 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 12,
                                        className: "text-[#8B91B5]"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: envFilter,
                                        onChange: (e)=>setEnvFilter(e.target.value),
                                        className: "bg-transparent text-xs text-[#F0F2FF] focus:outline-none pr-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All Environments"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Dev",
                                                children: "Dev"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Staging",
                                                children: "Staging"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Production",
                                                children: "Production"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-[#1C2030] hover:bg-[#232840] border border-[#2A2F45] text-xs font-semibold px-4 py-2 rounded-lg text-[#F0F2FF] flex items-center gap-2 transition-colors ml-auto md:ml-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    " Export Report"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-4 gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-5 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-[#8B91B5] uppercase tracking-wider",
                                children: "Total Deploys"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-extrabold text-[#F0F2FF]",
                                children: filteredDeps.length
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-[#22C55E] font-medium bg-[#22C55E]/10 px-2 py-0.25 rounded-full border border-[#22C55E]/10",
                                children: "Stable Trend"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-5 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-[#8B91B5] uppercase tracking-wider",
                                children: "Incident Frequency"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-extrabold text-[#F97316]",
                                children: filteredIncs.length
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-[#EF4444] font-medium bg-[#EF4444]/10 px-2 py-0.25 rounded-full border border-[#EF4444]/10",
                                children: [
                                    activeIncidents.length,
                                    " Active Incidents"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-5 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-[#8B91B5] uppercase tracking-wider",
                                children: "Avg MTTR (Outages)"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-extrabold text-[#F0F2FF]",
                                children: "2h 14m"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-[#22C55E] font-medium bg-[#22C55E]/10 px-2 py-0.25 rounded-full border border-[#22C55E]/10",
                                children: "↓ 15% from last month"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-5 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-[#8B91B5] uppercase tracking-wider",
                                children: "Hindsight Recall Rate"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-extrabold text-[#A78BFA]",
                                children: "94.6%"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-[#A78BFA] font-medium bg-[#A78BFA]/10 px-2 py-0.25 rounded-full border border-[#A78BFA]/10",
                                children: "Episodic Cache Active"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center pb-2 border-b border-[#2A2F45]/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-bold uppercase tracking-wider text-[#8B91B5]",
                                        children: "Deployments Ingestion Rate"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[#8B91B5] font-semibold bg-[#1C2030] px-2 py-0.5 rounded border border-[#2A2F45]",
                                        children: "30 Days"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-40 w-full relative pt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: `0 0 ${chartW} ${chartH}`,
                                    className: "w-full h-full overflow-visible",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "areaGrad",
                                                x1: "0",
                                                y1: "0",
                                                x2: "0",
                                                y2: "1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "0%",
                                                        stopColor: "#4F7FFF",
                                                        stopOpacity: "0.25"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "100%",
                                                        stopColor: "#4F7FFF",
                                                        stopOpacity: "0.0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "0",
                                            y1: chartH * 0.3,
                                            x2: chartW,
                                            y2: chartH * 0.3,
                                            className: "stroke-[#2A2F45]/30",
                                            strokeDasharray: "3 3"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "0",
                                            y1: chartH * 0.6,
                                            x2: chartW,
                                            y2: chartH * 0.6,
                                            className: "stroke-[#2A2F45]/30",
                                            strokeDasharray: "3 3"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "0",
                                            y1: chartH * 0.9,
                                            x2: chartW,
                                            y2: chartH * 0.9,
                                            className: "stroke-[#2A2F45]/30",
                                            strokeDasharray: "3 3"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: deployPaths.areaPath,
                                            fill: "url(#areaGrad)"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: deployPaths.linePath,
                                            fill: "none",
                                            className: "stroke-[#4F7FFF]",
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-bg rounded-xl p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center pb-2 border-b border-[#2A2F45]/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-bold uppercase tracking-wider text-[#8B91B5]",
                                        children: "Incidents Severity Distribution"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[#8B91B5] font-semibold bg-[#1C2030] px-2 py-0.5 rounded border border-[#2A2F45]",
                                        children: "All-Time"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-40 w-full flex items-end justify-around pb-2 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 top-0 border-b border-[#2A2F45]/30 border-dashed"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 top-1/2 border-b border-[#2A2F45]/30 border-dashed"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-2 w-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 bg-[#EF4444] rounded-t-lg transition-all duration-500 shadow-lg shadow-[#EF4444]/10",
                                                style: {
                                                    height: `${severityCounts.P1 / maxSeverity * 100}px`,
                                                    minHeight: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-mono font-bold text-[#F0F2FF]",
                                                children: [
                                                    "P1 (",
                                                    severityCounts.P1,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 215,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-2 w-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 bg-[#F97316] rounded-t-lg transition-all duration-500 shadow-lg shadow-[#F97316]/10",
                                                style: {
                                                    height: `${severityCounts.P2 / maxSeverity * 100}px`,
                                                    minHeight: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-mono font-bold text-[#F0F2FF]",
                                                children: [
                                                    "P2 (",
                                                    severityCounts.P2,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-2 w-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 bg-[#EAB308] rounded-t-lg transition-all duration-500 shadow-lg shadow-[#EAB308]/10",
                                                style: {
                                                    height: `${severityCounts.P3 / maxSeverity * 100}px`,
                                                    minHeight: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 229,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-mono font-bold text-[#F0F2FF]",
                                                children: [
                                                    "P3 (",
                                                    severityCounts.P3,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-2 w-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 bg-[#22D3EE] rounded-t-lg transition-all duration-500 shadow-lg shadow-[#22D3EE]/10",
                                                style: {
                                                    height: `${severityCounts.P4 / maxSeverity * 100}px`,
                                                    minHeight: '6px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-mono font-bold text-[#F0F2FF]",
                                                children: [
                                                    "P4 (",
                                                    severityCounts.P4,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card-bg rounded-xl p-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-[#2A2F45]/50 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-bold uppercase tracking-wider text-[#8B91B5]",
                                        children: "Deployments Window Frequency & Risk Heatmap"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-[#8B91B5] mt-0.5",
                                        children: "Retrospective assessment of pipeline runs based on hour and day index"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 text-[10px] font-bold text-[#8B91B5]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Low risk"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 bg-[#4F7FFF]/10 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 bg-[#4F7FFF]/40 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 bg-[#4F7FFF]/60 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2.5 h-2.5 bg-[#EF4444] rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "High Risk deploy window"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4 flex items-center gap-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#EF4444]/20 p-2 rounded-lg text-[#EF4444]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                    size: 16,
                                    className: "animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold text-[#F0F2FF]",
                                        children: "Critical Risk Window Identified"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[#8B91B5] mt-0.5",
                                        children: [
                                            "Deployments triggered on ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#EF4444] font-semibold",
                                                children: "Fridays between 16:00 and 18:00"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 40
                                            }, this),
                                            " are your riskiest window. SRE records indicate an ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-white",
                                                children: "88.3% regression outage rate"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 176
                                            }, this),
                                            " resulting in incident recovery efforts exceeding 4 hours."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto select-none pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-[700px] space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-12 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 grid grid-cols-12 gap-1.5 text-center text-[9px] font-bold text-[#8B91B5]",
                                            children: hours.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: h
                                                }, h, false, {
                                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                days.map((day, dIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-12 text-xs font-mono font-bold text-[#8B91B5] shrink-0",
                                                children: day
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 grid grid-cols-12 gap-1.5",
                                                children: hours.map((_, hIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-7 rounded transition-all duration-200 cursor-help ${getHeatmapColor(dIdx, hIdx)}`,
                                                        title: `${day} @ ${hours[hIdx]}: ${dIdx === 4 && hIdx === 8 ? 'CRITICAL RISK (9 deploys, 8 failures)' : dIdx * hIdx % 3 === 0 ? 'Normal deploy traffic (stable)' : 'Zero pipeline runs'}`
                                                    }, hIdx, false, {
                                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, day, true, {
                                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/(dashboard)/analytics/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(AnalyticsPage, "8gxKNvRdr/VN+uNeY01KicG/v3U=");
_c = AnalyticsPage;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Desktop_This%20Is%20Me%20-%20God_Projects_Useful_HackBaroda_180r2cg._.js.map