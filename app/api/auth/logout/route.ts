import { NextRequest } from 'next/server';
import { ok } from '@/src/lib/response';

// Stateless logout — client should discard the token
export async function POST(_req: NextRequest) {
  return ok({ message: 'Logged out successfully' });
}
