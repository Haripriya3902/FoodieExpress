import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/services/http-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="app">
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer *ngIf="!isAuthRoute()"></app-footer>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
    }
  `]
})
export class App {
  name = 'FoodieExpress';

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/register');
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
});