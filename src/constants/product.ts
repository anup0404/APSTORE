// Mock data for demonstration
export const mockProductDetails = {
  id: "1",
  title: "Luxury Designer Handbag Collection",
  description:
    "Crafted in premium Italian leather with gold-tone hardware. This sophisticated design features the signature monogram pattern and spacious interior compartments.",
  brand: "MAISON ÉLÉGANTE",
  price: 89500,
  originalPrice: 125000,
  averageRating: 4.8,
  reviewsCount: 247,
  images: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop",
      isPrimary: true,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      isPrimary: false,
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop",
      isPrimary: false,
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
      isPrimary: false,
    },
  ],
  variants: [
    {
      id: "1",
      productId: "1",
      color: { name: "Cognac Brown", value: "#8B4513" },
      size: "Small",
      price: 89500,
      stock: 5,
    },
    {
      id: "2",
      productId: "1",
      color: { name: "Midnight Black", value: "#000000" },
      size: "Small",
      price: 89500,
      stock: 3,
    },
    {
      id: "3",
      productId: "1",
      color: { name: "Pearl White", value: "#F8F8FF" },
      size: "Medium",
      price: 94500,
      stock: 2,
    },
  ],
  offers: {
    discount: "15",
    cashback: "₹5,000 Cashback",
    exchange: "Available",
  },
  deliveryInfo: {
    free: true,
    express: "Same day delivery in Delhi",
  },
  returnPolicy: "30-day return policy",
  features: {
    "Premium Materials": "Italian Calfskin Leather",
    Hardware: "Gold-tone metal hardware",
    Lining: "Luxury fabric lining",
    Closure: "Magnetic snap closure",
  },
  specifications: {
    Dimensions: "25 x 20 x 12 cm",
    Weight: "680g",
    Material: "100% Italian Leather",
    Origin: "Made in Italy",
    Collection: "Spring 2024",
  },
  reviews: [
    {
      id: "1",
      productId: "1",
      reviewerName: "Priya S.",
      rating: 5,
      comment:
        "Absolutely stunning quality! The leather is incredibly soft and the craftsmanship is impeccable. This bag exceeded all my expectations.",
      reviewDate: new Date("2024-01-15"),
      verified: true,
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      ],
    },
    {
      id: "2",
      productId: "1",
      reviewerName: "Anjali K.",
      rating: 4,
      comment:
        "Beautiful bag, exactly as shown in the pictures. Fast delivery and excellent packaging. The quality feels premium and worth the investment.",
      reviewDate: new Date("2024-01-10"),
      verified: true,
      helpful: 18,
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      ],
    },
    {
      id: "3",
      productId: "1",
      reviewerName: "Ravi M.",
      rating: 5,
      comment:
        "Purchased this as a gift for my wife and she absolutely loves it. The attention to detail is remarkable and the customer service was exceptional.",
      reviewDate: new Date("2024-01-08"),
      verified: true,
      helpful: 12,
      images: [],
    },
    {
      id: "4",
      productId: "1",
      reviewerName: "Sneha D.",
      rating: 4,
      comment:
        "Great quality handbag with beautiful finishing. The size is perfect for daily use. Only minor issue is that it's slightly heavier than expected.",
      reviewDate: new Date("2024-01-05"),
      verified: false,
      helpful: 9,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      ],
    },
  ],
  isActive: true,
  isNew: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
