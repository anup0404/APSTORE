export interface Color {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  userId?: string;
  userName: string;
  rating: number;
  title?: string;
  content: string;
  date: string | Date;
  verified?: boolean;
  helpful?: number;
  images?: string[];
}

export interface ProductVariant {
  id: string;
  color: Color;
  size: string;
  stock: number;
  price: number;
  discount: number;
  sku: string;
  images: string[];
}

export interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  originalPrice: number;
  badge?: string;
  lowStockThreshold: number;
  averageRating: number;
  reviewCount: number;
  loyalty: {
    pointsEarned: number;
  };
  shipping: {
    freeShipping: boolean;
    estimatedDays: string;
    expedited: boolean;
  };
  returns: {
    returnWindow: number;
    freeReturns: boolean;
  };
  variants: ProductVariant[];
  videos: string[];
  has360View: boolean;
  virtualTryOn: boolean;
  personalizable: boolean;
  giftWrapping: boolean;
  sustainability: {
    isEcoFriendly: boolean;
    certifications: string[];
    carbonFootprint: string;
  };
  features: {
    [key: string]: string;
  };
  specifications: {
    [key: string]: string;
  };
  deliveryInfo: {
    free: boolean;
    express: string;
  };
  returnPolicy: string;
  reviews: Review[];
}

export interface ColorWithAvailability extends Color {
  isAvailable: boolean;
}

export interface SizeOption {
  size: string;
  stock: number;
  isAvailable: boolean;
}

// data/sampleData.ts
export const sampleProducts: Product[] = [
  {
    id: "prod1",
    brand: "Gendori",
    title: "Classic T-Shirt",
    description: "Comfortable cotton T-shirt in multiple colors and sizes.",
    originalPrice: 100,
    badge: "SALE",
    lowStockThreshold: 5,
    averageRating: 4.5,
    reviewCount: 10,
    virtualTryOn: true,
    personalizable: true,
    giftWrapping: true,
    loyalty: {
      pointsEarned: 150,
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "3-5 days",
      expedited: false,
    },
    returns: {
      returnWindow: 30,
      freeReturns: true,
    },
    features: {
      Scent: "Floral",
      Longevity: "8 hours",
      Packaging: "Glass Bottle",
    },
    specifications: {
      Volume: "50ml",
      Origin: "France",
    },
    deliveryInfo: {
      free: true,
      express: "Next Day Delivery",
    },
    returnPolicy: "Returns accepted within 30 days",

    variants: [
      {
        id: "variant1",
        color: { name: "Red", value: "#FF0000" },
        size: "M",
        stock: 10,
        discount: 5,
        price: 95,
        sku: "PROD1_RED_M",
        images: [
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop",
        ],
      },
      {
        id: "variant2",
        color: { name: "Red", value: "#FF0000" },
        size: "L",
        stock: 3,
        discount: 5,
        price: 95,
        sku: "PROD1_RED_L",
        images: ["red-l-1.jpg", "red-l-2.jpg"],
      },
      {
        id: "variant3",
        color: { name: "Blue", value: "#0000FF" },
        size: "M",
        stock: 7,
        discount: 0,
        price: 100,
        sku: "PROD1_BLUE_M",
        images: ["blue-m-1.jpg", "blue-m-2.jpg"],
      },
      {
        id: "variant4",
        color: { name: "Blue", value: "#0000FF" },
        size: "L",
        stock: 0,
        discount: 0,
        price: 100,
        sku: "PROD1_BLUE_L",
        images: ["blue-l-1.jpg"],
      },
      {
        id: "variant5",
        color: { name: "Black", value: "#000000" },
        size: "S",
        stock: 8,
        discount: 0,
        price: 105,
        sku: "PROD1_BLACK_S",
        images: ["black-s-1.jpg"],
      },
      {
        id: "variant6",
        color: { name: "Green", value: "#00FF00" },
        size: "M",
        stock: 0,
        discount: 0,
        price: 110,
        sku: "PROD1_GREEN_M",
        images: ["green-m-1.jpg"],
      },
    ],
    videos: ["video1.mp4"],
    has360View: true,
    sustainability: {
      isEcoFriendly: true,
      certifications: ["Sustainable Packaging", "Cruelty-Free"],
      carbonFootprint: "2.1kg CO2",
    },
    reviews: [
      {
        id: "1",
        userId: "u1",
        userName: "Sarah M.",
        rating: 5,
        title: "Absolutely love this fragrance!",
        content:
          "This perfume is incredible. The scent lasts all day and I get compliments wherever I go. The packaging is also beautiful.",
        date: "2024-08-15",
        verified: true,
        helpful: 24,
        images: [
          "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
        ],
      },
      {
        id: "2",
        userId: "u2",
        userName: "Emma K.",
        rating: 4,
        title: "Great quality but pricey",
        content:
          "The fragrance is beautiful and long-lasting. Worth the investment but definitely on the expensive side.",
        date: "2024-08-10",
        verified: true,
        helpful: 18,
      },
    ],
  },
];
