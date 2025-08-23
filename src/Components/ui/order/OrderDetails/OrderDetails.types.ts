// Types
export interface OrderedProduct {
  id: string;
  name: string;
  variant?: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  totalAmount: number;
  status: "Pending" | "Delivered" | "Cancelled" | "Processing";
  products: OrderedProduct[];
}
