export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
  address: string;
  isOpen: boolean;
  offers?: string[];
  menu?: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating?: number;
  bestseller?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'on-the-way' | 'delivered';
  estimatedTime: string;
  restaurant: Restaurant;
  orderTime: Date;
}