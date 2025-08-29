export interface HomeProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  originalPrice: number;
  primary_image: string;
  rating: number;
  reviews: number;
  badge?: {
    isNew?: boolean;
    isOnSale?: boolean;
    isTopRated?: boolean;
    isBestSeller?: boolean;
    isLimitedStock?: boolean;
    isExclusive?: boolean;
    isPreOrder?: boolean;
    isFreeShipping?: boolean;
  };
  variant_images?: string[];
}

export interface HomeCategory {
  id: number;
  name: string;
  image: string;
  count: string;
}

export interface HomeVideo {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  videoUrl: string;
  thumbnail: string;
}
