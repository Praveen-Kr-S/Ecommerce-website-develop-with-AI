export type ProductCategory = 'Electronics' | 'Fashion' | 'Shoes' | 'Accessories' | 'Home';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  description: string;
  features?: string[];
  image: string;
  isFeatured?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingDetails: ShippingDetails;
}
