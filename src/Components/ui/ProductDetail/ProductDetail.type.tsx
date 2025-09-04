// // product.interfaces.ts

// /**
//  * Category represents a product category hierarchy
//  */
// export interface Category {
//   readonly id: string;
//   name: string;
//   parentCategoryId?: string | null; // Nullable parent for subcategories
//   subcategories?: Category[];
// }

// /**
//  * Join table linking Product and Category
//  */
// export interface ProductCategory {
//   readonly id: string;
//   readonly productId: string;
//   readonly categoryId: string;
// }

// /**
//  * Color type with name and hex value
//  */
// export interface ProductColor {
//   name: string;
//   value: string; // HEX color code like "#000000"
// }

// /**
//  * Product variant with optional color and size, includes price and stock
//  */
// export interface ProductVariant {
//   readonly id: string;
//   readonly productId: string;
//   color?: ProductColor;
//   size?: string | null;
//   price: number; // variant-specific price
//   stock: number;
//   imageUrl?: string; // URL to variant-specific image
// }

// /**
//  * Product image metadata
//  */
// export interface ProductImage {
//   readonly id: string;
//   readonly productId: string;
//   url: string;
//   isPrimary: boolean;
// }

// /**
//  * Review for a product
//  */
// export interface ProductReview {
//   readonly id: string;
//   readonly productId: string;
//   reviewerName?: string | null;
//   rating: number; // From 1 to 5
//   comment?: string | null;
//   reviewDate?: Date | null;
//   deliveryDate?: Date | null;
//   verified: boolean;
//   images?: string[]; // NEW → array of review image URLs
// }

// /**
//  * Strongly-typed key-value pairs for product features
//  */
// export interface ProductFeatures {
//   [key: string]: string;
// }

// /**
//  * Strongly-typed key-value pairs for product specifications
//  */
// export interface ProductSpecifications {
//   [key: string]: string;
// }

// /**
//  * Possible offers for a product
//  */
// export interface ProductOffers {
//   discount?: string;
//   cashback?: string;
//   exchange?: string;
// }

// /**
//  * Delivery info details
//  */
// export interface ProductDeliveryInfo {
//   free?: boolean;
//   express?: string;
// }

// /**
//  * Main product interface
//  */
// export interface Product {
//   readonly id: string;
//   title: string;
//   description?: string | null;
//   brand?: string | null;

//   price: number;
//   originalPrice?: number;

//   categories?: Category[];
//   variants?: ProductVariant[];
//   images?: ProductImage[];
//   reviews?: ProductReview[];

//   averageRating?: number;
//   reviewsCount?: number;
//   features?: ProductFeatures;
//   specifications?: ProductSpecifications;
//   offers?: ProductOffers;
//   deliveryInfo?: ProductDeliveryInfo;
//   returnPolicy?: string | null;

//   isActive: boolean;
//   isNew: boolean;

//   readonly createdAt: Date;
//   readonly updatedAt: Date;
// }

export interface ProductVariant {
  id?: string;
  color?: {
    name: string;
    value: string;
  };
  size?: string | null;
  stock?: boolean | number;
  price?: number;
  sku?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface ProductReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  reviewDate?: Date;
  verified?: boolean;
  images?: string[];
  helpful?: number;
}

export interface Product {
  id: string | number;
  title?: string;
  description?: string;
  price: number | string;
  originalPrice?: number;
  currency?: string;
  images?: ProductImage[] | string[];
  variants?: ProductVariant[];
  averageRating?: number;
  reviewsCount?: number;
  reviews?: ProductReview[];
  features?: Record<string, string>;
  specifications?: Record<string, string>;
  offers?: {
    discount?: number;
  };
  deliveryInfo?: {
    free?: boolean;
    express?: string;
  };
  returnPolicy?: string;
  badge?: "NEW" | "SALE" | "LIMITED" | "BESTSELLER" | "EXCLUSIVE";
  sustainability?: {
    isEcoFriendly?: boolean;
    certifications?: string[];
  };
  shipping?: {
    freeShipping: boolean;
    estimatedDays: string;
    expedited?: boolean;
  };
  returns?: {
    returnWindow: number;
    freeReturns: boolean;
  };
  loyalty?: {
    pointsEarned?: number;
    memberDiscount?: number;
  };
  giftWrapping?: boolean;
  personalizable?: boolean;
  virtualTryOn?: boolean;
}

