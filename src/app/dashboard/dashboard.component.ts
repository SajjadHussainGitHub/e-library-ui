// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService, type DashboardRouteKey } from '../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  currentYear = new Date().getFullYear();
  unreadNotifications = 4;
  currentPageTitle = 'Catalog';
  currentPageDescription = 'Discover curated books and explore the complete collection.';

  private readonly sidebarNavTemplate: Array<{
    label: string;
    route: string;
    icon: string;
    key: DashboardRouteKey;
  }> = [
    { label: 'Catalog', route: '/dashboard/catalog', icon: 'menu_book', key: 'catalog' },
    { label: 'Borrowed Books', route: '/dashboard/borrowed-books', icon: 'book', key: 'borrowed-books' },
    { label: 'Community', route: '/dashboard/community', icon: 'groups', key: 'community' },
    { label: 'Admin Panel', route: '/dashboard/admin', icon: 'admin_panel_settings', key: 'admin' },
  ];

  private readonly topNavTemplate: Array<{ label: string; route: string; key: DashboardRouteKey }> = [
    { label: 'Catalog', route: '/dashboard/catalog', key: 'catalog' },
    { label: 'Borrowed', route: '/dashboard/borrowed-books', key: 'borrowed-books' },
    { label: 'Community', route: '/dashboard/community', key: 'community' },
    { label: 'Admin', route: '/dashboard/admin', key: 'admin' },
  ];

  private readonly profileLinkTemplate: Array<{
    label: string;
    route: string;
    icon: string;
    key: DashboardRouteKey;
  }> = [
    { label: 'My Profile', route: '/dashboard/profile', icon: 'person', key: 'profile' },
    { label: 'Preferences', route: '/dashboard/preferences', icon: 'settings', key: 'preferences' },
    { label: 'Saved Lists', route: '/dashboard/saved-lists', icon: 'bookmark', key: 'saved-lists' },
    { label: 'Admin Panel', route: '/dashboard/admin', icon: 'admin_panel_settings', key: 'admin' },
  ];

  private readonly pageContent: Record<string, { title: string; description: string }> = {
    catalog: {
      title: 'Catalog',
      description: 'Discover curated books and explore the complete collection.'
    },
    'borrowed-books': {
      title: 'Borrowed Books',
      description: 'Manage due dates, renewals, and returns with confidence.'
    },
    community: {
      title: 'Community',
      description: 'Join reading clubs, programs, and reader conversations.'
    },
    profile: {
      title: 'My Profile',
      description: 'View your member details and account information.'
    },
    preferences: {
      title: 'Preferences',
      description: 'Customize notifications, reading mode, and recommendations.'
    },
    'saved-lists': {
      title: 'Saved Lists',
      description: 'Manage personal book collections and reading lists.'
    },
    admin: {
      title: 'Admin Panel',
      description: 'Upload books and manage library catalog content.'
    }
  };

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  get sidebarNavItems(): Array<{
    label: string;
    route: string;
    icon: string;
    key: DashboardRouteKey;
  }> {
    return this.sidebarNavTemplate.filter((item) =>
      this.auth.canAccessDashboardRoute(item.key)
    );
  }

  get topNavItems(): Array<{ label: string; route: string }> {
    return this.topNavTemplate
      .filter((item) => this.auth.canAccessDashboardRoute(item.key))
      .map(({ label, route }) => ({ label, route }));
  }

  get profileMenuLinks(): Array<{
    label: string;
    route: string;
    icon: string;
    key: DashboardRouteKey;
  }> {
    return this.profileLinkTemplate.filter((item) =>
      this.auth.canAccessDashboardRoute(item.key)
    );
  }

  get sessionEmail(): string {
    return this.auth.getSession()?.email ?? '';
  }

  get sessionRoleLabel(): string {
    const role = this.auth.getRole();
    if (role === 'Admin') {
      return 'Administrator';
    }
    if (role === 'Teacher') {
      return 'Teacher';
    }
    if (role === 'Student') {
      return 'Student';
    }
    return 'Library member';
  }

  ngOnInit(): void {
    this.updatePageTitle(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updatePageTitle(event.urlAfterRedirects));
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openNotifications(): void {
    this.unreadNotifications = 0;
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  private updatePageTitle(currentUrl: string): void {
    const path = currentUrl.split('/').pop() ?? 'catalog';
    const page = this.pageContent[path] ?? this.pageContent['catalog'];
    this.currentPageTitle = page.title;
    this.currentPageDescription = page.description;
  }

  signOut(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}