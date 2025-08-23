// product.interfaces.ts

/**
 * Category represents a product category hierarchy
 */
export interface Category {
  readonly id: string;
  name: string;
  parentCategoryId?: string | null; // Nullable parent for subcategories
  subcategories?: Category[];
}

/**
 * Join table linking Product and Category
 */
export interface ProductCategory {
  readonly id: string;
  readonly productId: string;
  readonly categoryId: string;
}

/**
 * Color type with name and hex value
 */
export interface ProductColor {
  name: string;
  value: string; // HEX color code like "#000000"
}

/**
 * Product variant with optional color and size, includes price and stock
 */
export interface ProductVariant {
  readonly id: string;
  readonly productId: string;
  color?: ProductColor;
  size?: string | null;
  price: number; // variant-specific price
  stock: number;
  imageUrl?: string; // URL to variant-specific image
}

/**
 * Product image metadata
 */
export interface ProductImage {
  readonly id: string;
  readonly productId: string;
  url: string;
  isPrimary: boolean;
}

/**
 * Review for a product
 */
export interface ProductReview {
  readonly id: string;
  readonly productId: string;
  reviewerName?: string | null;
  rating: number; // From 1 to 5
  comment?: string | null;
  reviewDate?: Date | null;
  deliveryDate?: Date | null;
  verified: boolean;
  images?: string[]; // NEW → array of review image URLs
}

/**
 * Strongly-typed key-value pairs for product features
 */
export interface ProductFeatures {
  [key: string]: string;
}

/**
 * Strongly-typed key-value pairs for product specifications
 */
export interface ProductSpecifications {
  [key: string]: string;
}

/**
 * Possible offers for a product
 */
export interface ProductOffers {
  discount?: string;
  cashback?: string;
  exchange?: string;
}

/**
 * Delivery info details
 */
export interface ProductDeliveryInfo {
  free?: boolean;
  express?: string;
}

/**
 * Main product interface
 */
export interface Product {
  readonly id: string;
  title: string;
  description?: string | null;
  brand?: string | null;

  price: number;
  originalPrice?: number;

  categories?: Category[];
  variants?: ProductVariant[];
  images?: ProductImage[];
  reviews?: ProductReview[];

  averageRating?: number;
  reviewsCount?: number;
  features?: ProductFeatures;
  specifications?: ProductSpecifications;
  offers?: ProductOffers;
  deliveryInfo?: ProductDeliveryInfo;
  returnPolicy?: string | null;

  isActive: boolean;
  isNew: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
