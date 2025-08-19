export interface productDetailTypes {
  id: string; // Unique identifier (UUID or string ID)
  name: string; // Product name
  description?: string; // Optional product description
  price: number; // Price of the product
  currency?: string; // Currency code (e.g., "USD", "INR")
  stock: number; // Available quantity
  category?: string; // Category name (e.g., "Electronics", "Clothing")
  brand?: string; // Brand name
  images?: string[]; // Array of image URLs
  rating?: number; // Average rating (0–5)
  reviewsCount?: number; // Number of reviews
  createdAt?: Date; // Date when product was added
  updatedAt?: Date; // Last update timestamp
  isAvailable?: boolean; // Availability flag
  tags?: string[]; // Keywords/tags for searching
  variants?: Variant[]; // Optional product variants (size, color, etc.)
}

export interface Variant {
  id: string;
  name: string; // Variant name (e.g., "Red", "Large")
  price?: number; // Override price if variant differs
  stock?: number; // Variant-specific stock
  image?: string; // Variant-specific image
}
