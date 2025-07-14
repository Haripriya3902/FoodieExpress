import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/restaurant.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-item card">
      <div class="item-image">
        <img [src]="menuItem.image" [alt]="menuItem.name" class="food-image">
        <div class="item-badges">
          <span class="badge badge-success" *ngIf="menuItem.bestseller">Bestseller</span>
          <span class="badge badge-info" *ngIf="menuItem.isVeg">Veg</span>
        </div>
      </div>
      
      <div class="item-content">
        <div class="item-header">
          <h4 class="item-name">{{ menuItem.name }}</h4>
          <div class="item-rating" *ngIf="menuItem.rating">
            <span class="star">★</span>
            <span class="rating-value">{{ menuItem.rating }}</span>
          </div>
        </div>
        
        <p class="item-description">{{ menuItem.description }}</p>
        
        <div class="item-footer">
          <div class="price-section">
            <span class="price">₹{{ menuItem.price }}</span>
            <span class="category">{{ menuItem.category }}</span>
          </div>
          
          <button 
            class="add-btn btn btn-primary"
            (click)="addToCart()"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      transition: all 0.3s ease;
    }
    
    .menu-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .item-image {
      position: relative;
      width: 120px;
      height: 120px;
      flex-shrink: 0;
    }
    
    .food-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .item-badges {
      position: absolute;
      top: 8px;
      left: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .item-name {
      font-size: 18px;
      font-weight: 600;
      color: #2D3748;
      margin: 0;
      flex: 1;
    }
    
    .item-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #48BB78;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .star {
      font-size: 10px;
    }
    
    .item-description {
      color: #718096;
      font-size: 14px;
      line-height: 1.4;
      margin: 0 0 16px 0;
    }
    
    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    
    .price-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .price {
      font-size: 20px;
      font-weight: 700;
      color: #2D3748;
    }
    
    .category {
      font-size: 12px;
      color: #A0AEC0;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    .add-btn {
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .menu-item {
        flex-direction: column;
        gap: 12px;
      }
      
      .item-image {
        width: 100%;
        height: 160px;
      }
      
      .item-footer {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
      }
      
      .price-section {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  `]
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() restaurantId!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(): void {
    this.cartService.addToCart(this.menuItem, this.restaurantId);
    console.log('Added to cart:', this.menuItem.name);
  }
}