// mockData/productDetailsMockData.ts

export const mockProductDetailsData = {
  id: "DIOR_001",
  title: "Miss Dior Eau de Parfum",
  description:
    "A vibrant and fresh interpretation of Miss Dior with wild notes of rose essence and patchouli. This modern fragrance embodies the free-spirited nature of today's Miss Dior.",
  price: 15800,
  originalPrice: 18500,
  currency: "₹",

  // Enhanced product images
  images: [
    {
      id: "img1",
      url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
      alt: "Miss Dior Eau de Parfum - Front View",
    },
    {
      id: "img2",
      url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=800&fit=crop",
      alt: "Miss Dior Eau de Parfum - Side View",
    },
    {
      id: "img3",
      url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=800&h=800&fit=crop",
      alt: "Miss Dior Eau de Parfum - Close Up",
    },
    {
      id: "img4",
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=800&fit=crop",
      alt: "Miss Dior Eau de Parfum - Lifestyle",
    },
  ],

  // Product variants with color and size options
  variants: [
    {
      id: "var1",
      color: { name: "Pink Bow", value: "#FFB6C1" },
      size: "30ml",
      stock: 15,
      price: 12800,
      sku: "DIOR_001_PINK_30ML",
    },
    {
      id: "var2",
      color: { name: "Pink Bow", value: "#FFB6C1" },
      size: "50ml",
      stock: 8,
      price: 15800,
      sku: "DIOR_001_PINK_50ML",
    },
    {
      id: "var3",
      color: { name: "Pink Bow", value: "#FFB6C1" },
      size: "100ml",
      stock: 3,
      price: 25800,
      sku: "DIOR_001_PINK_100ML",
    },
    {
      id: "var4",
      color: { name: "Silver Bow", value: "#C0C0C0" },
      size: "30ml",
      stock: 12,
      price: 12800,
      sku: "DIOR_001_SILVER_30ML",
    },
    {
      id: "var5",
      color: { name: "Silver Bow", value: "#C0C0C0" },
      size: "50ml",
      stock: 6,
      price: 15800,
      sku: "DIOR_001_SILVER_50ML",
    },
    {
      id: "var6",
      color: { name: "Gold Bow", value: "#FFD700" },
      size: "50ml",
      stock: 0, // Out of stock
      price: 15800,
      sku: "DIOR_001_GOLD_50ML",
    },
  ],

  // Rating and reviews
  averageRating: 4.7,
  reviewsCount: 342,
  reviews: [
    {
      id: "rev1",
      reviewerName: "Priya Sharma",
      rating: 5,
      comment:
        "Absolutely divine fragrance! The rose notes are so elegant and it lasts all day. I get compliments everywhere I go. The packaging is also incredibly beautiful - truly feels luxury.",
      reviewDate: new Date("2024-08-15"),
      verified: true,
      helpful: 28,
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
      ],
    },
    {
      id: "rev2",
      reviewerName: "Ananya Singh",
      rating: 4,
      comment:
        "Love the scent but found it a bit pricey. Quality is definitely there though. The 50ml bottle is a good size for daily use.",
      reviewDate: new Date("2024-08-10"),
      verified: true,
      helpful: 15,
    },
    {
      id: "rev3",
      reviewerName: "Kavya Patel",
      rating: 5,
      comment:
        "This is my signature fragrance now! Perfect for both day and evening wear. The rose and patchouli blend is just perfect.",
      reviewDate: new Date("2024-08-05"),
      verified: false,
      helpful: 22,
    },
    {
      id: "rev4",
      reviewerName: "Meera Joshi",
      rating: 4,
      comment:
        "Beautiful fragrance with good longevity. The bottle design is stunning and looks great on my vanity. Would recommend for special occasions.",
      reviewDate: new Date("2024-07-28"),
      verified: true,
      helpful: 19,
      images: [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=200&h=200&fit=crop",
      ],
    },
  ],

  // Product features and specifications
  features: {
    "Fragrance Family": "Floral",
    "Top Notes": "Mandarin, Blood Orange",
    "Heart Notes": "Rose, Peony",
    "Base Notes": "Patchouli, White Musk",
    Concentration: "Eau de Parfum",
    "Launch Year": "2021",
    Perfumer: "François Demachy",
  },

  specifications: {
    Volume: "Available in 30ml, 50ml, 100ml",
    "Bottle Material": "Glass with metal cap",
    "Package Dimensions": "12cm x 8cm x 8cm",
    Weight: "350g (50ml)",
    "Country of Origin": "France",
    "Shelf Life": "36 months from opening",
  },

  // Offers and discounts
  offers: {
    discount: 15,
  },

  // Product badges and flags
  badge: "BESTSELLER",

  // Sustainability information
  sustainability: {
    isEcoFriendly: true,
    certifications: [
      "Cruelty-Free",
      "Sustainable Packaging",
      "Responsible Sourcing",
    ],
  },

  // Shipping and delivery
  shipping: {
    freeShipping: true,
    estimatedDays: "2-3 business days",
    expedited: true,
  },

  // Return policy
  returns: {
    returnWindow: 30,
    freeReturns: true,
  },

  // Delivery information for tabs
  deliveryInfo: {
    free: true,
    express: "Same day delivery available in Mumbai, Delhi, Bangalore",
  },

  returnPolicy: "30-day hassle-free returns with original packaging",

  // Loyalty and rewards
  loyalty: {
    pointsEarned: 1580,
    memberDiscount: 5,
  },

  // Additional product features
  giftWrapping: true,
  personalizable: true,
  virtualTryOn: false, // Fragrance doesn't support virtual try-on
  hasAR: false,
  has360View: true,
  hasVideo: true,

  // Care instructions
  careInstructions: [
    "Store in a cool, dry place away from direct sunlight",
    "Keep bottle tightly closed when not in use",
    "Avoid extreme temperatures",
    "Do not shake the bottle vigorously",
  ],

  // Ingredients list
  ingredients: [
    "Alcohol",
    "Parfum (Fragrance)",
    "Aqua (Water)",
    "Benzyl Salicylate",
    "Hydroxycitronellal",
    "Linalool",
    "Citronellol",
    "Hexyl Cinnamal",
    "Geraniol",
    "Benzyl Alcohol",
  ],

  // Related product categories
  category: "Fragrance",
  subcategory: "Women's Perfume",
  brand: "Dior",

  // Product tags for search and filtering
  tags: ["floral", "elegant", "romantic", "evening", "signature", "luxury"],

  // Stock and availability
  stockCount: 42,
  lowStockThreshold: 10,
  inStock: true,
};

