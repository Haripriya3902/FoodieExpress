export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}