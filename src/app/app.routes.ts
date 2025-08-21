import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CatalogComponent } from './dashboard/catalog/catalog.component';
import { BorrowedBooksComponent } from './dashboard/borrowed-books/borrowed-books.component';
import { CommunityComponent } from './dashboard/community/community.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: '', redirectTo: 'catalog', pathMatch: 'full' },
        { path: 'catalog', component: CatalogComponent },
        { path: 'borrowed-books', component: BorrowedBooksComponent },
        { path: 'community', component: CommunityComponent },
      ],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // Wildcard route for a 404 page
    { path: '**', redirectTo: 'login' }
  ];
