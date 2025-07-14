import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join FoodieExpress and start ordering</p>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              class="form-input"
              [class.error]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched"
              placeholder="Enter your full name"
            >
            <div class="error-message" *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched">
              <span *ngIf="registerForm.get('name')?.errors?.['required']">Name is required</span>
              <span *ngIf="registerForm.get('name')?.errors?.['minlength']">Name must be at least 2 characters</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-input"
              [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
              placeholder="Enter your email"
            >
            <div class="error-message" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              formControlName="phone"
              class="form-input"
              [class.error]="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched"
              placeholder="Enter your phone number"
            >
            <div class="error-message" *ngIf="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched">
              <span *ngIf="registerForm.get('phone')?.errors?.['required']">Phone number is required</span>
              <span *ngIf="registerForm.get('phone')?.errors?.['pattern']">Please enter a valid phone number</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="form-input"
              [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
              placeholder="Create a password"
            >
            <div class="error-message" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="form-input"
              [class.error]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched"
              placeholder="Confirm your password"
            >
            <div class="error-message" *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary btn-full"
              [disabled]="registerForm.invalid || isLoading"
            >
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? 
            <button class="link-btn" (click)="switchToLogin()">Sign in here</button>
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
      margin-bottom: 20px;
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
      
      .form-group {
        margin-bottom: 16px;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { confirmPassword, ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    }
  }

  switchToLogin(): void {
    this.router.navigate(['/login']);
  }
}