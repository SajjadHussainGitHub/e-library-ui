import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogComponent } from './dashboard/catalog/catalog.component';
import { BorrowedBooksComponent } from './dashboard/borrowed-books/borrowed-books.component';
import { CommunityComponent } from './dashboard/community/community.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { PreferencesComponent } from './dashboard/preferences/preferences.component';
import { SavedListsComponent } from './dashboard/saved-lists/saved-lists.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { authGuard, guestGuard, roleGuard } from './core/auth/auth.guard';
import type { UserRole } from './core/auth/auth.service';

const allRoles: UserRole[] = ['Admin', 'Teacher', 'Student'];
const teacherUp: UserRole[] = ['Admin', 'Teacher'];
const adminOnly: UserRole[] = ['Admin'];

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'catalog', pathMatch: 'full' },
      {
        path: 'catalog',
        component: CatalogComponent,
        canActivate: [roleGuard],
        data: { roles: allRoles },
      },
      {
        path: 'borrowed-books',
        component: BorrowedBooksComponent,
        canActivate: [roleGuard],
        data: { roles: allRoles },
      },
      {
        path: 'community',
        component: CommunityComponent,
        canActivate: [roleGuard],
        data: { roles: teacherUp },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [roleGuard],
        data: { roles: allRoles },
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
        canActivate: [roleGuard],
        data: { roles: allRoles },
      },
      {
        path: 'saved-lists',
        component: SavedListsComponent,
        canActivate: [roleGuard],
        data: { roles: allRoles },
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [roleGuard],
        data: { roles: adminOnly },
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
