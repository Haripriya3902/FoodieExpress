import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title fade-in">
              Delicious Food <br>
              <span class="text-primary">Delivered Fast</span>
            </h1>
            <p class="hero-subtitle fade-in">
              Order from your favorite restaurants and get fresh, hot meals delivered to your door in minutes.
            </p>
            
            <div class="search-section fade-in">
              <div class="search-bar">
                <input 
                  type="text" 
                  placeholder="Enter your address or restaurant name"
                  class="search-input"
                  [(ngModel)]="searchQuery"
                  (keyup.enter)="onSearch()"
                >
                <button class="search-btn btn btn-primary" (click)="onSearch()">
                  Search
                </button>
              </div>
              
              <div class="popular-searches">
                <span>Popular:</span>
                <button class="popular-tag" (click)="searchFor('pizza')">Pizza</button>
                <button class="popular-tag" (click)="searchFor('burger')">Burger</button>
                <button class="popular-tag" (click)="searchFor('sushi')">Sushi</button>
                <button class="popular-tag" (click)="searchFor('indian')">Indian</button>
              </div>
            </div>
          </div>
          
          <div class="hero-image">
            <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" 
                 alt="Delicious Food" 
                 class="hero-img slide-up">
          </div>
        </div>
        
        <div class="stats">
          <div class="stat-item">
            <h3>500+</h3>
            <p>Restaurants</p>
          </div>
          <div class="stat-item">
            <h3>10k+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="stat-item">
            <h3>15 min</h3>
            <p>Avg. Delivery</p>
          </div>
          <div class="stat-item">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #FFF5F0 0%, #FFF8F3 100%);
      padding: 120px 0 80px;
      margin-top: 80px;
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      margin-bottom: 60px;
    }
    
    .hero-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 20px;
      color: #2D3748;
    }
    
    .hero-subtitle {
      font-size: 18px;
      color: #718096;
      margin-bottom: 40px;
      line-height: 1.6;
    }
    
    .search-section {
      margin-bottom: 40px;
    }
    
    .search-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .search-input {
      flex: 1;
      padding: 16px 20px;
      border: 2px solid #E2E8F0;
      border-radius: 12px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #FF6B35;
    }
    
    .search-btn {
      padding: 16px 32px;
      white-space: nowrap;
    }
    
    .popular-searches {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      color: #718096;
    }
    
    .popular-tag {
      background: #E2E8F0;
      color: #4A5568;
      border: none;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .popular-tag:hover {
      background: #FF6B35;
      color: white;
    }
    
    .hero-image {
      display: flex;
      justify-content: center;
    }
    
    .hero-img {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-item h3 {
      font-size: 32px;
      font-weight: 700;
      color: #FF6B35;
      margin-bottom: 8px;
    }
    
    .stat-item p {
      color: #718096;
      font-size: 14px;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 100px 0 60px;
      }
      
      .hero-content {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      
      .hero-title {
        font-size: 36px;
      }
      
      .hero-subtitle {
        font-size: 16px;
      }
      
      .search-bar {
        flex-direction: column;
      }
      
      .stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
      
      .stat-item h3 {
        font-size: 24px;
      }
    }
  `]
})
export class HeroComponent implements OnInit {
  searchQuery: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      // Implementation for search functionality
    }
  }

  searchFor(query: string): void {
    this.searchQuery = query;
    this.onSearch();
  }
}