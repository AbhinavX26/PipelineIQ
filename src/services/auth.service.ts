/**
 * Auth Service
 *
 * Handles password hashing, JWT creation/verification, and session logic.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { User } from '../models/types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'piq_dev_secret_change_in_production';
const JWT_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_IN = '7d';
const BCRYPT_ROUNDS = 10;

// ── Password ───────────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── JWT ────────────────────────────────────────────────────────────────────

export interface TokenPayload {
  sub: string;      // user ID
  org_id: string;
  role: string;
  exp?: number;
}

export function signAccessToken(payload: Omit<TokenPayload, 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function signRefreshToken(payload: Omit<TokenPayload, 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// ── Extract token from request header ─────────────────────────────────────

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim();
}

// ── Public user shape (strip sensitive fields) ────────────────────────────

export function toPublicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    org_id: user.org_id,
    avatar_url: user.avatar_url,
    mfa_enabled: user.mfa_enabled,
    last_login_at: user.last_login_at,
    created_at: user.created_at,
  };
}
