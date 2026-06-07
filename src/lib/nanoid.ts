/**
 * Tiny ID generator — no external dep needed for mock layer.
 * Produces URL-safe IDs like "x7k2p9" (8-12 chars).
 * Replace with crypto.randomUUID() or Prisma's cuid2 for production.
 */

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function nanoid(length = 8): string {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return id;
}

export function uuid(): string {
  // Simple UUID v4 without external dep
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
