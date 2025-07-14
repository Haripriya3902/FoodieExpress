import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h1>FoodieExpress</h1>
          </div>
          
          <nav class="nav">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">Restaurants</a>
            <a href="#" class="nav-link">Orders</a>
            <a href="#" class="nav-link">Help</a>
          </nav>
          
          <div class="header-actions">
            <div *ngIf="!(isAuthenticated$ | async); else userMenu">
              <button class="btn btn-outline btn-sm" (click)="goToLogin()">Login</button>
            </div>
            
            <ng-template #userMenu>
              <div class="user-menu">
                <span class="user-name">Hi, {{ (currentUser$ | async)?.name }}</span>
                <button class="btn btn-outline btn-sm" (click)="logout()">Logout</button>
              </div>
            </ng-template>
            
            <button class="cart-btn" (click)="toggleCart()">
              <span class="cart-icon">🛒</span>
              <span class="cart-count" *ngIf="(cartItemCount$ | async)! > 0">
                {{ cartItemCount$ | async }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
    }
    
    .logo h1 {
      color: #FF6B35;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    
    .nav {
      display: flex;
      gap: 32px;
    }
    
    .nav-link {
      color: #4A5568;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover {
      color: #FF6B35;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-name {
      color: #4A5568;
      font-weight: 500;
      font-size: 14px;
    }
    
    .btn-sm {
      padding: 8px 16px;
      font-size: 14px;
    }
    
    .cart-btn {
      position: relative;
      background: #FF6B35;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .cart-btn:hover {
      background: #E55A2B;
      transform: translateY(-2px);
    }
    
    .cart-icon {
      font-size: 18px;
    }
    
    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #E53E3E;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      
      .logo h1 {
        font-size: 20px;
      }
      
      .header-actions {
        gap: 12px;
      }
      
      .user-name {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  cartItemCount$: Observable<number>;
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItemCount$ = this.cartService.getCartItemCount();
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleCart(): void {
    // Implementation for cart toggle
    console.log('Cart toggled');
  }
}