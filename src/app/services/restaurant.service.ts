import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant, MenuItem } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
  }

  getRestaurantById(id: number): Observable<Restaurant | undefined> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`);
  }

  searchRestaurants(query: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants?search=${query}`);
  }

  getRestaurantsByCategory(category: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants?category=${category}`);
  }
}