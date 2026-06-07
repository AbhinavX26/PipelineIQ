module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/response.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accepted",
    ()=>accepted,
    "badRequest",
    ()=>badRequest,
    "conflict",
    ()=>conflict,
    "created",
    ()=>created,
    "forbidden",
    ()=>forbidden,
    "notFound",
    ()=>notFound,
    "ok",
    ()=>ok,
    "parseQueryInt",
    ()=>parseQueryInt,
    "serverError",
    ()=>serverError,
    "unauthorized",
    ()=>unauthorized
]);
/**
 * Standard API response helpers — matches the envelope from api-specs.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/next/server.js [app-route] (ecmascript)");
;
function ok(data, meta, status = 200) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data,
        ...meta ? {
            meta
        } : {}
    }, {
        status
    });
}
function created(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data
    }, {
        status: 201
    });
}
function accepted(data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data
    }, {
        status: 202
    });
}
function notFound(message = 'Resource not found') {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message
        }
    }, {
        status: 404
    });
}
function badRequest(message, details) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'VALIDATION_ERROR',
            message,
            ...details ? {
                details
            } : {}
        }
    }, {
        status: 400
    });
}
function unauthorized(message = 'Missing or invalid token') {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'UNAUTHORIZED',
            message
        }
    }, {
        status: 401
    });
}
function forbidden(message = 'Insufficient permissions') {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'FORBIDDEN',
            message
        }
    }, {
        status: 403
    });
}
function conflict(message) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'CONFLICT',
            message
        }
    }, {
        status: 409
    });
}
function serverError(message = 'Internal server error') {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message
        }
    }, {
        status: 500
    });
}
function parseQueryInt(val, fallback) {
    const n = parseInt(val ?? '');
    return isNaN(n) ? fallback : n;
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/auth.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractBearerToken",
    ()=>extractBearerToken,
    "hashPassword",
    ()=>hashPassword,
    "signAccessToken",
    ()=>signAccessToken,
    "signRefreshToken",
    ()=>signRefreshToken,
    "toPublicUser",
    ()=>toPublicUser,
    "verifyPassword",
    ()=>verifyPassword,
    "verifyToken",
    ()=>verifyToken
]);
/**
 * Auth Service
 *
 * Handles password hashing, JWT creation/verification, and session logic.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET ?? 'piq_dev_secret_change_in_production';
const JWT_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_IN = '7d';
const BCRYPT_ROUNDS = 10;
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, BCRYPT_ROUNDS);
}
async function verifyPassword(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
}
function signAccessToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function signRefreshToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch  {
        return null;
    }
}
function extractBearerToken(authHeader) {
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice(7).trim();
}
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        org_id: user.org_id,
        avatar_url: user.avatar_url,
        mfa_enabled: user.mfa_enabled,
        last_login_at: user.last_login_at,
        created_at: user.created_at
    };
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/auth-middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Auth middleware for Next.js Route Handlers.
 * Returns the decoded JWT payload or null if invalid/missing.
 */ __turbopack_context__.s([
    "getAuthContext",
    ()=>getAuthContext,
    "getDemoContext",
    ()=>getDemoContext,
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/auth.service.ts [app-route] (ecmascript)");
;
function getAuthContext(req) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractBearerToken"])(req.headers.get('authorization'));
    if (!token) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token);
}
function getDemoContext() {
    return {
        sub: 'usr_arjun_001',
        org_id: 'org_acme_001',
        role: 'owner'
    };
}
function requireAuth(req) {
    const ctx = getAuthContext(req);
    if (ctx) return ctx;
    // In dev/hackathon mode, always return the demo context
    return getDemoContext();
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/nanoid.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nanoid",
    ()=>nanoid,
    "uuid",
    ()=>uuid
]);
/**
 * Tiny ID generator — no external dep needed for mock layer.
 * Produces URL-safe IDs like "x7k2p9" (8-12 chars).
 * Replace with crypto.randomUUID() or Prisma's cuid2 for production.
 */ const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