// Additional mock data for recommendations
export const mockRelatedProducts = [
  {
    id: "DIOR_002",
    name: "Dior J'adore Eau de Parfum",
    brand: "Dior",
    price: 16500,
    originalPrice: 19200,
    rating: 4.8,
    reviewCount: 287,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
    badge: "NEW",
    category: "Fragrance",
  },
  {
    id: "DIOR_003",
    name: "Lady Dior Medium Handbag",
    brand: "Dior",
    price: 485000,
    rating: 4.9,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    badge: "EXCLUSIVE",
    category: "Bags",
  },
  {
    id: "DIOR_004",
    name: "Dior Addict Lipstick",
    brand: "Dior",
    price: 3850,
    originalPrice: 4200,
    rating: 4.6,
    reviewCount: 423,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    badge: "SALE",
    category: "Makeup",
  },
  {
    id: "DIOR_005",
    name: "Dior Homme Intense",
    brand: "Dior",
    price: 18900,
    rating: 4.5,
    reviewCount: 198,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop",
    category: "Fragrance",
  },
];

// Mock data for recently viewed products
export const mockRecentlyViewed = [
  {
    id: "CHANEL_001",
    name: "Chanel No. 5 Eau de Parfum",
    brand: "Chanel",
    price: 19500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
    viewedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: "TOM_FORD_001",
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    price: 22800,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: "YSL_001",
    name: "YSL Black Opium",
    brand: "Yves Saint Laurent",
    price: 16200,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop",
    viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

// Example usage in your component:
/*
import { mockProductDetailsData } from './mockData/productDetailsMockData';

// In your component or API mock:
const useGetProductByIdQuery = (productId: string) => {
  return {
    data: mockProductDetailsData,
    isLoading: false,
    error: null
  };
};

// Or for testing multiple products:
export const mockProductsDatabase = {
  "DIOR_001": mockProductDetailsData,
  "DIOR_002": {
    // ... another product
  }
};
*/

// Alternative comprehensive product data with different category
export const mockHandbagProductData = {
  id: "DIOR_BAG_001",
  title: "Lady Dior Medium Cannage Bag",
  description:
    "The iconic Lady Dior bag epitomizes the House's vision of elegance and beauty. Sleek and refined, the timeless creation is crafted in black lambskin with Cannage stitching.",
  price: 485000,
  originalPrice: 515000,
  currency: "₹",

  images: [
    {
      id: "bag_img1",
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop",
      alt: "Lady Dior Medium Bag - Front View",
    },
    {
      id: "bag_img2",
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      alt: "Lady Dior Medium Bag - Side View",
    },
    {
      id: "bag_img3",
      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
      alt: "Lady Dior Medium Bag - Interior View",
    },
  ],

  variants: [
    {
      id: "bag_var1",
      color: { name: "Black", value: "#000000" },
      size: "Medium",
      stock: 5,
      price: 485000,
      sku: "DIOR_BAG_001_BLACK_MED",
    },
    {
      id: "bag_var2",
      color: { name: "Navy Blue", value: "#000080" },
      size: "Medium",
      stock: 3,
      price: 485000,
      sku: "DIOR_BAG_001_NAVY_MED",
    },
    {
      id: "bag_var3",
      color: { name: "Beige", value: "#F5F5DC" },
      size: "Medium",
      stock: 7,
      price: 485000,
      sku: "DIOR_BAG_001_BEIGE_MED",
    },
    {
      id: "bag_var4",
      color: { name: "Red", value: "#DC143C" },
      size: "Medium",
      stock: 0, // Out of stock
      price: 485000,
      sku: "DIOR_BAG_001_RED_MED",
    },
  ],

  averageRating: 4.9,
  reviewsCount: 127,
  reviews: [
    {
      id: "bag_rev1",
      reviewerName: "Aisha Khan",
      rating: 5,
      comment:
        "This bag is absolutely stunning! The craftsmanship is impeccable and it goes with everything. Worth every penny. The cannage stitching is so elegant.",
      reviewDate: new Date("2024-08-20"),
      verified: true,
      helpful: 34,
    },
    {
      id: "bag_rev2",
      reviewerName: "Rhea Kapoor",
      rating: 5,
      comment:
        "My dream bag finally! The quality is exceptional and it's even more beautiful in person. The size is perfect for daily use.",
      reviewDate: new Date("2024-08-18"),
      verified: true,
      helpful: 29,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
      ],
    },
    {
      id: "bag_rev3",
      reviewerName: "Sanya Malhotra",
      rating: 4,
      comment:
        "Beautiful bag but quite expensive. The leather quality is amazing and the design is timeless. Great investment piece.",
      reviewDate: new Date("2024-08-12"),
      verified: true,
      helpful: 18,
    },
  ],

  features: {
    Material: "Lambskin Leather",
    Hardware: "Antique Gold-Finish Metal",
    Closure: "Zip",
    Interior: "Black Lambskin Lining",
    Handles: "Two Top Handles",
    Strap: "Removable Shoulder Strap",
    Compartments: "Main compartment + Interior zip pocket",
  },

  specifications: {
    Dimensions: "32 x 24 x 12 cm",
    "Handle Drop": "12 cm",
    "Strap Length": "108 cm (adjustable)",
    Weight: "1.2 kg",
    "Made In": "Italy",
    "Care Instructions": "Professional leather cleaning recommended",
  },

  offers: {
    discount: 6,
  },

  badge: "EXCLUSIVE",

  sustainability: {
    isEcoFriendly: false,
    certifications: ["Ethically Sourced Leather", "Responsible Manufacturing"],
  },

  shipping: {
    freeShipping: true,
    estimatedDays: "1-2 business days",
    expedited: true,
  },

  returns: {
    returnWindow: 14, // Shorter window for luxury bags
    freeReturns: true,
  },

  deliveryInfo: {
    free: true,
    express:
      "Same day delivery in Delhi NCR, Mumbai, Bangalore for orders before 2 PM",
  },

  returnPolicy: "14-day return policy with original packaging and tags",

  loyalty: {
    pointsEarned: 48500,
    memberDiscount: 3,
  },

  giftWrapping: true,
  personalizable: true, // Can add initials
  virtualTryOn: true, // AR bag try-on
  hasAR: true,
  has360View: true,
  hasVideo: false,

  careInstructions: [
    "Store in dust bag when not in use",
    "Keep away from direct sunlight and heat",
    "Avoid contact with water and oil-based products",
    "Professional cleaning recommended",
    "Handle with care to maintain shape",
  ],

  category: "Bags",
  subcategory: "Handbags",
  brand: "Dior",

  tags: ["luxury", "iconic", "cannage", "lambskin", "investment", "classic"],

  stockCount: 15,
  lowStockThreshold: 5,
  inStock: true,
};

// // Mock data for makeup product
// export const mockMakeupProductData = {
//   id: "DIOR_MAKEUP_001",
//   title: "Dior Addict Lipstick - Refillable",
//   description:
//     "The iconic Dior Addict lipstick is reinvented in a refillable format with 90%* natural-origin ingredients. Composed with jasmine wax, plumping mango butter for absolute comfort.",
//   price: 3850,
//   originalPrice: 4200,
//   currency: "₹",

//   images: [
//     {
//       id: "lip_img1",
//       url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop",
//       alt: "Dior Addict Lipstick - Product Shot",
//     },
//     {
//       id: "lip_img2",
//       url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop",
//       alt: "Dior Addict Lipstick - Swatch",
//     },
//     {
//       id: "lip_img3",
//       url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=800&fit=crop",
//       alt: "Dior Addict Lipstick - Lifestyle",
//     },
//   ],

//   variants: [
//     {
//       id: "lip_var1",
//       color: { name: "Rose Nude", value: "#E6A4B4" },
//       size: "3.2g",
//       stock: 25,
//       price: 3850,
//       sku: "DIOR_LIP_001_ROSE_NUDE",
//     },
//     {
//       id: "lip_var2",
//       color: { name: "Coral Crush", value: "#FF7F7F" },
//       size: "4.2g",
//       stock: 18,
//       price: 3850,
//       sku: "DIOR_LIP_001_CORAL",
//     },
//     {
//       id: "lip_var3",
//       color: { name: "Berry Bold", value: "#8B1538" },
//       size: "5.2g",
//       stock: 12,
//       price: 3850,
//       sku: "DIOR_LIP_001_BERRY",
//     },
//     {
//       id: "lip_var4",
//       color: { name: "Classic Red", value: "#DC143C" },
//       size: "6.2g",
//       stock: 8,
//       price: 3850,
//       sku: "DIOR_LIP_001_RED",
//     },
//     {
//       id: "lip_var5",
//       color: { name: "Nude Pink", value: "#FDBCB4" },
//       size: "7.2g",
//       stock: 0, // Out of stock
//       price: 3850,
//       sku: "DIOR_LIP_001_NUDE_PINK",
//     },
//   ],

//   averageRating: 4.6,
//   reviewsCount: 568,
//   reviews: [
//     {
//       id: "1",
//       userId: "u1",
//       userName: "Sarah M.",
//       rating: 5,
//       title: "Absolutely love this fragrance!",
//       content:
//         "This perfume is incredible. The scent lasts all day and I get compliments wherever I go. The packaging is also beautiful.",
//       date: "2024-08-15",
//       verified: true,
//       helpful: 24,
//       images: [
//         "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
//       ],
//       productVariant: "50ml",
//     },
//     {
//       id: "2",
//       userId: "u2",
//       userName: "Emma K.",
//       rating: 4,
//       title: "Great quality but pricey",
//       content:
//         "The fragrance is beautiful and long-lasting. Worth the investment but definitely on the expensive side.",
//       date: "2024-08-10",
//       verified: true,
//       helpful: 18,
//       productVariant: "30ml",
//     },
//   ],

//   features: {
//     Formula: "90% Natural-Origin Ingredients",
//     Finish: "Satin",
//     Coverage: "Medium to Full",
//     "Key Ingredients": "Jasmine Wax, Mango Butter",
//     Texture: "Creamy and Comfortable",
//     "Wear Time": "Up to 6 hours",
//     Fragrance: "Subtle Vanilla Scent",
//   },

//   specifications: {
//     "Net Weight": "3.2g",
//     Dimensions: "2cm x 2cm x 8cm",
//     "Package Weight": "65g",
//     Refillable: "Yes",
//     "Cruelty-Free": "Yes",
//     "Shelf Life": "24 months",
//   },

//   offers: {
//     discount: 8,
//   },

//   badge: "NEW",

//   sustainability: {
//     isEcoFriendly: true,
//     certifications: ["Cruelty-Free", "Refillable Format", "90% Natural Origin"],
//   },

//   shipping: {
//     freeShipping: false, // Free shipping threshold not met
//     estimatedDays: "3-5 business days",
//     expedited: true,
//   },

//   returns: {
//     returnWindow: 30,
//     freeReturns: false, // Hygiene products typically non-returnable
//   },

//   deliveryInfo: {
//     free: false,
//     express: "Express delivery available for ₹200",
//   },

//   returnPolicy:
//     "Due to hygiene reasons, makeup products cannot be returned once opened",

//   loyalty: {
//     pointsEarned: 385,
//     memberDiscount: 10, // Higher discount for makeup
//   },

//   giftWrapping: true,
//   personalizable: false,
//   virtualTryOn: true, // Supports virtual makeup try-on
//   hasAR: true,
//   has360View: false,
//   hasVideo: true,

//   careInstructions: [
//     "Close tightly after each use",
//     "Store at room temperature",
//     "Keep away from direct heat and sunlight",
//     "Use within 24 months of opening",
//   ],

//   ingredients: [
//     "Dimethicone",
//     "Bis-Diglyceryl Polyacyladipate-2",
//     "Hydrogenated Polyisobutene",
//     "Phenoxyethanol",
//     "Tocopheryl Acetate (Vitamin E)",
//     "Vanilla Extract",
//     "Jasmine Wax",
//     "Mango Butter",
//   ],

//   category: "Makeup",
//   subcategory: "Lips",
//   brand: "Dior",

//   tags: [
//     "refillable",
//     "natural",
//     "comfortable",
//     "long-lasting",
//     "satin",
//     "luxury",
//   ],

//   stockCount: 63,
//   lowStockThreshold: 15,
//   inStock: true,
// };

// How to use this data in your component:
export const useProductDetailsMockData = (productId: string) => {
  const productDatabase: Record<string, unknown> = {
    DIOR_001: mockProductDetailsData,
    DIOR_BAG_001: mockHandbagProductData,
    // DIOR_MAKEUP_001: mockMakeupProductData,
  };

  return {
    data: productDatabase[productId] || mockProductDetailsData,
    isLoading: false,
    error: null,
  };
};
