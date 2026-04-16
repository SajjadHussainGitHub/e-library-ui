import { Injectable } from '@angular/core';

export type UserRole = 'Admin' | 'Teacher' | 'Student';

export interface AuthSession {
  email: string;
  role: UserRole;
}

const STORAGE_KEY = 'elibrary_session';

/** Route segment after /dashboard/ — used for RBAC checks. */
export type DashboardRouteKey =
  | 'catalog'
  | 'borrowed-books'
  | 'community'
  | 'profile'
  | 'preferences'
  | 'saved-lists'
  | 'admin';

export const ROLE_ACCESS: Record<UserRole, readonly DashboardRouteKey[]> = {
  Admin: [
    'catalog',
    'borrowed-books',
    'community',
    'profile',
    'preferences',
    'saved-lists',
    'admin',
  ],
  Teacher: [
    'catalog',
    'borrowed-books',
    'community',
    'profile',
    'preferences',
    'saved-lists',
  ],
  Student: ['catalog', 'borrowed-books', 'profile', 'preferences', 'saved-lists'],
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private session: AuthSession | null = null;

  constructor() {
    this.session = this.readStoredSession();
  }

  isAuthenticated(): boolean {
    return this.session !== null;
  }

  getSession(): AuthSession | null {
    return this.session ? { ...this.session } : null;
  }

  getRole(): UserRole | null {
    return this.session?.role ?? null;
  }

  login(email: string, role: UserRole): void {
    const trimmed = email.trim();
    this.session = { email: trimmed, role };
    this.persistSession(this.session);
  }

  logout(): void {
    this.session = null;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  hasRole(allowed: readonly UserRole[]): boolean {
    const role = this.getRole();
    return role !== null && allowed.includes(role);
  }

  /** Whether the current user may open a dashboard child route by path segment. */
  canAccessDashboardRoute(routeKey: DashboardRouteKey): boolean {
    const role = this.getRole();
    if (!role) {
      return false;
    }
    return ROLE_ACCESS[role].includes(routeKey);
  }

  getDefaultDashboardPath(): string {
    const role = this.getRole();
    return role === 'Admin' ? '/dashboard/admin' : '/dashboard/catalog';
  }

  private readStoredSession(): AuthSession | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as unknown;
      if (!parsed || typeof parsed !== 'object') {
        return null;
      }
      const email = (parsed as { email?: string }).email;
      const role = (parsed as { role?: UserRole }).role;
      if (
        typeof email !== 'string' ||
        !email ||
        (role !== 'Admin' && role !== 'Teacher' && role !== 'Student')
      ) {
        return null;
      }
      return { email, role };
    } catch {
      return null;
    }
  }

  private persistSession(session: AuthSession): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      /* ignore */
    }
  }
}
