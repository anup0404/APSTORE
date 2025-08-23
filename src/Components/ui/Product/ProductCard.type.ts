export interface Product {
  id: string;
  title: string;
  image?: string;
  images?: string[]; // Added for multiple images support
  price: string;
  oldPrice?: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating: number; // out of 5
  description?: string; // Added for hover overlay description
  category?: string; // Added for categorization
  brand?: string; // Added for luxury brand context
  availability?: "in-stock" | "out-of-stock" | "low-stock"; // Added for inventory status
}
