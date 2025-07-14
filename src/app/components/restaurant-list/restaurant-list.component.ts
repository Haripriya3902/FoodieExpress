import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, RestaurantCardComponent],
  template: `
    <section class="restaurant-list-section section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Popular Restaurants</h2>
          <p class="section-subtitle">
            Discover amazing restaurants around you
          </p>
        </div>
        
        <div class="filters">
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'all'"
            (click)="filterByCategory('all')"
          >
            All
          </button>
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'american'"
            (click)="filterByCategory('american')"
          >
            American
          </button>
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'italian'"
            (click)="filterByCategory('italian')"
          >
            Italian
          </button>
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'japanese'"
            (click)="filterByCategory('japanese')"
          >
            Japanese
          </button>
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'mexican'"
            (click)="filterByCategory('mexican')"
          >
            Mexican
          </button>
          <button 
            class="filter-btn"
            [class.active]="selectedCategory === 'indian'"
            (click)="filterByCategory('indian')"
          >
            Indian
          </button>
        </div>
        
        <div class="restaurants-grid" *ngIf="restaurants$ | async as restaurants">
          <app-restaurant-card 
            *ngFor="let restaurant of restaurants" 
            [restaurant]="restaurant"
            class="fade-in">
          </app-restaurant-card>
        </div>
        
        <div class="empty-state" *ngIf="(restaurants$ | async)?.length === 0">
          <h3>No restaurants found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .restaurant-list-section {
      background: #F7FAFC;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 48px;
    }
    
    .section-title {
      font-size: 36px;
      font-weight: 700;
      color: #2D3748;
      margin-bottom: 16px;
    }
    
    .section-subtitle {
      font-size: 18px;
      color: #718096;
      margin: 0;
    }
    
    .filters {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 12px 24px;
      background: white;
      border: 2px solid #E2E8F0;
      border-radius: 25px;
      font-weight: 500;
      color: #4A5568;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
      border-color: #FF6B35;
      color: #FF6B35;
    }
    
    .filter-btn.active {
      background: #FF6B35;
      border-color: #FF6B35;
      color: white;
    }
    
    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }
    
    .empty-state h3 {
      font-size: 24px;
      color: #2D3748;
      margin-bottom: 12px;
    }
    
    .empty-state p {
      color: #718096;
      font-size: 16px;
    }
    
    @media (max-width: 768px) {
      .section-title {
        font-size: 28px;
      }
      
      .section-subtitle {
        font-size: 16px;
      }
      
      .filters {
        gap: 8px;
      }
      
      .filter-btn {
        padding: 8px 16px;
        font-size: 14px;
      }
      
      .restaurants-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  `]
})
export class RestaurantListComponent implements OnInit {
  restaurants$: Observable<Restaurant[]>;
  selectedCategory: string = 'all';

  constructor(private restaurantService: RestaurantService) {
    this.restaurants$ = this.restaurantService.getRestaurants();
  }

  ngOnInit(): void {}

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.restaurants$ = this.restaurantService.getRestaurants();
    } else {
      this.restaurants$ = this.restaurantService.getRestaurantsByCategory(category);
    }
  }
}