import type { ProductCardProps } from "../Components/ui/Product/ProductCard";

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

export const dummyProductCards: ProductCardProps[] = [
  {
    product: {
      id: "1",
      title: "Fitted Jacket with Puff Sleeves",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      ],
      price: "₹85,000.00",
      oldPrice: "₹95,000.00",
      rating: 5,
      isNew: true,
      isOnSale: false,
      description:
        "Elegant fitted jacket with distinctive puff sleeves, crafted from premium Italian wool.",
      category: "Outerwear",
      brand: "Maison Élégante",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "2",
      title: "Luxury Silk Bermuda Shorts",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
        "https://images.unsplash.com/photo-1506629905607-c34cdf85b6e5?w=800&q=80",
      ],
      price: "₹45,000.00",
      oldPrice: "₹60,000.00",
      rating: 4,
      isNew: false,
      isOnSale: true,
      description:
        "Premium bermuda shorts in pure silk with modern tailoring and exceptional comfort.",
      category: "Bottoms",
      brand: "Atelier Moderne",
      availability: "low-stock" as const,
    },
  },
  {
    product: {
      id: "3",
      title: "Couture Toujours Handbag",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      ],
      price: "₹2,75,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Expressing creative passion of the finest ateliers, this bag epitomizes timeless luxury.",
      category: "Bags",
      brand: "Haute Couture",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "4",
      title: "Vintage Calfskin Shoulder Bag",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      ],
      price: "₹1,95,000.00",
      rating: 5,
      isNew: true,
      isOnSale: false,
      description:
        "Sophisticated shoulder bag crafted from vintage smooth calfskin with golden hardware.",
      category: "Bags",
      brand: "Maison Élégante",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "5",
      title: "Cashmere Turtleneck Sweater",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      ],
      price: "₹65,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Ultra-luxurious cashmere turtleneck in timeless black, perfect for sophisticated layering.",
      category: "Knitwear",
      brand: "Atelier Moderne",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "6",
      title: "Pleated Midi Skirt",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
        "https://images.unsplash.com/photo-1506629905607-c34cdf85b6e5?w=800&q=80",
      ],
      price: "₹55,000.00",
      oldPrice: "₹75,000.00",
      rating: 4,
      isNew: false,
      isOnSale: true,
      description:
        "Elegant pleated midi skirt in premium fabric with impeccable draping and movement.",
      category: "Skirts",
      brand: "Haute Couture",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "7",
      title: "Luxury Leather Ankle Boots",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      ],
      price: "₹85,000.00",
      rating: 5,
      isNew: true,
      isOnSale: false,
      description:
        "Handcrafted ankle boots in finest Italian leather with sophisticated block heel design.",
      category: "Footwear",
      brand: "Maison Élégante",
      availability: "low-stock" as const,
    },
  },
  {
    product: {
      id: "8",
      title: "Silk Scarf with Heritage Print",
      image:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      ],
      price: "₹25,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Exquisite silk scarf featuring heritage motifs, hand-rolled edges, and vibrant colors.",
      category: "Accessories",
      brand: "Atelier Moderne",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "9",
      title: "Tailored Wool Blazer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      ],
      price: "₹1,25,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Impeccably tailored blazer in premium wool with peak lapels and sophisticated silhouette.",
      category: "Outerwear",
      brand: "Haute Couture",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "10",
      title: "Diamond Pattern Clutch",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      ],
      price: "₹75,000.00",
      oldPrice: "₹95,000.00",
      rating: 4,
      isNew: false,
      isOnSale: true,
      description:
        "Elegant clutch with diamond quilting pattern in premium leather with gold chain.",
      category: "Bags",
      brand: "Maison Élégante",
      availability: "low-stock" as const,
    },
  },
  {
    product: {
      id: "11",
      title: "High-Waisted Trousers",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
        "https://images.unsplash.com/photo-1506629905607-c34cdf85b6e5?w=800&q=80",
      ],
      price: "₹68,000.00",
      rating: 4,
      isNew: true,
      isOnSale: false,
      description:
        "Sophisticated high-waisted trousers with wide leg silhouette in luxurious fabric.",
      category: "Bottoms",
      brand: "Atelier Moderne",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "12",
      title: "Pearl Statement Necklace",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      ],
      price: "₹1,15,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Exquisite multi-strand pearl necklace with vintage-inspired gold clasps and details.",
      category: "Jewelry",
      brand: "Haute Couture",
      availability: "low-stock" as const,
    },
  },
  {
    product: {
      id: "13",
      title: "Silk Evening Dress",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
      ],
      price: "₹2,85,000.00",
      rating: 5,
      isNew: true,
      isOnSale: false,
      description:
        "Breathtaking silk evening dress with intricate draping and timeless elegance.",
      category: "Dresses",
      brand: "Maison Élégante",
      availability: "in-stock" as const,
    },
  },
  {
    product: {
      id: "14",
      title: "Crocodile Leather Belt",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      ],
      price: "₹45,000.00",
      oldPrice: "₹55,000.00",
      rating: 5,
      isNew: false,
      isOnSale: true,
      description:
        "Luxury crocodile leather belt with gold-plated buckle and exceptional craftsmanship.",
      category: "Accessories",
      brand: "Atelier Moderne",
      availability: "low-stock" as const,
    },
  },
  {
    product: {
      id: "15",
      title: "Cashmere Long Coat",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      ],
      price: "₹3,25,000.00",
      rating: 5,
      isNew: false,
      isOnSale: false,
      description:
        "Ultra-luxurious double-breasted cashmere coat with impeccable tailoring and timeless design.",
      category: "Outerwear",
      brand: "Haute Couture",
      availability: "in-stock" as const,
    },
  },
];
