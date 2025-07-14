import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="restaurant-card card" (click)="onRestaurantClick()">
      <div class="card-image">
        <img [src]="restaurant.image" [alt]="restaurant.name" class="restaurant-image">
        <div class="overlay">
          <div class="delivery-time">{{ restaurant.deliveryTime }}</div>
          <div class="status-badge" [class.open]="restaurant.isOpen" [class.closed]="!restaurant.isOpen">
            {{ restaurant.isOpen ? 'Open' : 'Closed' }}
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="restaurant-header">
          <h3 class="restaurant-name">{{ restaurant.name }}</h3>
          <div class="rating">
            <span class="star">★</span>
            <span class="rating-value">{{ restaurant.rating }}</span>
          </div>
        </div>
        
        <p class="cuisine">{{ restaurant.cuisine }}</p>
        <p class="description">{{ restaurant.description }}</p>
        
        <div class="restaurant-meta">
          <div class="delivery-info">
            <span class="delivery-fee">₹{{ restaurant.deliveryFee }} delivery</span>
            <span class="separator">•</span>
            <span class="delivery-time">{{ restaurant.deliveryTime }}</span>
          </div>
        </div>
        
        <div class="offers" *ngIf="restaurant.offers && restaurant.offers.length > 0">
          <div class="offer-tag" *ngFor="let offer of restaurant.offers.slice(0, 2)">
            {{ offer }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .restaurant-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .restaurant-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
    
    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .restaurant-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .restaurant-card:hover .restaurant-image {
      transform: scale(1.05);
    }
    
    .overlay {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .delivery-time {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status-badge.open {
      background: #C6F6D5;
      color: #22543D;
    }
    
    .status-badge.closed {
      background: #FED7D7;
      color: #742A2A;
    }
    
    .card-content {
      padding: 20px;
    }
    
    .restaurant-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .restaurant-name {
      font-size: 20px;
      font-weight: 600;
      color: #2D3748;
      margin: 0;
      flex: 1;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #48BB78;
      color: white;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .star {
      font-size: 10px;
    }
    
    .cuisine {
      color: #718096;
      font-size: 14px;
      margin: 0 0 8px 0;
      font-weight: 500;
    }
    
    .description {
      color: #A0AEC0;
      font-size: 13px;
      margin: 0 0 16px 0;
      line-height: 1.4;
    }
    
    .restaurant-meta {
      margin-bottom: 16px;
    }
    
    .delivery-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #718096;
    }
    
    .delivery-fee {
      font-weight: 600;
    }
    
    .separator {
      color: #CBD5E0;
    }
    
    .offers {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .offer-tag {
      background: #FFF5F0;
      color: #FF6B35;
      border: 1px solid #FFD6CC;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .card-image {
        height: 160px;
      }
      
      .card-content {
        padding: 16px;
      }
      
      .restaurant-name {
        font-size: 18px;
      }
    }
  `]
})
export class RestaurantCardComponent implements OnInit {
  @Input() restaurant!: Restaurant;

  constructor() {}

  ngOnInit(): void {}

  onRestaurantClick(): void {
    console.log('Restaurant clicked:', this.restaurant.name);
    // Implementation for restaurant navigation
  }
}