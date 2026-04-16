import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <-- 1. Import ReactiveFormsModule
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthService, type UserRole } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['Student', Validators.required] // <-- Add the role control here
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['Student', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, role } = this.loginForm.value as { email: string; role: UserRole };
    this.auth.login(email, role);
    void this.navigateAfterLogin(role);
  }

  /** Demo shortcut: sign in as admin and open the admin panel. */
  loginAsAdmin(): void {
    this.auth.login('admin@elibrary.edu', 'Admin');
    void this.navigateAfterLogin('Admin');
  }

  register(): void {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
    }
  }

  private async navigateAfterLogin(role: UserRole): Promise<void> {
    const target = role === 'Admin' ? '/dashboard/admin' : '/dashboard/catalog';
    await this.router.navigateByUrl(target);
  }
}