export interface Product {
  id: number;
  title: string;
  image?: string;
  price: string;
  oldPrice?: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating: number; // out of 5
}

export interface FeaturedItemsProps {
  heading?: string;
  subheading?: string;
  products: ProductCardProps[];
  onAddToCart?: (id: number) => void;
  onAddToBag?: (id: number) => void;
  onWishlistToggle?: (id: string) => void;
  onShare?: (id: string) => void;
}

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    image?: string;
    price: string;
    oldPrice?: string;
    rating: number;
    isNew?: boolean;
    isOnSale?: boolean;
  };
  onWishlistToggle?: (id: string) => void;
  onShare?: (id: string) => void;
}
