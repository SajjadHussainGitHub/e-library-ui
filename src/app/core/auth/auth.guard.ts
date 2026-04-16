import { inject } from '@angular/core';
import {
  Router,
  type CanActivateFn,
  type UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { ROLE_ACCESS, type DashboardRouteKey } from './auth.service';

/** Requires a signed-in user; otherwise sends them to login. */
export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.parseUrl('/login');
};

const VALID_SEGMENTS: readonly DashboardRouteKey[] = [
  'catalog',
  'borrowed-books',
  'community',
  'profile',
  'preferences',
  'saved-lists',
  'admin',
];

/** Validates access directly from target URL segment and role map. */
export const roleGuard: CanActivateFn = (_route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    return router.parseUrl('/login');
  }
  const role = auth.getRole();
  if (!role) {
    return router.parseUrl('/login');
  }
  const parts = state.url.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const segment = parts[parts.length - 1] as DashboardRouteKey | undefined;
  if (!segment || !VALID_SEGMENTS.includes(segment)) {
    return true;
  }
  if (ROLE_ACCESS[role].includes(segment)) {
    return true;
  }
  return router.parseUrl(auth.getDefaultDashboardPath());
};

/** Logged-in users hitting /login are sent to the dashboard. */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    return true;
  }
  return router.parseUrl(auth.getDefaultDashboardPath());
};
