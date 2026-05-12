export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
