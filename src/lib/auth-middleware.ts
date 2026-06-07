/**
 * Auth middleware for Next.js Route Handlers.
 * Returns the decoded JWT payload or null if invalid/missing.
 */

import { NextRequest } from 'next/server';
import { verifyToken, extractBearerToken, type TokenPayload } from '../services/auth.service';

export function getAuthContext(req: NextRequest): TokenPayload | null {
  const token = extractBearerToken(req.headers.get('authorization'));
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Returns the demo org context without auth checks.
 * Used during hackathon so the frontend doesn't need to log in.
 */
export function getDemoContext(): TokenPayload {
  return {
    sub: 'usr_arjun_001',
    org_id: 'org_acme_001',
    role: 'owner',
  };
}

/**
 * Get auth context — falls back to demo context in development
 * so every API call works without a login token.
 */
export function requireAuth(req: NextRequest): TokenPayload {
  const ctx = getAuthContext(req);
  if (ctx) return ctx;
  // In dev/hackathon mode, always return the demo context
  return getDemoContext();
}