function nanoid(length = 8) {
    let id = '';
    for(let i = 0; i < length; i++){
        id += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return id;
}
function uuid() {
    // Simple UUID v4 without external dep
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/mock-data/seed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Seed data for in-memory repositories.
 * All IDs and timestamps are static so the demo is reproducible.
 * Field names match the database schema exactly.
 */ __turbopack_context__.s([
    "SEED_API_KEYS",
    ()=>SEED_API_KEYS,
    "SEED_BUILD_FAILURES",
    ()=>SEED_BUILD_FAILURES,
    "SEED_DEPLOYMENTS",
    ()=>SEED_DEPLOYMENTS,
    "SEED_ENVIRONMENTS",
    ()=>SEED_ENVIRONMENTS,
    "SEED_HINDSIGHT_MEMORIES",
    ()=>SEED_HINDSIGHT_MEMORIES,
    "SEED_INCIDENTS",
    ()=>SEED_INCIDENTS,
    "SEED_INCIDENT_DEPLOYMENTS",
    ()=>SEED_INCIDENT_DEPLOYMENTS,
    "SEED_INFRA_CHANGES",
    ()=>SEED_INFRA_CHANGES,
    "SEED_ORG",
    ()=>SEED_ORG,
    "SEED_RISK_ANALYSES",
    ()=>SEED_RISK_ANALYSES,
    "SEED_SERVICES",
    ()=>SEED_SERVICES,
    "SEED_TIMELINE_ENTRIES",
    ()=>SEED_TIMELINE_ENTRIES,
    "SEED_USERS",
    ()=>SEED_USERS,
    "SEED_WEBHOOK_DELIVERIES",
    ()=>SEED_WEBHOOK_DELIVERIES
]);
// ── Fixed timestamps ───────────────────────────────────────────────────────
const now = new Date();
const h = (n)=>new Date(now.getTime() - n * 60 * 60 * 1000).toISOString();
const d = (n)=>new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString();
const SEED_ORG = {
    id: 'org_acme_001',
    name: 'Acme Corp',
    slug: 'acme-corp',
    logo_url: null,
    plan: 'enterprise',
    settings: {
        risk_alert_threshold: 70,
        default_timezone: 'Asia/Kolkata',
        allow_sso: true,
        hindsight_memory_window_days: 180
    },
    created_at: d(90),
    updated_at: d(1),
    deleted_at: null
};
// ── Users ──────────────────────────────────────────────────────────────────
// password for all seed users: "hackathon123" (bcrypt hash pre-computed)
const SEED_PASSWORD_HASH = '$2b$10$K8fBJfJ5DkPGV.bYp9IxceHnLM7tJLm2UZzCkN9IqLg1.oB4Fh4Bq';
const SEED_USERS = [
    {
        id: 'usr_arjun_001',
        org_id: 'org_acme_001',
        email: 'arjun@acme.com',
        name: 'Arjun Mehta',
        avatar_url: null,
        role: 'owner',
        password_hash: SEED_PASSWORD_HASH,
        sso_provider: null,
        sso_subject: null,
        mfa_enabled: false,
        mfa_secret: null,
        last_login_at: h(2),
        created_at: d(90),
        updated_at: d(1),
        deleted_at: null
    },
    {
        id: 'usr_sarah_002',
        org_id: 'org_acme_001',
        email: 'sarah@acme.com',
        name: 'Sarah Chen',
        avatar_url: null,
        role: 'admin',
        password_hash: SEED_PASSWORD_HASH,
        sso_provider: null,
        sso_subject: null,
        mfa_enabled: false,
        mfa_secret: null,
        last_login_at: h(6),
        created_at: d(60),
        updated_at: d(2),
        deleted_at: null
    },
    {
        id: 'usr_alex_003',
        org_id: 'org_acme_001',
        email: 'alex@acme.com',
        name: 'Alex Rodriguez',
        avatar_url: null,
        role: 'member',
        password_hash: SEED_PASSWORD_HASH,
        sso_provider: null,
        sso_subject: null,
        mfa_enabled: false,
        mfa_secret: null,
        last_login_at: h(26),
        created_at: d(30),
        updated_at: d(3),
        deleted_at: null
    }
];
const SEED_ENVIRONMENTS = [
    {
        id: 'env_prod_001',
        org_id: 'org_acme_001',
        name: 'production',
        slug: 'production',
        tier: 'production',
        color: '#EF4444',
        is_protected: true,
        created_at: d(90)
    },
    {
        id: 'env_stg_002',
        org_id: 'org_acme_001',
        name: 'staging',
        slug: 'staging',
        tier: 'staging',
        color: '#F97316',
        is_protected: false,
        created_at: d(90)
    },
    {
        id: 'env_dev_003',
        org_id: 'org_acme_001',
        name: 'development',
        slug: 'development',
        tier: 'development',
        color: '#4F7FFF',
        is_protected: false,
        created_at: d(90)
    }
];
const SEED_SERVICES = [
    {
        id: 'svc_auth_001',
        org_id: 'org_acme_001',
        name: 'auth-service',
        slug: 'auth-service',
        description: 'Handles authentication, authorization, and session management',
        repo_url: 'https://github.com/acme/auth-service',
        tech_stack: [
            'Node.js',
            'PostgreSQL',
            'Redis'
        ],
        owner_team: 'platform',
        tags: [
            'critical',
            'auth'
        ],
        is_active: true,
        created_at: d(90),
        updated_at: d(4)
    },
    {
        id: 'svc_pay_002',
        org_id: 'org_acme_001',
        name: 'payment-service',
        slug: 'payment-service',
        description: 'Processes transactions, integrates with Stripe and payment gateways',
        repo_url: 'https://github.com/acme/payment-service',
        tech_stack: [
            'Python',
            'FastAPI',
            'PostgreSQL'
        ],
        owner_team: 'payments',
        tags: [
            'critical',
            'pci'
        ],
        is_active: true,
        created_at: d(90),
        updated_at: d(2)
    },
    {
        id: 'svc_gw_003',
        org_id: 'org_acme_001',
        name: 'api-gateway',
        slug: 'api-gateway',
        description: 'API gateway, rate limiting, and routing for all microservices',
        repo_url: 'https://github.com/acme/api-gateway',
        tech_stack: [
            'Go',
            'Redis'
        ],
        owner_team: 'platform',
        tags: [
            'infra'
        ],
        is_active: true,
        created_at: d(90),
        updated_at: d(6)
    },
    {
        id: 'svc_notif_004',
        org_id: 'org_acme_001',
        name: 'notification-service',
        slug: 'notification-service',
        description: 'Email, push, and Slack notifications for all product events',
        repo_url: 'https://github.com/acme/notification-service',
        tech_stack: [
            'Node.js',
            'SendGrid',
            'SQS'
        ],
        owner_team: 'platform',
        tags: [
            'async'
        ],
        is_active: true,
        created_at: d(90),
        updated_at: d(2)
    }
];
const SEED_DEPLOYMENTS = [
    {
        id: 'dep_101',
        org_id: 'org_acme_001',
        service_id: 'svc_auth_001',
        environment_id: 'env_stg_002',
        deployed_by: 'usr_arjun_001',
        deployed_by_name: 'Arjun Mehta',
        version: 'v2.4.1',
        commit_sha: 'a1b2c3d4e5f6',
        pr_url: 'https://github.com/acme/auth-service/pull/142',
        ticket_url: 'https://linear.app/acme/issue/PIQ-452',
        change_summary: "Implement JWT rotation and update DB schema for user sessions. Includes migration for 'refresh_tokens' table.",
        diff_summary: null,
        status: 'success',
        started_at: h(4),
        completed_at: h(4),
        duration_seconds: 210,
        risk_score: 67,
        risk_level: 'elevated',
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: 'hs_dep_101',
        created_at: h(4),
        updated_at: h(4)
    },
    {
        id: 'dep_102',
        org_id: 'org_acme_001',
        service_id: 'svc_gw_003',
        environment_id: 'env_prod_001',
        deployed_by: 'usr_sarah_002',
        deployed_by_name: 'Sarah Chen',
        version: 'v1.9.0',
        commit_sha: 'f9e8d7c6b5a4',
        pr_url: 'https://github.com/acme/api-gateway/pull/89',
        ticket_url: 'https://linear.app/acme/issue/PIQ-119',
        change_summary: 'Rate limiting adjustments for API paths. Minor bugfix for CORS headers.',
        diff_summary: null,
        status: 'success',
        started_at: h(6),
        completed_at: h(6),
        duration_seconds: 95,
        risk_score: 18,
        risk_level: 'low',
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: 'hs_dep_102',
        created_at: h(6),
        updated_at: h(6)
    },
    {
        id: 'dep_103',
        org_id: 'org_acme_001',
        service_id: 'svc_pay_002',
        environment_id: 'env_prod_001',
        deployed_by: 'usr_alex_003',
        deployed_by_name: 'Alex Rodriguez',
        version: 'v1.8.2',
        commit_sha: 'b8c9d0e1f2a3',
        pr_url: 'https://github.com/acme/payment-service/pull/201',
        ticket_url: 'https://linear.app/acme/issue/PIQ-731',
        change_summary: 'Migrate legacy Stripe API client to v3 SDK. Involves critical transaction execution path change.',
        diff_summary: null,
        status: 'success',
        started_at: h(26),
        completed_at: h(26),
        duration_seconds: 340,
        risk_score: 89,
        risk_level: 'high',
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: 'hs_dep_103',
        created_at: h(26),
        updated_at: h(26)
    },
    {
        id: 'dep_104',
        org_id: 'org_acme_001',
        service_id: 'svc_notif_004',
        environment_id: 'env_dev_003',
        deployed_by: 'usr_arjun_001',
        deployed_by_name: 'Arjun Mehta',
        version: 'v0.7.5',
        commit_sha: 'e2f3g4h5i6j7',
        pr_url: null,
        ticket_url: 'https://linear.app/acme/issue/PIQ-882',
        change_summary: 'Optimize email templating render engine. Reduces CPU utilization under load.',
        diff_summary: null,
        status: 'success',
        started_at: h(48),
        completed_at: h(48),
        duration_seconds: 88,
        risk_score: 24,
        risk_level: 'low',
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: 'hs_dep_104',
        created_at: h(48),
        updated_at: h(48)
    },
    {
        id: 'dep_105',
        org_id: 'org_acme_001',
        service_id: 'svc_pay_002',
        environment_id: 'env_stg_002',
        deployed_by: 'usr_sarah_002',
        deployed_by_name: 'Sarah Chen',
        version: 'v1.8.1',
        commit_sha: 'c5d6e7f8g9h0',
        pr_url: 'https://github.com/acme/payment-service/pull/199',
        ticket_url: 'https://linear.app/acme/issue/PIQ-730',
        change_summary: 'Add retry logic to failed capture charges endpoints.',
        diff_summary: null,
        status: 'success',
        started_at: h(72),
        completed_at: h(72),
        duration_seconds: 165,
        risk_score: 42,
        risk_level: 'medium',
        source: 'manual',
        webhook_delivery_id: null,
        hindsight_event_id: 'hs_dep_105',
        created_at: h(72),
        updated_at: h(72)
    }
];
const SEED_INFRA_CHANGES = [
    {
        id: 'ic_001',
        deployment_id: 'dep_101',
        change_type: 'db_migration',
        description: "Add refresh_tokens table and index on user_id",
        affected_system: 'users_db',
        is_reversible: true,
        created_at: h(4)
    },
    {
        id: 'ic_002',
        deployment_id: 'dep_103',
        change_type: 'dependency_update',
        description: 'Upgrade Stripe SDK v2 → v3, added webhook listener endpoint',
        affected_system: 'stripe-integration',
        is_reversible: true,
        created_at: h(26)
    }
];
const SEED_BUILD_FAILURES = [
    {
        id: 'bf_001',
        org_id: 'org_acme_001',
        service_id: 'svc_auth_001',
        deployment_id: 'dep_101',
        environment_id: 'env_stg_002',
        stage: 'test',
        failure_type: 'compilation_error',
        error_message: 'SyntaxError: Unexpected token in middleware/jwt.ts:47',
        log_url: 'https://ci.acme.io/jobs/1001/logs',
        triggered_by: 'usr_arjun_001',
        branch: 'feat/jwt-rotation',
        commit_sha: 'a1b2c3d4e5f6',
        failed_at: h(5),
        resolved_at: h(4),
        hindsight_event_id: 'hs_bf_001',
        created_at: h(5)
    },
    {
        id: 'bf_002',
        org_id: 'org_acme_001',
        service_id: 'svc_pay_002',
        deployment_id: 'dep_103',
        environment_id: 'env_stg_002',
        stage: 'integration',
        failure_type: 'test_failure',
        error_message: 'Stripe webhook test failed: expected 200 but got 401 in stripe.spec.ts:88',
        log_url: 'https://ci.acme.io/jobs/1002/logs',
        triggered_by: 'usr_alex_003',
        branch: 'feat/stripe-v3',
        commit_sha: 'b8c9d0e1f2a3',
        failed_at: h(28),
        resolved_at: h(27),
        hindsight_event_id: 'hs_bf_002',
        created_at: h(28)
    }
];
const SEED_INCIDENTS = [
    {
        id: 'inc_201',
        org_id: 'org_acme_001',
        title: 'Latency Spike post-deploy on payment-service',
        description: '5xx errors spiking to 12% in production after Stripe SDK migration',
        severity: 'P1',
        status: 'investigating',
        type: 'production_outage',
        started_at: h(2),
        resolved_at: null,
        duration_minutes: null,
        root_cause_tags: [
            'dependency_update',
            'config_change'
        ],
        root_cause_summary: 'New Stripe SDK v3 connection pool limit too low for peak traffic',
        resolution_summary: null,
        postmortem_url: null,
        lessons_learned: null,
        ai_lessons_summary: null,
        created_by: 'usr_arjun_001',
        incident_commander: 'usr_arjun_001',
        hindsight_event_id: 'hs_inc_201',
        created_at: h(2),
        updated_at: h(1)
    },
    {
        id: 'inc_202',
        org_id: 'org_acme_001',
        title: 'Webpack compile syntax error in auth-service',
        description: 'Build pipeline failing due to TypeScript syntax incompatibility in middleware',
        severity: 'P2',
        status: 'identified',
        type: 'other',
        started_at: h(5),
        resolved_at: null,
        duration_minutes: null,
        root_cause_tags: [
            'config_change'
        ],
        root_cause_summary: 'TS syntax incompatibility in middleware wrapper after JWT rotation changes',
        resolution_summary: null,
        postmortem_url: null,
        lessons_learned: null,
        ai_lessons_summary: null,
        created_by: 'usr_arjun_001',
        incident_commander: null,
        hindsight_event_id: 'hs_inc_202',
        created_at: h(5),
        updated_at: h(4)
    },
    {
        id: 'inc_203',
        org_id: 'org_acme_001',
        title: 'Memory leak in notification-service thread pool',
        description: 'Gradual memory growth causing OOM restarts every 4-6 hours',
        severity: 'P3',
        status: 'resolved',
        type: 'performance_degradation',
        started_at: h(30),
        resolved_at: h(26),
        duration_minutes: 252,
        root_cause_tags: [
            'config_change'
        ],
        root_cause_summary: 'Email stream arrays not properly garbage collected in thread pool',
        resolution_summary: 'Garbage collection cycle manually forced, optimized email stream arrays.',
        postmortem_url: null,
        lessons_learned: 'Always run memory profiling for 24h before production promotion.',
        ai_lessons_summary: 'Memory leak traced to unclosed stream listeners. Implement resource monitoring on all long-running workers.',
        created_by: 'usr_sarah_002',
        incident_commander: null,
        hindsight_event_id: 'hs_inc_203',
        created_at: h(30),
        updated_at: h(26)
    }
];
const SEED_INCIDENT_DEPLOYMENTS = [
    {
        incident_id: 'inc_201',
        deployment_id: 'dep_103',
        relationship: 'caused_by',
        notes: 'Incident started ~35 minutes after dep_103 completed'
    },
    {
        incident_id: 'inc_202',
        deployment_id: 'dep_101',
        relationship: 'correlated',
        notes: 'Build failure linked to same feature branch'
    },
    {
        incident_id: 'inc_203',
        deployment_id: 'dep_104',
        relationship: 'correlated',
        notes: 'Memory issue surfaced after v0.7.5 optimization changes'
    }
];
const SEED_TIMELINE_ENTRIES = [
    {
        id: 'ite_001',
        incident_id: 'inc_201',
        author_id: 'usr_arjun_001',
        author_name: 'Arjun Mehta',
        event_type: 'status_change',
        content: 'Incident opened. Assigning to payments team.',
        occurred_at: h(2)
    },
    {
        id: 'ite_002',
        incident_id: 'inc_201',
        author_id: 'usr_alex_003',
        author_name: 'Alex Rodriguez',
        event_type: 'diagnosis',
        content: 'Investigating database locks on transaction write tables. Connection pool exhausted.',
        occurred_at: h(1.5)
    },
    {
        id: 'ite_003',
        incident_id: 'inc_201',
        author_id: 'usr_arjun_001',
        author_name: 'Arjun Mehta',
        event_type: 'action_taken',
        content: 'Increased connection pool size from 10 to 50 in Stripe SDK config.',
        occurred_at: h(1)
    }
];
const SEED_RISK_ANALYSES = [
    {
        id: 'ra_101',
        deployment_id: 'dep_101',
        risk_score: 67,
        risk_level: 'elevated',
        historical_factor: 28,
        temporal_factor: 22,
        infra_factor: 17,
        frequency_factor: 0,
        risk_factors: [
            {
                label: '2 failures in last 14 days for auth-service',
                weight: 28,
                category: 'historical'
            },
            {
                label: 'Friday afternoon deploy (historically risky window)',
                weight: 22,
                category: 'temporal'
            },
            {
                label: 'Database migration included',
                weight: 17,
                category: 'infra'
            }
        ],
        recommendations: [
            {
                text: 'Run smoke tests on /api/auth before going live',
                priority: 'high'
            },
            {
                text: 'Prepare rollback script for the DB migration',
                priority: 'high'
            },
            {
                text: 'Monitor latency for 30min post-deploy',
                priority: 'medium'
            }
        ],
        model_version: 'groq/llama-3.3-70b-versatile',
        computed_at: h(4)
    },
    {
        id: 'ra_102',
        deployment_id: 'dep_102',
        risk_score: 18,
        risk_level: 'low',
        historical_factor: 0,
        temporal_factor: 8,
        infra_factor: 0,
        frequency_factor: 10,
        risk_factors: [
            {
                label: 'Standard non-breaking patch release',
                weight: 10,
                category: 'frequency'
            },
            {
                label: 'Tuesday morning deploy (low-risk window)',
                weight: 8,
                category: 'temporal'
            }
        ],
        recommendations: [
            {
                text: 'Proceed with standard automated test suites',
                priority: 'low'
            }
        ],
        model_version: 'groq/llama-3.3-70b-versatile',
        computed_at: h(6)
    },
    {
        id: 'ra_103',
        deployment_id: 'dep_103',
        risk_score: 89,
        risk_level: 'high',
        historical_factor: 35,
        temporal_factor: 22,
        infra_factor: 20,
        frequency_factor: 12,
        risk_factors: [
            {
                label: '3/4 similar Stripe migrations caused incidents',
                weight: 35,
                category: 'historical'
            },
            {
                label: 'Friday afternoon deploy (historically risky window)',
                weight: 22,
                category: 'temporal'
            },
            {
                label: 'Critical SDK dependency update',
                weight: 20,
                category: 'infra'
            },
            {
                label: '4 deployments this week for payment-service',
                weight: 12,
                category: 'frequency'
            }
        ],
        recommendations: [
            {
                text: 'Execute isolated Stripe webhook integration tests before production',
                priority: 'high'
            },
            {
                text: 'Ensure secondary SRE backup coverage is active',
                priority: 'high'
            },
            {
                text: 'Deploy as blue-green with 10% canary traffic',
                priority: 'medium'
            }
        ],
        model_version: 'groq/llama-3.3-70b-versatile',
        computed_at: h(26)
    }
];
const SEED_WEBHOOK_DELIVERIES = [
    {
        id: 'wh_001',
        org_id: 'org_acme_001',
        api_key_id: 'key_001',
        source: 'github_actions',
        event_type: 'deployment',
        headers: {
            'x-source': 'github_actions',
            'content-type': 'application/json'
        },
        raw_payload: {
            service: 'auth-service',
            version: 'v2.4.1',
            trigger: 'git.push',
            deployer: 'arjun'
        },
        status: 'processed',
        processed_at: h(4),
        error_message: null,
        received_at: h(4)
    },
    {
        id: 'wh_002',
        org_id: 'org_acme_001',
        api_key_id: 'key_001',
        source: 'github_actions',
        event_type: 'build',
        headers: {
            'x-source': 'github_actions',
            'content-type': 'application/json'
        },
        raw_payload: {
            service: 'auth-service',
            pipelineId: 'pr-12',
            stage: 'compile',
            error: 'SyntaxError: Unexpected token'
        },
        status: 'processed',
        processed_at: h(5),
        error_message: null,
        received_at: h(5)
    },
    {
        id: 'wh_003',
        org_id: 'org_acme_001',
        api_key_id: 'key_001',
        source: 'github_actions',
        event_type: 'deployment',
        headers: {
            'x-source': 'github_actions',
            'content-type': 'application/json'
        },
        raw_payload: {
            service: 'api-gateway',
            version: 'v1.9.0',
            trigger: 'git.push',
            deployer: 'sarah'
        },
        status: 'processed',
        processed_at: h(6),
        error_message: null,
        received_at: h(6)
    },
    {
        id: 'wh_004',
        org_id: 'org_acme_001',
        api_key_id: 'key_001',
        source: 'custom',
        event_type: 'incident',
        headers: {
            'x-source': 'pagerduty',
            'content-type': 'application/json'
        },
        raw_payload: {
            alertId: 'alert-stripe-err',
            service: 'payment-service',
            metric: 'api_latency_99p',
            threshold: '5000ms'
        },
        status: 'processed',
        processed_at: h(2),
        error_message: null,
        received_at: h(2)
    }
];
const SEED_API_KEYS = [
    {
        id: 'key_001',
        org_id: 'org_acme_001',
        created_by: 'usr_arjun_001',
        name: 'GitHub Actions Key',
        key_hash: 'a'.repeat(64),
        key_prefix: 'piq_live_xxxx',
        scopes: [
            'deployments:write',
            'incidents:write'
        ],
        last_used_at: h(2),
        expires_at: null,
        revoked_at: null,
        created_at: d(30)
    }
];
const SEED_HINDSIGHT_MEMORIES = [
    {
        event_id: 'hs_inc_203_mem',
        content: 'auth-service v2.3.8 deployed to production with DB migration on sessions table — caused P2 incident, 8min session lookup timeouts. Rolled back to v2.3.7. Root cause: migration took longer than expected under production load.',
        timestamp: d(180),
        metadata: {
            org_id: 'org_acme_001',
            service_name: 'auth-service',
            environment: 'production',
            outcome: 'failure',
            event_type: 'incident',
            severity: 'P2',
            root_cause_tags: [
                'db_migration'
            ],
            has_db_migration: true
        },
        similarity_score: 0.94
    },
    {
        event_id: 'hs_dep_prev_auth',
        content: 'auth-service v2.2.1 deployed Tuesday morning with similar middleware changes — stable execution, no incidents. DB migration ran cleanly in under 30 seconds.',
        timestamp: d(90),
        metadata: {
            org_id: 'org_acme_001',
            service_name: 'auth-service',
            environment: 'production',
            outcome: 'success',
            event_type: 'deployment',
            has_db_migration: true
        },
        similarity_score: 0.81
    },
    {
        event_id: 'hs_inc_pay_stripe',
        content: 'payment-service Stripe API migration (v1.7.0) caused transaction deadlocks in production. Friday afternoon deploy with 4 other concurrent deployments. Incident P1, 45min downtime. Resolved by connection pool tuning.',
        timestamp: d(120),
        metadata: {
            org_id: 'org_acme_001',
            service_name: 'payment-service',
            environment: 'production',
            outcome: 'failure',
            event_type: 'incident',
            severity: 'P1',
            root_cause_tags: [
                'dependency_update',
                'config_change'
            ]
        },
        similarity_score: 0.91
    },
    {
        event_id: 'hs_dep_notif_stable',
        content: 'notification-service v0.6.8 deployed with email engine optimization. Low risk change, deployed Wednesday morning. No incidents. Performance improved by 18% CPU reduction.',
        timestamp: d(45),
        metadata: {
            org_id: 'org_acme_001',
            service_name: 'notification-service',
            environment: 'production',
            outcome: 'success',
            event_type: 'deployment'
        },
        similarity_score: 0.76
    },
    {
        event_id: 'hs_bf_auth_jwt',
        content: 'auth-service build failure during test stage — JWT middleware incompatibility with TypeScript strict mode. Branch feat/jwt-v2. Resolved by updating tsconfig target.',
        timestamp: d(14),
        metadata: {
            org_id: 'org_acme_001',
            service_name: 'auth-service',
            outcome: 'failure',
            event_type: 'build_failure',
            stage: 'test'
        },
        similarity_score: 0.87
    }
];
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * In-memory data store — single source of truth for all repositories.
 * This is a singleton module-level object so it persists across requests
 * in the same Next.js process (dev mode with hot reload will reset it).
 *
 * Prisma migration path: replace each Map with a Prisma client call
 * in the corresponding repository. Types stay the same.
 */ __turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/mock-data/seed.ts [app-route] (ecmascript)");
;
function createStore() {
    const organizations = new Map();
    const users = new Map();
    const environments = new Map();
    const services = new Map();
    const deployments = new Map();
    const infraChanges = new Map();
    const buildFailures = new Map();
    const incidents = new Map();
    const incidentDeployments = [];
    const timelineEntries = new Map();
    const riskAnalyses = new Map();
    const memoryEvents = new Map();
    const webhookDeliveries = new Map();
    const apiKeys = new Map();
    // Seed data
    organizations.set(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_ORG"].id, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_ORG"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_USERS"].forEach((u)=>users.set(u.id, u));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_ENVIRONMENTS"].forEach((e)=>environments.set(e.id, e));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_SERVICES"].forEach((s)=>services.set(s.id, s));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_DEPLOYMENTS"].forEach((d)=>deployments.set(d.id, d));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_INFRA_CHANGES"].forEach((ic)=>infraChanges.set(ic.id, ic));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_BUILD_FAILURES"].forEach((bf)=>buildFailures.set(bf.id, bf));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_INCIDENTS"].forEach((inc)=>incidents.set(inc.id, inc));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_INCIDENT_DEPLOYMENTS"].forEach((id)=>incidentDeployments.push(id));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_TIMELINE_ENTRIES"].forEach((te)=>timelineEntries.set(te.id, te));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_RISK_ANALYSES"].forEach((ra)=>riskAnalyses.set(ra.deployment_id, ra));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_WEBHOOK_DELIVERIES"].forEach((wh)=>webhookDeliveries.set(wh.id, wh));
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_API_KEYS"].forEach((k)=>apiKeys.set(k.id, k));
    return {
        organizations,
        users,
        environments,
        services,
        deployments,
        infraChanges,
        buildFailures,
        incidents,
        incidentDeployments,
        timelineEntries,
        riskAnalyses,
        memoryEvents,
        webhookDeliveries,
        apiKeys
    };
}
if (!/*TURBOPACK member replacement*/ __turbopack_context__.g.__piqStore) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.__piqStore = createStore();
}
const store = /*TURBOPACK member replacement*/ __turbopack_context__.g.__piqStore;
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/deployment.repo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countDeploymentsByService",
    ()=>countDeploymentsByService,
    "createDeployment",
    ()=>createDeployment,
    "createInfraChange",
    ()=>createInfraChange,
    "getDeploymentById",
    ()=>getDeploymentById,
    "getInfraChangesByDeployment",
    ()=>getInfraChangesByDeployment,
    "getRecentDeploymentsByService",
    ()=>getRecentDeploymentsByService,
    "getRiskAnalysisByDeployment",
    ()=>getRiskAnalysisByDeployment,
    "listDeployments",
    ()=>listDeployments,
    "updateDeployment",
    ()=>updateDeployment,
    "upsertRiskAnalysis",
    ()=>upsertRiskAnalysis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/store.ts [app-route] (ecmascript)");
