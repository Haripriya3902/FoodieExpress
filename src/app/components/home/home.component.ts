import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, RestaurantListComponent],
  template: `
    <main class="main-content">
      <app-hero></app-hero>
      <app-restaurant-list></app-restaurant-list>
    </main>
  `,
  styles: [`
    .main-content {
      flex: 1;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}