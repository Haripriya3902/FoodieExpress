import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to your FoodieExpress account</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-input"
              [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
              placeholder="Enter your email"
            >
            <div class="error-message" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-input"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              placeholder="Enter your password"
            >
            <div class="error-message" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary btn-full"
              [disabled]="loginForm.invalid || isLoading"
            >
              {{ isLoading ? 'Signing In...' : 'Sign In' }}
            </button>
          </div>
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? 
            <button class="link-btn" (click)="switchToRegister()">Sign up here</button>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
      padding: 20px;
    }
    
    .auth-card {
      background: white;
      border-radius: 16px;
      padding: 48px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .auth-title {
      font-size: 28px;
      font-weight: 700;
      color: #2D3748;
      margin-bottom: 8px;
    }
    
    .auth-subtitle {
      color: #718096;
      font-size: 16px;
      margin: 0;
    }
    
    .auth-form {
      margin-bottom: 24px;
    }
    
    .form-group {
      margin-bottom: 24px;
    }
    
    .form-label {
      display: block;
      font-weight: 600;
      color: #2D3748;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #E2E8F0;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #FF6B35;
    }
    
    .form-input.error {
      border-color: #E53E3E;
    }
    
    .error-message {
      color: #E53E3E;
      font-size: 14px;
      margin-top: 8px;
    }
    
    .form-actions {
      margin-top: 32px;
    }
    
    .btn-full {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .auth-footer {
      text-align: center;
      color: #718096;
    }
    
    .link-btn {
      background: none;
      border: none;
      color: #FF6B35;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
    }
    
    .link-btn:hover {
      color: #E55A2B;
    }
    
    @media (max-width: 768px) {
      .auth-card {
        padding: 32px 24px;
      }
      
      .auth-title {
        font-size: 24px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }

  switchToRegister(): void {
    this.router.navigate(['/register']);
  }
}