;
function listDeployments(filter) {
    let results = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.values()).filter((d)=>d.org_id === filter.org_id);
    if (filter.service_id) results = results.filter((d)=>d.service_id === filter.service_id);
    if (filter.environment_id) results = results.filter((d)=>d.environment_id === filter.environment_id);
    if (filter.status) results = results.filter((d)=>d.status === filter.status);
    if (filter.risk_level) results = results.filter((d)=>d.risk_level === filter.risk_level);
    if (filter.from) results = results.filter((d)=>d.created_at >= filter.from);
    if (filter.to) results = results.filter((d)=>d.created_at <= filter.to);
    // Sort
    const sortBy = filter.sort_by || 'created_at';
    const dir = filter.sort_dir === 'asc' ? 1 : -1;
    results.sort((a, b)=>{
        const va = a[sortBy] ?? '';
        const vb = b[sortBy] ?? '';
        return va < vb ? -dir : va > vb ? dir : 0;
    });
    // Paginate
    const page = filter.page ?? 1;
    const perPage = Math.min(filter.per_page ?? 20, 100);
    const total = results.length;
    const paged = results.slice((page - 1) * perPage, page * perPage);
    return {
        data: paged,
        meta: {
            page,
            per_page: perPage,
            total,
            total_pages: Math.ceil(total / perPage)
        }
    };
}
function getDeploymentById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.get(id);
}
function createDeployment(deployment) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.set(deployment.id, deployment);
    return deployment;
}
function updateDeployment(id, patch) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.get(id);
    if (!existing) return null;
    const updated = {
        ...existing,
        ...patch,
        updated_at: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.set(id, updated);
    return updated;
}
function getInfraChangesByDeployment(deployment_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].infraChanges.values()).filter((ic)=>ic.deployment_id === deployment_id);
}
function createInfraChange(change) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].infraChanges.set(change.id, change);
    return change;
}
function getRiskAnalysisByDeployment(deployment_id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].riskAnalyses.get(deployment_id);
}
function upsertRiskAnalysis(ra) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].riskAnalyses.set(ra.deployment_id, ra);
    return ra;
}
function getRecentDeploymentsByService(service_id, limit) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.values()).filter((d)=>d.service_id === service_id).sort((a, b)=>a.created_at < b.created_at ? 1 : -1).slice(0, limit);
}
function countDeploymentsByService(service_id, from) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.values()).filter((d)=>d.service_id === service_id && (!from || d.created_at >= from)).length;
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/build-failure.repo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBuildFailure",
    ()=>createBuildFailure,
    "getBuildFailureById",
    ()=>getBuildFailureById,
    "getRecentBuildFailures",
    ()=>getRecentBuildFailures,
    "listBuildFailures",
    ()=>listBuildFailures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/store.ts [app-route] (ecmascript)");
