// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Import the Router
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isCollapsed = false;
// 2. Inject the Router service in the constructor
  constructor(private router: Router) { }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  signOut():void{
   // Add your sign-out logic here, e.g., clearing a token
    // localStorage.removeItem('authToken');

    // Then, navigate the user to the login page
    this.router.navigate(['/login']);
  }
}