/**
 * Standard API response helpers — matches the envelope from api-specs.md
 */

import { NextResponse } from 'next/server';

export type Meta = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export function ok<T>(data: T, meta?: Meta, status = 200) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
}

export function created<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function accepted<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 202 });
}

export function notFound(message = 'Resource not found') {
  return NextResponse.json(
    { success: false, error: { code: 'NOT_FOUND', message } },
    { status: 404 }
  );
}

export function badRequest(message: string, details?: { field: string; message: string }[]) {
  return NextResponse.json(
    { success: false, error: { code: 'VALIDATION_ERROR', message, ...(details ? { details } : {}) } },
    { status: 400 }
  );
}

export function unauthorized(message = 'Missing or invalid token') {
  return NextResponse.json(
    { success: false, error: { code: 'UNAUTHORIZED', message } },
    { status: 401 }
  );
}

export function forbidden(message = 'Insufficient permissions') {
  return NextResponse.json(
    { success: false, error: { code: 'FORBIDDEN', message } },
    { status: 403 }
  );
}

export function conflict(message: string) {
  return NextResponse.json(
    { success: false, error: { code: 'CONFLICT', message } },
    { status: 409 }
  );
}

export function serverError(message = 'Internal server error') {
  return NextResponse.json(
    { success: false, error: { code: 'INTERNAL_ERROR', message } },
    { status: 500 }
  );
}

export function parseQueryInt(val: string | null, fallback: number): number {
  const n = parseInt(val ?? '');
  return isNaN(n) ? fallback : n;
}