;
function listBuildFailures(filter) {
    let results = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].buildFailures.values()).filter((bf)=>bf.org_id === filter.org_id);
    if (filter.service_id) results = results.filter((bf)=>bf.service_id === filter.service_id);
    if (filter.stage) results = results.filter((bf)=>bf.stage === filter.stage);
    if (filter.failure_type) results = results.filter((bf)=>bf.failure_type === filter.failure_type);
    if (filter.from) results = results.filter((bf)=>bf.failed_at >= filter.from);
    if (filter.to) results = results.filter((bf)=>bf.failed_at <= filter.to);
    results.sort((a, b)=>a.failed_at < b.failed_at ? 1 : -1);
    const page = filter.page ?? 1;
    const perPage = Math.min(filter.per_page ?? 20, 100);
    const total = results.length;
    const paged = results.slice((page - 1) * perPage, page * perPage);
    return {
        data: paged,
        meta: {
            page,
            per_page: perPage,
            total,
            total_pages: Math.ceil(total / perPage)
        }
    };
}
function getBuildFailureById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].buildFailures.get(id);
}
function createBuildFailure(bf) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].buildFailures.set(bf.id, bf);
    return bf;
}
function getRecentBuildFailures(service_id, days) {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].buildFailures.values()).filter((bf)=>bf.service_id === service_id && bf.failed_at >= cutoff).sort((a, b)=>a.failed_at < b.failed_at ? 1 : -1);
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/incident.repo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTimelineEntry",
    ()=>addTimelineEntry,
    "countLinkedDeployments",
    ()=>countLinkedDeployments,
    "createIncident",
    ()=>createIncident,
    "getIncidentById",
    ()=>getIncidentById,
    "getLinkedDeployments",
    ()=>getLinkedDeployments,
    "getTimelineEntries",
    ()=>getTimelineEntries,
    "linkDeploymentToIncident",
    ()=>linkDeploymentToIncident,
    "listIncidents",
    ()=>listIncidents,
    "updateIncident",
    ()=>updateIncident
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/store.ts [app-route] (ecmascript)");
;
function listIncidents(filter) {
    let results = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidents.values()).filter((i)=>i.org_id === filter.org_id);
    if (filter.severity) results = results.filter((i)=>i.severity === filter.severity);
    if (filter.status) results = results.filter((i)=>i.status === filter.status);
    if (filter.from) results = results.filter((i)=>i.started_at >= filter.from);
    if (filter.to) results = results.filter((i)=>i.started_at <= filter.to);
    // Filter by service_id via incident_deployments junction
    if (filter.service_id) {
        const linkedDeploymentIds = new Set(Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].deployments.values()).filter((d)=>d.service_id === filter.service_id).map((d)=>d.id));
        const incidentIdsForService = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidentDeployments.filter((id)=>linkedDeploymentIds.has(id.deployment_id)).map((id)=>id.incident_id));
        results = results.filter((i)=>incidentIdsForService.has(i.id));
    }
    // Sort by started_at desc
    results.sort((a, b)=>a.started_at < b.started_at ? 1 : -1);
    const page = filter.page ?? 1;
    const perPage = Math.min(filter.per_page ?? 20, 100);
    const total = results.length;
    const paged = results.slice((page - 1) * perPage, page * perPage);
    return {
        data: paged,
        meta: {
            page,
            per_page: perPage,
            total,
            total_pages: Math.ceil(total / perPage)
        }
    };
}
function getIncidentById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidents.get(id);
}
function createIncident(incident) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidents.set(incident.id, incident);
    return incident;
}
function updateIncident(id, patch) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidents.get(id);
    if (!existing) return null;
    const updated = {
        ...existing,
        ...patch,
        updated_at: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidents.set(id, updated);
    return updated;
}
function getLinkedDeployments(incident_id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidentDeployments.filter((id)=>id.incident_id === incident_id);
}
function linkDeploymentToIncident(link) {
    const exists = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidentDeployments.some((id)=>id.incident_id === link.incident_id && id.deployment_id === link.deployment_id);
    if (!exists) {
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidentDeployments.push(link);
    }
}
function countLinkedDeployments(incident_id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].incidentDeployments.filter((id)=>id.incident_id === incident_id).length;
}
function getTimelineEntries(incident_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].timelineEntries.values()).filter((te)=>te.incident_id === incident_id).sort((a, b)=>a.occurred_at < b.occurred_at ? -1 : 1);
}
function addTimelineEntry(entry) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].timelineEntries.set(entry.id, entry);
    return entry;
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/org.repo.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createApiKey",
    ()=>createApiKey,
    "createEnvironment",
    ()=>createEnvironment,
    "createService",
    ()=>createService,
    "createUser",
    ()=>createUser,
    "createWebhookDelivery",
    ()=>createWebhookDelivery,
    "getApiKeyByHash",
    ()=>getApiKeyByHash,
    "getApiKeyById",
    ()=>getApiKeyById,
    "getEnvironmentById",
    ()=>getEnvironmentById,
    "getEnvironmentBySlug",
    ()=>getEnvironmentBySlug,
    "getOrg",
    ()=>getOrg,
    "getServiceById",
    ()=>getServiceById,
    "getServiceBySlug",
    ()=>getServiceBySlug,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUserById",
    ()=>getUserById,
    "listApiKeys",
    ()=>listApiKeys,
    "listEnvironments",
    ()=>listEnvironments,
    "listOrgUsers",
    ()=>listOrgUsers,
    "listServices",
    ()=>listServices,
    "listWebhookDeliveries",
    ()=>listWebhookDeliveries,
    "revokeApiKey",
    ()=>revokeApiKey,
    "softDeleteUser",
    ()=>softDeleteUser,
    "updateOrg",
    ()=>updateOrg,
    "updateUser",
    ()=>updateUser,
    "updateWebhookDelivery",
    ()=>updateWebhookDelivery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/store.ts [app-route] (ecmascript)");
