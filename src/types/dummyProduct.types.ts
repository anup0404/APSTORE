// Types
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  color: string[];
  size: string[];
  material: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "NEW" | "SALE" | "LIMITED" | "BESTSELLER";
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimitedEdition?: boolean;
}

// Sample product data
export const sampleProducts = [
  {
    id: "1",
    name: "Miss Dior Eau de Parfum",
    category: "Fragrance",
    subcategory: "Women",
    price: 150,
    originalPrice: 180,
    color: ["Pink", "Clear"],
    size: ["30ml", "50ml", "100ml"],
    material: "Glass",
    rating: 4.8,
    reviewCount: 245,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    badge: "SALE",
    inStock: true,
    isNew: false,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Lady Dior Medium Bag",
    category: "Bags",
    subcategory: "Handbags",
    price: 4800,
    color: ["Black", "Navy", "Beige"],
    size: ["Medium"],
    material: "Leather",
    rating: 4.9,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    badge: "NEW",
    inStock: true,
    isNew: true,
    isBestseller: false,
  },
  {
    id: "3",
    name: "Dior Addict Lipstick",
    category: "Makeup",
    subcategory: "Lips",
    price: 45,
    color: ["Red", "Pink", "Coral", "Berry"],
    size: ["3.5g"],
    material: "Metal",
    rating: 4.6,
    reviewCount: 567,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    inStock: true,
    isBestseller: true,
  },
  {
    id: "4",
    name: "Diorshow Mascara",
    category: "Makeup",
    subcategory: "Eyes",
    price: 32,
    color: ["Black", "Brown"],
    size: ["10ml"],
    material: "Plastic",
    rating: 4.4,
    reviewCount: 234,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    inStock: false,
  },
  {
    id: "5",
    name: "Dior Homme Cologne",
    category: "Fragrance",
    subcategory: "Men",
    price: 120,
    color: ["Clear"],
    size: ["75ml", "125ml"],
    material: "Glass",
    rating: 4.7,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
    badge: "LIMITED",
    inStock: true,
    isLimitedEdition: true,
  },
  {
    id: "6",
    name: "Dior Forever Foundation",
    category: "Makeup",
    subcategory: "Face",
    price: 52,
    color: ["Ivory", "Beige", "Tan", "Deep"],
    size: ["30ml"],
    material: "Glass",
    rating: 4.5,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    inStock: true,
  },
  {
    id: "7",
    name: "Capture Totale Serum",
    category: "Skincare",
    subcategory: "Serums",
    price: 185,
    color: ["Clear"],
    size: ["30ml", "50ml"],
    material: "Glass",
    rating: 4.6,
    reviewCount: 432,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    inStock: true,
    isNew: true,
  },
  {
    id: "8",
    name: "Sauvage Eau de Toilette",
    category: "Fragrance",
    subcategory: "Men",
    price: 132,
    color: ["Clear"],
    size: ["60ml", "100ml", "200ml"],
    material: "Glass",
    rating: 4.8,
    reviewCount: 1250,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop",
    inStock: true,
    isBestseller: true,
  },
];

export const categories = [
  "Fragrance",
  "Bags",
  "Makeup",
  "Skincare",
  "Ready-to-wear",
  "Jewelry",
];
export const subcategories = [
  "Women",
  "Men",
  "Handbags",
  "Lips",
  "Eyes",
  "Face",
  "Serums",
  "Moisturizers",
];
export const colors = [
  "Black",
  "White",
  "Red",
  "Pink",
  "Blue",
  "Navy",
  "Beige",
  "Brown",
  "Gold",
  "Silver",
  "Clear",
  "Ivory",
  "Tan",
  "Deep",
  "Coral",
  "Berry",
];
export const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "30ml",
  "50ml",
  "75ml",
  "100ml",
  "125ml",
  "200ml",
  "3.5g",
  "10ml",
  "60ml",
  "Medium",
  "Large",
];
export const materials = [
  "Leather",
  "Fabric",
  "Metal",
  "Glass",
  "Plastic",
  "Silk",
  "Cotton",
];
export const availabilityOptions = [
  "In Stock",
  "On Sale",
  "New Arrivals",
  "Limited Edition",
  "Bestsellers",
];

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "bestseller", label: "Bestsellers" },
];
