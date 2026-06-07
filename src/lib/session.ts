export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  org_id: string;
  avatar_url?: string | null;
}

export interface AuthSession {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  user: AuthSessionUser;
  orgName?: string;
}

const STORAGE_KEY = 'piq_auth_session';

function parseStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as AuthSession : null;
  } catch {
    return null;
  }
}

export function getAuthSession(): AuthSession | null {
  return parseStoredSession();
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): AuthSessionUser | null {
  return parseStoredSession()?.user ?? null;
}

export function getAuthToken(): string | null {
  return parseStoredSession()?.access_token ?? null;
}

export function getCurrentOrgName(): string | null {
  return parseStoredSession()?.orgName ?? null;
}

export function getCurrentUserInitials(): string {
  const user = getCurrentUser();
  if (!user?.name) return 'AM';
  const parts = user.name.split(' ').filter(Boolean);
  const initials = parts.length === 0 ? 'AM' : parts.slice(0, 2).map(part => part[0].toUpperCase()).join('');
  return initials || 'AM';
}

export function getCurrentUserShortName(): string {
  const user = getCurrentUser();
  if (!user?.name) return 'Arjun';
  return user.name.split(' ')[0] || user.name;
}
