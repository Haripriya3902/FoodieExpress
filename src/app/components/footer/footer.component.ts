import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">FoodieExpress</h3>
            <p class="footer-description">
              Your favorite food delivery service. Fresh, fast, and delicious meals delivered to your door.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">Instagram</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Company</h4>
            <ul class="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">For Restaurants</h4>
            <ul class="footer-links">
              <li><a href="#">Partner with Us</a></li>
              <li><a href="#">Merchant Dashboard</a></li>
              <li><a href="#">Delivery API</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Support</h4>
            <ul class="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 FoodieExpress. All rights reserved.</p>
          <p>Made with ❤️ for food lovers everywhere</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #2D3748;
      color: white;
      padding: 60px 0 20px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }
    
    .footer-section h3,
    .footer-section h4 {
      margin-bottom: 20px;
    }
    
    .footer-title {
      color: #FF6B35;
      font-size: 24px;
      font-weight: 700;
    }
    
    .footer-heading {
      color: #E2E8F0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .footer-description {
      color: #A0AEC0;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    
    .social-links {
      display: flex;
      gap: 16px;
    }
    
    .social-link {
      color: #A0AEC0;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .social-link:hover {
      color: #FF6B35;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: 12px;
    }
    
    .footer-links a {
      color: #A0AEC0;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-links a:hover {
      color: #FF6B35;
    }
    
    .footer-bottom {
      border-top: 1px solid #4A5568;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #A0AEC0;
      font-size: 14px;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}