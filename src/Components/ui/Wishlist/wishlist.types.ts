// Types
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  collection?: string;
  isNew?: boolean;
  isExclusive?: boolean;
  description?: string;
  details?: string;
}