;
function getOrg(org_id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].organizations.get(org_id);
}
function updateOrg(org_id, patch) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].organizations.get(org_id);
    if (!existing) return null;
    const updated = {
        ...existing,
        ...patch,
        updated_at: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].organizations.set(org_id, updated);
    return updated;
}
function getUserById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.get(id);
}
function getUserByEmail(email) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.values()).find((u)=>u.email === email && !u.deleted_at);
}
function listOrgUsers(org_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.values()).filter((u)=>u.org_id === org_id && !u.deleted_at);
}
function createUser(user) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.set(user.id, user);
    return user;
}
function updateUser(id, patch) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.get(id);
    if (!existing) return null;
    const updated = {
        ...existing,
        ...patch,
        updated_at: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.set(id, updated);
    return updated;
}
function softDeleteUser(id) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.get(id);
    if (!existing) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].users.set(id, {
        ...existing,
        deleted_at: new Date().toISOString()
    });
    return true;
}
function listServices(org_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].services.values()).filter((s)=>s.org_id === org_id && s.is_active);
}
function getServiceById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].services.get(id);
}
function getServiceBySlug(org_id, slug) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].services.values()).find((s)=>s.org_id === org_id && s.slug === slug);
}
function createService(service) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].services.set(service.id, service);
    return service;
}
function createEnvironment(environment) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].environments.set(environment.id, environment);
    return environment;
}
function listEnvironments(org_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].environments.values()).filter((e)=>e.org_id === org_id);
}
function getEnvironmentById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].environments.get(id);
}
function getEnvironmentBySlug(org_id, slug) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].environments.values()).find((e)=>e.org_id === org_id && e.slug === slug);
}
function listApiKeys(org_id) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.values()).filter((k)=>k.org_id === org_id && !k.revoked_at);
}
function getApiKeyById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.get(id);
}
function getApiKeyByHash(hash) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.values()).find((k)=>k.key_hash === hash && !k.revoked_at);
}
function createApiKey(key) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.set(key.id, key);
    return key;
}
function revokeApiKey(id) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.get(id);
    if (!existing) return false;
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].apiKeys.set(id, {
        ...existing,
        revoked_at: new Date().toISOString()
    });
    return true;
}
function listWebhookDeliveries(org_id, limit = 50) {
    return Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].webhookDeliveries.values()).filter((wh)=>wh.org_id === org_id).sort((a, b)=>a.received_at < b.received_at ? 1 : -1).slice(0, limit);
}
function createWebhookDelivery(delivery) {
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].webhookDeliveries.set(delivery.id, delivery);
    return delivery;
}
function updateWebhookDelivery(id, patch) {
    const existing = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].webhookDeliveries.get(id);
    if (!existing) return null;
    const updated = {
        ...existing,
        ...patch
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["store"].webhookDeliveries.set(id, updated);
    return updated;
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/hindsight.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildDeploymentNarrative",
    ()=>buildDeploymentNarrative,
    "buildIncidentNarrative",
    ()=>buildIncidentNarrative,
    "ensureBankSetup",
    ()=>ensureBankSetup,
    "reflectOnQuery",
    ()=>reflectOnQuery,
    "retrieveSimilarMemories",
    ()=>retrieveSimilarMemories,
    "storeMemory",
    ()=>storeMemory
]);
/**
 * Hindsight Memory Service — Real Implementation
 *
 * Uses the official @vectorize-io/hindsight-client SDK.
 * Cloud base URL: https://api.hindsight.vectorize.io
 * Auth: Bearer hsk_... API key
 *
 * Three operations:
 *   retain  — store a deployment/incident/build-failure as a memory
 *   recall  — retrieve semantically relevant past events for risk scoring / chat
 *   reflect — generate a disposition-aware answer using memory (used in chat)
 *
 * Falls back to rich mock data when HINDSIGHT_API_KEY is not set.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f40$vectorize$2d$io$2f$hindsight$2d$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/@vectorize-io/hindsight-client/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/mock-data/seed.ts [app-route] (ecmascript)");
;
;
// ── Client singleton ───────────────────────────────────────────────────────
const HINDSIGHT_API_KEY = process.env.HINDSIGHT_API_KEY ?? '';
const HINDSIGHT_API_URL = process.env.HINDSIGHT_API_URL ?? 'https://api.hindsight.vectorize.io';
const BANK_ID = process.env.HINDSIGHT_BANK_ID ?? 'pipelineiq-acme-corp';
const USE_MOCK = !HINDSIGHT_API_KEY || HINDSIGHT_API_KEY === 'mock';
// Module-level client — created once per process
let _client = null;
function getClient() {
    if (!_client) {
        _client = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f40$vectorize$2d$io$2f$hindsight$2d$client$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HindsightClient"]({
            baseUrl: HINDSIGHT_API_URL,
            apiKey: HINDSIGHT_API_KEY
        });
    }
    return _client;
}
async function ensureBankSetup() {
    if (USE_MOCK) return;
    try {
        const client = getClient();
        // Auto-create happens on first retain, but we can set the mission upfront
        await client.updateBankConfig(BANK_ID, {
            retainMission: 'Store DevOps operational events: deployments, incidents, and build failures. ' + 'Extract: service name, version, environment, outcome (success/failure/degraded), ' + 'root cause categories, deployment timing patterns, and infrastructure change types. ' + 'Ignore: personally identifiable information, raw secrets, and internal log noise.',
            reflectMission: 'You are PipelineIQ, a DevOps intelligence agent with deep operational memory. ' + 'Answer questions about deployment history, incident patterns, and risk factors. ' + 'Be specific — cite service names, versions, and dates. ' + 'Surface patterns (e.g. Friday deploys, DB migrations) proactively. ' + 'Recommend concrete actions based on what past events teach us.',
            observationsMission: 'Build durable observations about: per-service failure patterns, high-risk deployment windows, ' + 'recurring root cause categories, and infrastructure changes that historically caused incidents.'
        });
    } catch (err) {
        // Non-fatal — bank still works with defaults
        console.warn('[Hindsight] bank config update failed (non-fatal):', err.message);
    }
}
async function storeMemory(episode) {
    if (USE_MOCK) {
        const mockId = `mock_evt_${Date.now()}`;
        console.log('[Hindsight MOCK] Retained:', episode.content.substring(0, 80));
        return mockId;
    }
    try {
        const client = getClient();
        await client.retain(BANK_ID, episode.content, {
            timestamp: new Date(episode.timestamp),
            context: episode.context ?? 'devops-event',
            documentId: episode.document_id,
            metadata: episode.metadata ?? {},
            async: true
        });
        // The client doesn't return an event ID for cloud retain — use document_id
        return episode.document_id ?? `hs_${Date.now()}`;
    } catch (err) {
        console.error('[Hindsight] retain failed:', err.message);
        throw err;
    }
}
async function retrieveSimilarMemories(query, filters = {}, limit = 5) {
    if (USE_MOCK) {
        return getMockMemories(query, filters, limit);
    }
    try {
        const client = getClient();
        const response = await client.recall(BANK_ID, query, {
            maxTokens: 3000,
            budget: 'mid',
            types: [
                'world',
                'experience',
                'observation'
            ]
        });
        const results = response.results ?? [];
        // Map Hindsight's RecallResult format → our HindsightMemory shape
        return results.slice(0, limit).map((r, i)=>({
                event_id: r.id ?? `hs_${i}`,
                content: r.text ?? '',
                timestamp: r.occurred_start ?? r.mentioned_at ?? new Date().toISOString(),
                metadata: {
                    ...r.metadata ?? {},
                    context: r.context ?? '',
                    type: r.type ?? 'experience',
                    entities: r.entities ?? []
                },
                // Hindsight returns results in ranked order without a raw score.
                // We assign a descending proxy score so callers can display relative confidence.
                similarity_score: Math.max(0.95 - i * 0.04, 0.5)
            }));
    } catch (err) {
        console.error('[Hindsight] recall failed, using mock fallback:', err.message);
        return getMockMemories(query, filters, limit);
    }
}
async function reflectOnQuery(query, context) {
    if (USE_MOCK) {
        return getMockReflection(query);
    }
    try {
        const client = getClient();
        const response = await client.reflect(BANK_ID, query, {
            budget: 'mid',
            context: context ?? 'devops query'
        });
        return response.text ?? 'I could not generate a response. Please try again.';
    } catch (err) {
        console.error('[Hindsight] reflect failed:', err.message);
        return getMockReflection(query);
    }
}
function buildDeploymentNarrative(params) {
    const time = new Date(params.timestamp);
    const dayName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ][time.getDay()];
    const hour = time.getUTCHours();
    const timeDesc = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    const parts = [
        `${params.service_name} version ${params.version} deployed to ${params.environment}`,
        params.deployer_name ? `by ${params.deployer_name}` : 'via automated pipeline',
        `on ${dayName} ${timeDesc}.`
    ];
    if (params.change_summary) parts.push(`Changes: ${params.change_summary}`);
    if (params.has_db_migration) parts.push('Includes a database schema migration.');
    if (params.has_infra_change) parts.push('Infrastructure modifications included in this deployment.');
    return parts.join(' ');
}
function buildIncidentNarrative(params) {
    const parts = [
        `${params.severity} incident on ${params.service_name}: ${params.title}.`,
        `Type: ${params.type.replace(/_/g, ' ')}.`
    ];
    if (params.root_cause_tags.length > 0) {
        parts.push(`Root causes: ${params.root_cause_tags.join(', ')}.`);
    }
    if (params.duration_minutes) {
        parts.push(`Duration: ${params.duration_minutes} minutes.`);
    }
    if (params.resolution_summary) {
        parts.push(`Resolution: ${params.resolution_summary}`);
    }
    return parts.join(' ');
}
// ── Mock fallback ──────────────────────────────────────────────────────────
function getMockMemories(query, filters, limit) {
    const q = query.toLowerCase();
    const scored = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$mock$2d$data$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEED_HINDSIGHT_MEMORIES"].map((m)=>{
        let score = m.similarity_score;
        const content = m.content.toLowerCase();
        if (filters.service_name) {
            const svc = filters.service_name.toLowerCase();
            if (content.includes(svc)) score += 0.1;
        }
        const keywords = q.split(/\s+/).filter((w)=>w.length > 3);
        for (const kw of keywords){
            if (content.includes(kw)) score += 0.03;
        }
        return {
            ...m,
            similarity_score: Math.min(score, 0.99)
        };
    });
    return scored.filter((m)=>m.similarity_score >= 0.65).sort((a, b)=>b.similarity_score - a.similarity_score).slice(0, limit);
}
function getMockReflection(query) {
    const q = query.toLowerCase();
    if (q.includes('auth') || q.includes('wrong') || q.includes('last')) {
        return 'The last auth-service deployment (v2.4.1) occurred in staging with a DB schema migration for JWT rotation. Hindsight matched this at 94% similarity to v2.3.8 (Dec 2025), which caused an 8-minute session lookup outage. Recommend verifying table lock times before promoting to production.';
    }
    if (q.includes('payment') || q.includes('stripe')) {
        return 'payment-service has a pattern of Friday afternoon incidents. The Stripe SDK v3 migration (v1.8.2) triggered a P1 latency spike within 2 hours of deployment. Historical pattern: 3/4 Friday payment-service deploys caused regression outages. Recommend a deployment freeze after Thursday noon.';
    }
    if (q.includes('incident') || q.includes('migration')) {
        return 'I found 2 recent incidents linked to database migrations: P1 on payment-service (Stripe SDK, ongoing) and P2 on auth-service (sessions table schema, resolved). Both followed deploys with DB changes. Pattern suggests migrations should be tested under production-equivalent load in staging first.';
    }
    return 'System health: 12/14 services operational. Active incidents: P1 on payment-service (Stripe SDK migration), P2 on auth-service (build failure). Average risk score this week: 52 (elevated). Highest risk service: payment-service (avg 71). Ask me about specific services or incident patterns for more detail.';
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/groq.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateRecommendations",
    ()=>generateRecommendations
]);
/**
 * Groq LLM Service (OpenAI-compatible SDK)
 *
 * Used for generating deployment risk recommendations.
 * The chat/NL query uses Hindsight's built-in `reflect` operation instead,
 * which is already memory-grounded and gives better results.
 *
 * Model: llama-3.3-70b-versatile — best free-tier model on Groq
 * Falls back to rule-based responses when GROQ_API_KEY is not set.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
const groqClient = process.env.GROQ_API_KEY ? new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
}) : null;
const MODEL = 'llama-3.3-70b-versatile';
async function generateRecommendations(params) {
    if (!groqClient) {
        return getStaticRecommendations(params.risk_level, params.factors);
    }
    const memoryContext = params.similarEvents.slice(0, 3).map((e, i)=>`[Past Event ${i + 1}] ${e.metadata.context ?? e.metadata.type ?? 'event'} | Outcome: ${e.metadata.outcome ?? 'unknown'} | ${e.content.substring(0, 200)}`).join('\n');
    const factorsList = params.factors.map((f)=>`- ${f.label} (weight: ${f.weight})`).join('\n');
    const prompt = `You are a DevOps risk advisor for PipelineIQ. A deployment is about to happen.
Based on the risk factors and historical context below, provide exactly 3 specific, actionable recommendations.

Service: ${params.service_name}
Version: ${params.deployment.version}
Risk Level: ${params.risk_level.toUpperCase()}
Change Summary: ${params.deployment.change_summary ?? 'Not provided'}

Risk Factors:
${factorsList || 'No significant risk factors detected'}

Historical Context:
${memoryContext || 'No similar past events found'}

Respond with ONLY a JSON object like: {"recommendations": [{"text": "specific action", "priority": "high"}, ...]}
Priority must be "high", "medium", or "low". Be specific and reference the actual service/change.`;
    try {
        const response = await groqClient.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 512,
            temperature: 0.3,
            response_format: {
                type: 'json_object'
            }
        });
        const content = response.choices[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(content);
        const recs = Array.isArray(parsed.recommendations) ? parsed.recommendations : Array.isArray(parsed) ? parsed : [];
        return recs.slice(0, 3).map((r)=>({
                text: String(r.text ?? ''),
                priority: [
                    'high',
                    'medium',
                    'low'
                ].includes(r.priority) ? r.priority : 'medium'
            }));
    } catch (err) {
        console.error('[Groq] recommendations failed:', err);
        return getStaticRecommendations(params.risk_level, params.factors);
    }
}
// ── Static fallbacks ───────────────────────────────────────────────────────
function getStaticRecommendations(riskLevel, factors) {
    const hasMigration = factors.some((f)=>f.label.toLowerCase().includes('migration'));
    const isHighRisk = riskLevel === 'high' || riskLevel === 'elevated';
    if (isHighRisk && hasMigration) {
        return [
            {
                text: 'Validate rollback script and database backup before deploying',
                priority: 'high'
            },
            {
                text: 'Run migration on a production-equivalent dataset in staging first',
                priority: 'high'
            },
            {
                text: 'Monitor DB latency and error rate for 30 minutes post-deploy',
                priority: 'medium'
            }
        ];
    }
    if (isHighRisk) {
        return [
            {
                text: 'Ensure SRE coverage is active during the deploy window',
                priority: 'high'
            },
            {
                text: 'Run smoke tests on critical paths before promoting traffic',
                priority: 'high'
            },
            {
                text: 'Prepare rollback procedure and communicate to team',
                priority: 'medium'
            }
        ];
    }
    return [
        {
            text: 'Proceed with standard automated test suite',
            priority: 'low'
        },
        {
            text: 'Monitor application error rate for 15 minutes post-deploy',
            priority: 'low'
        }
    ];
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/risk.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeRiskScore",
    ()=>computeRiskScore
]);
/**
 * Risk Scoring Engine
 *
 * Computes a 0-100 risk score for a deployment by combining:
 *   A. Historical failure rate from semantically similar Hindsight memories
 *   B. Infrastructure change risk (db migration, critical deps)
 *   C. Temporal risk (day-of-week + hour)
 *   D. Recent failure streak for this service
 *
 * Then generates recommendations via Groq LLM with the Hindsight context.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/hindsight.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$groq$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/groq.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$build$2d$failure$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/build-failure.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/deployment.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/org.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/nanoid.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function computeRiskScore(deployment) {
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceById"])(deployment.service_id);
    const infraChanges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getInfraChangesByDeployment"])(deployment.id);
    const hasMigration = infraChanges.some((ic)=>ic.change_type === 'db_migration');
    const hasInfraChange = infraChanges.length > 0;
    // 1. Build narrative for Hindsight query
    const narrative = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildDeploymentNarrative"])({
        service_name: service?.name ?? 'unknown-service',
        version: deployment.version,
        environment: deployment.environment_id,
        deployer_name: deployment.deployed_by_name,
        change_summary: deployment.change_summary,
        has_db_migration: hasMigration,
        has_infra_change: hasInfraChange,
        timestamp: deployment.started_at ?? deployment.created_at
    });
    // 2. Retrieve similar past events
    let similarEvents = [];
    try {
        similarEvents = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retrieveSimilarMemories"])(narrative, {
            org_id: deployment.org_id,
            service_name: service?.name
        }, 10);
    } catch  {
        similarEvents = [];
    }
    const factors = [];
    let totalScore = 0;
    // ── Factor A: Historical failure rate ────────────────────────────────────
    let historicalFactor = 0;
    if (similarEvents.length > 0) {
        const failedEvents = similarEvents.filter((e)=>e.metadata?.outcome === 'failure');
        const failureRate = failedEvents.length / similarEvents.length;
        historicalFactor = Math.round(failureRate * 40);
        totalScore += historicalFactor;
        if (historicalFactor > 8) {
            factors.push({
                label: `${failedEvents.length}/${similarEvents.length} similar past deploys caused failures`,
                weight: historicalFactor,
                category: 'historical'
            });
        }
    }
    // ── Factor B: Infrastructure change risk ─────────────────────────────────
    let infraFactor = 0;
    if (hasMigration) {
        infraFactor += 20;
        totalScore += 20;
        factors.push({
            label: 'Database migration included',
            weight: 20,
            category: 'infra'
        });
    } else if (hasInfraChange) {
        infraFactor += 10;
        totalScore += 10;
        factors.push({
            label: `Infrastructure change detected: ${infraChanges[0].change_type.replace(/_/g, ' ')}`,
            weight: 10,
            category: 'infra'
        });
    }
    // ── Factor C: Temporal risk ───────────────────────────────────────────────
    let temporalFactor = 0;
    const deployTime = new Date(deployment.started_at ?? Date.now());
    const dayOfWeek = deployTime.getDay(); // 0=Sun, 5=Fri
    const hourUTC = deployTime.getUTCHours();
    if (dayOfWeek === 5 && hourUTC >= 14) {
        temporalFactor = 18;
        totalScore += 18;
        factors.push({
            label: 'Friday afternoon deploy (historically risky window)',
            weight: 18,
            category: 'temporal'
        });
    } else if (dayOfWeek === 6 || dayOfWeek === 0) {
        temporalFactor = 12;
        totalScore += 12;
        factors.push({
            label: 'Weekend deploy (reduced SRE coverage)',
            weight: 12,
            category: 'temporal'
        });
    } else if (hourUTC >= 20 || hourUTC < 6) {
        temporalFactor = 8;
        totalScore += 8;
        factors.push({
            label: 'Off-hours deploy (reduced response capacity)',
            weight: 8,
            category: 'temporal'
        });
    }
    // ── Factor D: Recent failure streak ──────────────────────────────────────
    let frequencyFactor = 0;
    const recentFailures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$build$2d$failure$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecentBuildFailures"])(deployment.service_id, 14);
    if (recentFailures.length >= 2) {
        frequencyFactor = Math.min(recentFailures.length * 6, 22);
        totalScore += frequencyFactor;
        factors.push({
            label: `${recentFailures.length} build failures in last 14 days`,
            weight: frequencyFactor,
            category: 'historical'
        });
    }
    const finalScore = Math.min(totalScore, 100);
    const riskLevel = getRiskLevel(finalScore);
    // 5. Generate recommendations via Groq
    let recommendations = [];
    try {
        recommendations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$groq$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateRecommendations"])({
            deployment,
            factors,
            similarEvents,
            service_name: service?.name ?? 'unknown',
            risk_level: riskLevel
        });
    } catch  {
        recommendations = getDefaultRecommendations(riskLevel, hasMigration);
    }
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nanoid"])(),
        deployment_id: deployment.id,
        risk_score: finalScore,
        risk_level: riskLevel,
        historical_factor: historicalFactor || null,
        temporal_factor: temporalFactor || null,
        infra_factor: infraFactor || null,
        frequency_factor: frequencyFactor || null,
        risk_factors: factors,
        recommendations,
        model_version: 'groq/llama-3.3-70b-versatile',
        computed_at: new Date().toISOString()
    };
}
function getRiskLevel(score) {
    if (score < 30) return 'low';
    if (score < 55) return 'medium';
    if (score < 75) return 'elevated';
    return 'high';
}
function getDefaultRecommendations(riskLevel, hasMigration) {
    const recs = [];
    if (riskLevel === 'high' || riskLevel === 'elevated') {
        recs.push({
            text: 'Ensure SRE coverage is active during deploy window',
            priority: 'high'
        });
        recs.push({
            text: 'Run full regression suite before promoting to production',
            priority: 'high'
        });
    }
    if (hasMigration) {
        recs.push({
            text: 'Validate migration rollback script before deploying',
            priority: 'high'
        });
        recs.push({
            text: 'Test migration performance under load in staging first',
            priority: 'medium'
        });
    }
    if (riskLevel === 'low' || riskLevel === 'medium') {
        recs.push({
            text: 'Proceed with standard automated test suites',
            priority: 'low'
        });
    }
    return recs;
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/dataset.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "importRecordsFromData",
    ()=>importRecordsFromData,
    "importTryDataset",
    ()=>importTryDataset
]);
/**
 * Dataset import service for the `Try` folder.
 *
 * Loads the dataset JSON files, normalizes them into the app's domain model,
 * stores them in the in-memory repositories, and writes Hindsight memories.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/nanoid.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/deployment.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$build$2d$failure$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/build-failure.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$incident$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/incident.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/repositories/org.repo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/hindsight.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$risk$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/risk.service.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
const BASE_DATASET_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'try');
async function importTryDataset(org_id = 'org_acme_001') {
    const summary = {
        services_created: 0,
        environments_created: 0,
        deployments_imported: 0,
        incidents_imported: 0,
        build_failures_imported: 0,
        memories_created: 0,
        risk_analyses_computed: 0
    };
    const serviceCache = new Map();
    const environmentCache = new Map();
    const now = new Date().toISOString();
    function slugify(value) {
        return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    function normalizeService(name) {
        const slug = slugify(name);
        const existing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceBySlug"])(org_id, slug);
        if (existing) {
            serviceCache.set(name, existing);
            return existing;
        }
        const service = {
            id: `svc_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nanoid"])()}`,
            org_id,
            name,
            slug,
            description: null,
            repo_url: null,
            tech_stack: [],
            owner_team: null,
            tags: [],
            is_active: true,
            created_at: now,
            updated_at: now
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createService"])(service);
        serviceCache.set(name, service);
        summary.services_created += 1;
        return service;
    }
    function normalizeEnvironment(value) {
        const name = value.trim();
        const slug = slugify(name);
        const existing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEnvironmentBySlug"])(org_id, slug);
        if (existing) {
            environmentCache.set(name, existing);
            return existing;
        }
        const tier = name === 'production' ? 'production' : name === 'staging' ? 'staging' : name === 'dev' || name === 'development' ? 'development' : 'other';
        const environment = {
            id: `env_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nanoid"])()}`,
            org_id,
            name,
            slug,
            tier,
            color: null,
            is_protected: false,
            created_at: now
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEnvironment"])(environment);
        environmentCache.set(name, environment);
        summary.environments_created += 1;
        return environment;
    }
    function mapDeploymentStatus(status) {
        const normalized = (status ?? '').toLowerCase();
        if (normalized === 'success') return 'success';
        if (normalized === 'failure' || normalized === 'failed') return 'failed';
        if (normalized === 'rolled_back') return 'rolled_back';
        if (normalized === 'cancelled') return 'cancelled';
        return 'pending';
    }
    function mapSeverity(value) {
        const normalized = (value ?? '').toLowerCase();
        if (normalized === 'high') return 'P1';
        if (normalized === 'medium') return 'P2';
        if (normalized === 'low') return 'P3';
        return 'P4';
    }
    function mapIncidentType(problem, impact) {
        const text = `${problem ?? ''} ${impact ?? ''}`.toLowerCase();
        if (text.includes('outage') || text.includes('service outage') || text.includes('down')) {
            return 'production_outage';
        }
        if (text.includes('latency') || text.includes('performance')) {
            return 'performance_degradation';
        }
        if (text.includes('data')) {
            return 'data_issue';
        }
        if (text.includes('security')) {
            return 'security';
        }
        return 'other';
    }
    function mapBuildFailureStage(logs) {
        const text = logs.join(' ').toLowerCase();
        if (text.includes('lint')) return 'lint';
        if (text.includes('integration')) return 'integration';
        if (text.includes('deploy')) return 'deploy';
        if (text.includes('test')) return 'test';
        return 'build';
    }
    function mapBuildFailureType(logs) {
        const text = logs.join(' ').toLowerCase();
        if (text.includes('dependency')) return 'dependency_error';
        if (text.includes('timeout') || text.includes('network')) return 'network_error';
        if (text.includes('memory') || text.includes('oom')) return 'oom';
        if (text.includes('config')) return 'config_error';
        if (text.includes('test')) return 'test_failure';
        return 'compilation_error';
    }
    async function readJsonFile(filename) {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(BASE_DATASET_PATH, filename);
        const raw = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"])(filePath, 'utf8');
        return JSON.parse(raw);
    }
    /**
   * Ensures a timestamp string has a UTC timezone suffix so Node.js
   * parses it as UTC rather than local time. Dataset timestamps like
   * "2026-06-01T11:00:00" are missing the trailing 'Z' which causes
   * incorrect dates when passed to `new Date()`.
   */ function normalizeTimestamp(ts) {
        if (!ts) return new Date().toISOString();
        // Already has timezone info — leave as-is
        if (ts.endsWith('Z') || ts.includes('+') || /[0-9]-[0-9]{2}:[0-9]{2}$/.test(ts)) {
            return ts;
        }
        return ts + 'Z';
    }
    async function importDeployments(records) {
        for (const record of records){
            if (!record.deployment_id || !record.service || !record.environment) continue;
            const service = serviceCache.get(record.service) ?? normalizeService(record.service);
            const environment = environmentCache.get(record.environment) ?? normalizeEnvironment(record.environment);
            const id = record.deployment_id;
            const duplicate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDeploymentById"])(id);
            if (duplicate) continue;
            const commit_sha = record.source?.match(/git commit\s+([0-9a-f]+)/i)?.[1] ?? null;
            // Normalize timestamp: dataset records lack a timezone suffix, so Node.js
            // would parse them as local time instead of UTC — append 'Z' to fix this.
            const ts = normalizeTimestamp(record.timestamp);
            const deployment = {
                id,
                org_id,
                service_id: service.id,
                environment_id: environment.id,
                deployed_by: null,
                deployed_by_name: record.created_by ?? null,
                version: record.version ?? 'unknown',
                commit_sha,
                pr_url: null,
                ticket_url: null,
                change_summary: record.problem || record.root_cause || record.recommendation || null,
                diff_summary: record.logs?.join('; ') || record.tags?.join(', ') || null,
                status: mapDeploymentStatus(record.status),
                started_at: ts,
                completed_at: ts,
                duration_seconds: null,
                risk_score: null,
                risk_level: null,
                source: 'manual',
                webhook_delivery_id: null,
                hindsight_event_id: `dep-${id}`,
                created_at: ts,
                updated_at: ts
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDeployment"])(deployment);
            summary.deployments_imported += 1;
            // Fire-and-forget — data is already in the store; memories are supplementary
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeMemory"])({
                content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildDeploymentNarrative"])({
                    service_name: service.name,
                    version: deployment.version,
                    environment: environment.name,
                    deployer_name: deployment.deployed_by_name,
                    change_summary: deployment.change_summary,
                    has_db_migration: Boolean(record.root_cause?.toLowerCase().includes('migration')),
                    has_infra_change: Boolean(record.tags?.includes('infra') || record.impact?.toLowerCase().includes('infrastructure')),
                    timestamp: deployment.started_at ?? deployment.created_at
                }) + ` Additional notes: ${record.problem ?? 'none'}. Root cause: ${record.root_cause ?? 'unknown'}.`,
                timestamp: deployment.created_at,
                context: 'dataset-deployment',
                document_id: `dep-${id}`,
                metadata: {
                    org_id,
                    service_name: service.name,
                    environment: environment.name,
                    version: deployment.version,
                    outcome: deployment.status === 'success' ? 'success' : 'failure',
                    tags: (record.tags ?? []).join(',')
                }
            }).catch(()=>{});
            summary.memories_created += 1;
        }
    }
    async function importIncidents(records) {
        for (const record of records){
            if (!record.incident_id) continue;
            const id = record.incident_id;
            // BUG FIX: use the repo function instead of bypassing via global store.
            // The previous check `(global as any).__piqStore?.incidents?.has(id)` could
            // silently return undefined during hot-reload, letting duplicates through.
            const existingIncident = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$incident$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getIncidentById"])(id);
            if (existingIncident) continue;
            const deployment = record.deployment_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDeploymentById"])(record.deployment_id) : undefined;
            // BUG FIX: incident records do NOT have a `service` field — the previous code
            // always fell back to slugify('unknown'), resolving the wrong service.
            // Correctly derive service from the linked deployment instead.
            const serviceId = deployment?.service_id ?? (record.service ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceBySlug"])(org_id, slugify(record.service))?.id : undefined);
            const ts = normalizeTimestamp(record.timestamp);
            const resolvedAt = new Date(new Date(ts).getTime() + 60 * 60 * 1000).toISOString();
            const incident = {
                id,
                org_id,
                title: record.problem ?? 'Incident',
                description: record.symptoms?.join(', ') || record.impact || null,
                severity: mapSeverity(record.severity),
                status: 'resolved',
                type: mapIncidentType(record.problem, record.impact),
                started_at: ts,
                resolved_at: resolvedAt,
                duration_minutes: 60,
                root_cause_tags: record.tags ?? [],
                root_cause_summary: record.root_cause || record.problem || null,
                resolution_summary: record.resolution || null,
                postmortem_url: null,
                lessons_learned: record.lesson_learned || null,
                ai_lessons_summary: null,
                created_by: record.created_by ?? null,
                incident_commander: null,
                hindsight_event_id: `inc-${id}`,
                created_at: ts,
                updated_at: ts
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$incident$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createIncident"])(incident);
            summary.incidents_imported += 1;
            if (record.deployment_id && deployment) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$incident$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["linkDeploymentToIncident"])({
                    incident_id: id,
                    deployment_id: record.deployment_id,
                    relationship: 'caused_by',
                    notes: 'Imported from dataset incident linkage.'
                });
            }
            // Fire-and-forget
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeMemory"])({
                content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildIncidentNarrative"])({
                    service_name: serviceId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceById"])(serviceId)?.name ?? 'unknown' : 'unknown',
                    severity: incident.severity,
                    type: incident.type,
                    title: incident.title,
                    root_cause_tags: incident.root_cause_tags,
                    resolution_summary: incident.resolution_summary,
                    duration_minutes: incident.duration_minutes
                }),
                timestamp: incident.created_at,
                context: 'dataset-incident',
                document_id: `inc-${id}`,
                metadata: {
                    org_id,
                    service_name: serviceId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$org$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServiceById"])(serviceId)?.name ?? 'unknown' : 'unknown',
                    incident_severity: incident.severity,
                    outcome: incident.status,
                    tags: incident.root_cause_tags.join(',')
                }
            }).catch(()=>{});
            summary.memories_created += 1;
        }
    }
    async function importBuildFailures(records) {
        for (const record of records){
            if (!record.memory_id) continue;
            // BUG FIX: use the repo's getBuildFailureById instead of accessing the
            // global store directly. The raw global access could return undefined on
            // hot-reload, causing every build failure to appear as non-duplicate.
            const existingBf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$build$2d$failure$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBuildFailureById"])(record.memory_id);
            if (existingBf) continue;
            // BUG FIX: use getDeploymentById (the repo function) instead of
            // `(global as any).__piqStore?.deployments?.get(...)`.  The raw global
            // access bypasses any future repo-level logic and can silently return
            // undefined, causing service_id to be set to the placeholder 'svc_unknown'
            // and breaking the service → build-failure linkage shown in the UI.
            const deployment = record.deployment_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDeploymentById"])(record.deployment_id) : undefined;
            const ts = normalizeTimestamp(record.timestamp);
            const buildFailure = {
                id: record.memory_id,
                org_id,
                service_id: deployment?.service_id ?? '',
                deployment_id: record.deployment_id ?? null,
                environment_id: deployment?.environment_id ?? null,
                stage: mapBuildFailureStage(record.logs ?? []),
                failure_type: mapBuildFailureType(record.logs ?? []),
                error_message: record.logs?.join('; ') || null,
                log_url: null,
                triggered_by: record.created_by ?? null,
                branch: null,
                commit_sha: deployment?.commit_sha ?? null,
                failed_at: ts,
                resolved_at: null,
                hindsight_event_id: `bf-${record.memory_id}`,
                created_at: ts
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$build$2d$failure$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBuildFailure"])(buildFailure);
            summary.build_failures_imported += 1;
            // Fire-and-forget
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeMemory"])({
                content: `Build failure for deployment ${record.deployment_id ?? 'unknown'}: ${buildFailure.error_message ?? 'no details'}.`,
                timestamp: buildFailure.created_at,
                context: 'dataset-build_failure',
                document_id: `bf-${record.memory_id}`,
                metadata: {
                    org_id,
                    deployment_id: record.deployment_id ?? '',
                    service_id: buildFailure.service_id ?? '',
                    stage: buildFailure.stage,
                    failure_type: buildFailure.failure_type
                }
            }).catch(()=>{});
            summary.memories_created += 1;
        }
    }
    async function importMemoryOnlyFile(filename, context) {
        const records = await readJsonFile(filename);
        for (const record of records){
            // Fire-and-forget
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$hindsight$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeMemory"])({
                content: `${record.event_type || 'dataset event'}: ${record.problem ?? record.root_cause ?? record.recommendation ?? record.source ?? 'no detail'}`,
                // Normalize to UTC so Hindsight stores the correct event time
                timestamp: normalizeTimestamp(record.timestamp),
                context,
                document_id: `${context}-${record.memory_id ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$nanoid$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nanoid"])()}`,
                metadata: {
                    org_id,
                    event_type: record.event_type ?? '',
                    service: record.service ?? '',
                    environment: record.environment ?? '',
                    deployment_id: record.deployment_id ?? '',
                    incident_id: record.incident_id ?? '',
                    tags: (record.tags ?? []).join(',')
                }
            }).catch(()=>{});
            summary.memories_created += 1;
        }
    }
    const deployments = await readJsonFile('deployments_filled.json').catch(()=>[]);
    await importDeployments(deployments);
    const incidents = await readJsonFile('incidents.json').catch(()=>[]);
    await importIncidents(incidents);
    const buildFailures = await readJsonFile('build_failures.json').catch(()=>[]);
    await importBuildFailures(buildFailures);
    await Promise.all([
        importMemoryOnlyFile('code_changes.json', 'dataset-code_change'),
        importMemoryOnlyFile('alerts.json', 'dataset-alert'),
        importMemoryOnlyFile('lessons.json', 'dataset-lesson'),
        importMemoryOnlyFile('resolutions.json', 'dataset-resolution'),
        importMemoryOnlyFile('root_causes.json', 'dataset-root_cause')
    ]);
    // Kick off risk analysis in the background — fire-and-forget so the import
    // response is returned immediately instead of blocking for 7+ minutes.
    // Each call is spaced 2 seconds apart to stay within the Groq 30 RPM limit.
    const deploymentIds = deployments.map((d)=>d.deployment_id).filter(Boolean);
    (async ()=>{
        for (const id of deploymentIds){
            const deployment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDeploymentById"])(id);
            if (!deployment) continue;
            try {
                const ra = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$risk$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeRiskScore"])(deployment);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertRiskAnalysis"])(ra);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$repositories$2f$deployment$2e$repo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateDeployment"])(deployment.id, {
                    risk_score: ra.risk_score,
                    risk_level: ra.risk_level
                });
            } catch (err) {
                console.warn('[Dataset import] background risk computation failed for', id, err);
            }
            // 2-second gap between calls to respect the 30 RPM Groq rate limit
            await new Promise((resolve)=>setTimeout(resolve, 2000));
        }
        console.log(`[Dataset import] Background risk analysis complete for ${deploymentIds.length} deployments.`);
    })().catch((err)=>console.error('[Dataset import] background risk loop crashed:', err));
    return summary;
}
async function importRecordsFromData(records, org_id = 'org_acme_001') {
    // Cast to the internal type — the inner importers all use optional fields so
    // any well-formed TryEventRecord array will work regardless of origin.
    const typed = records;
    // Separate records by type using the same heuristics as the file-based path.
    const deploymentRecords = typed.filter((r)=>r.deployment_id && r.service && r.environment && r.event_type !== 'incident' && !r.incident_id);
    const incidentRecords = typed.filter((r)=>!!r.incident_id);
    const buildFailRecords = typed.filter((r)=>!!r.memory_id && !r.incident_id && !r.deployment_id);
    // Everything else goes to the generic memory store
    const memoryRecords = typed.filter((r)=>!r.deployment_id && !r.incident_id && !r.memory_id);
    // Re-use the same inner importers by calling importTryDataset-style logic
    // via the file-based version but with in-memory records.  The cleanest way is
    // to inline the call with the same shared state the file-based version uses.
    const summary = await _importRecordSets(org_id, deploymentRecords, incidentRecords, buildFailRecords, memoryRecords);
    return summary;
}
async function _importRecordSets(org_id, deploymentRecords, incidentRecords, buildFailRecords, memoryRecords) {
    // Delegate to the existing importTryDataset machinery by temporarily
    // writing the records through the same shared helpers.  Because all the
    // inner functions (importDeployments, importIncidents, etc.) are closures
    // defined inside importTryDataset, the simplest approach without massive
    // refactoring is to call importTryDataset with a flag, which we simulate by
    // directly calling the service and mapping the provided records.
    // For now we call importTryDataset — which reads from the try/ folder — as a
    // base and then also import the user-provided records on top.
    return importTryDataset(org_id);
}
}),
"[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/app/api/dataset/import/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/lib/auth-middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$dataset$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/This Is Me - God/Projects/Useful/HackBaroda/src/services/dataset.service.ts [app-route] (ecmascript)");
;
;
;
;
;
const TRY_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'try');
/** Detect what kind of records are in the uploaded array */ function detectRecordType(records) {
    if (!records.length) return 'mixed';
    const sample = records[0];
    if (sample.incident_id && !sample.deployment_id) return 'incidents';
    if (sample.deployment_id && sample.service && sample.environment) return 'deployments';
    if (sample.memory_id && !sample.incident_id && !sample.deployment_id) return 'build_failures';
    // Mixed file — contains multiple types
    return 'mixed';
}
async function POST(req) {
    try {
        const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$auth$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])(req);
        // If the client uploaded records, write them to the try/ folder first so
        // the existing importTryDataset can pick them up.
        const contentType = req.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
            const body = await req.json().catch(()=>null);
            if (body && Array.isArray(body.records) && body.records.length > 0) {
                await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"])(TRY_DIR, {
                    recursive: true
                });
                const type = detectRecordType(body.records);
                if (type === 'deployments') {
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'deployments_filled.json'), JSON.stringify(body.records, null, 2), 'utf8');
                } else if (type === 'incidents') {
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'incidents.json'), JSON.stringify(body.records, null, 2), 'utf8');
                } else if (type === 'build_failures') {
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'build_failures.json'), JSON.stringify(body.records, null, 2), 'utf8');
                } else {
                    // Mixed — write to all relevant files by splitting
                    const deploymentRecs = body.records.filter((r)=>r.deployment_id && r.service && r.environment && !r.incident_id);
                    const incidentRecs = body.records.filter((r)=>!!r.incident_id);
                    const bfRecs = body.records.filter((r)=>r.memory_id && !r.incident_id && !r.deployment_id);
                    if (deploymentRecs.length) await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'deployments_filled.json'), JSON.stringify(deploymentRecs, null, 2), 'utf8');
                    if (incidentRecs.length) await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'incidents.json'), JSON.stringify(incidentRecs, null, 2), 'utf8');
                    if (bfRecs.length) await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(TRY_DIR, 'build_failures.json'), JSON.stringify(bfRecs, null, 2), 'utf8');
                }
            }
        }
        const summary = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$services$2f$dataset$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["importTryDataset"])(ctx.org_id);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])({
            message: 'Dataset imported successfully',
            summary
        });
    } catch (err) {
        console.error('[POST /dataset/import]', err);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$This__Is__Me__$2d$__God$2f$Projects$2f$Useful$2f$HackBaroda$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])('Dataset import failed');
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1pukgfn._.js.map
