// TypeScript interfaces
export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  inStock: boolean;
  maxQuantity: number;
  category: string;
}

export interface CartSummary {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  savings: number;
}

export interface ShoppingCartRef {
  getTotalItems: () => number;
  getTotalAmount: () => number;
  clearCart: () => void;
  getCartItems: () => CartItem[];
}
