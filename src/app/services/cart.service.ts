import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, MenuItem } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(menuItem: MenuItem, restaurantId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => 
      item.menuItem.id === menuItem.id && item.restaurantId === restaurantId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({
        menuItem,
        quantity: 1,
        restaurantId
      });
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  removeFromCart(menuItemId: number, restaurantId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const filteredItems = currentItems.filter(item => 
      !(item.menuItem.id === menuItemId && item.restaurantId === restaurantId)
    );
    this.cartItemsSubject.next(filteredItems);
  }

  updateQuantity(menuItemId: number, restaurantId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(menuItemId, restaurantId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => 
      item.menuItem.id === menuItemId && item.restaurantId === restaurantId
    );

    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartTotal(): Observable<number> {
    return new BehaviorSubject(
      this.cartItemsSubject.value.reduce((total, item) => 
        total + (item.menuItem.price * item.quantity), 0
      )
    ).asObservable();
  }

  getCartItemCount(): Observable<number> {
    return new BehaviorSubject(
      this.cartItemsSubject.value.reduce((count, item) => count + item.quantity, 0)
    ).asObservable();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}