import type { Category } from "../Components/ui/CategoryGrid/CategoryGrid.type";

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Autumn-Winter 2025-2026 Collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center",
    count: "New Arrivals",
  },
  {
    id: 2,
    name: "Dior Toujours Bag",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&crop=center",
    count: "Limited Edition",
  },
  {
    id: 3,
    name: "Dior Lucky",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop&crop=center",
    count: "Exclusive",
  },
  {
    id: 4,
    name: "Sunglasses",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=800&fit=crop&crop=center",
    count: "Summer Collection",
  },
  {
    id: 5,
    name: "Fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop&crop=center",
    count: "Best Sellers",
  },
  {
    id: 6,
    name: "Fine Jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop&crop=center",
    count: "Haute Couture",
  },
  {
    id: 7,
    name: "Men's Collection",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center",
    count: "Formal Wear",
  },
  {
    id: 8,
    name: "Beauty Essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop&crop=center",
    count: "Makeup & Skincare",
  },
];

// Products data
export const products = [
  {
    id: 1,
    name: "Premium Cotton Shirt",
    price: 1299,
    originalPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 120,
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    price: 2299,
    originalPrice: 3499,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 89,
    badge: "NEW",
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 1499,
    originalPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 156,
    badge: "SALE",
  },
  {
    id: 4,
    name: "Graphic Print Tee",
    price: 699,
    originalPrice: 999,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    reviews: 203,
    badge: "TRENDING",
  },
  {
    id: 5,
    name: "Formal Blazer",
    price: 3299,
    originalPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 78,
    badge: "PREMIUM",
  },
  {
    id: 6,
    name: "Casual Sneakers",
    price: 1799,
    originalPrice: 2799,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 142,
    badge: "COMFORT",
  },
];
export const banners = [
  {
    id: 1,
    image:
      "https://t3.ftcdn.net/jpg/03/20/68/66/240_F_320686681_Ur6vdYQgDC9WiijiVfxlRyQffxOgfeFz.jpg",
    title: "SUMMER SALE",
    subtitle: "Up to 50% OFF",
    description: "Refresh your wardrobe with our latest collection",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "NEW ARRIVALS",
    subtitle: "Fresh Styles",
    description: "Discover the latest trends in men's fashion",
    buttonText: "Explore",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "PREMIUM COLLECTION",
    subtitle: "Luxury Redefined",
    description: "Elevate your style with our premium range",
    buttonText: "Shop Premium",
  },
];

// List of countries with flags and dial codes
export const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
  { code: "+66", country: "TH", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", country: "VN", flag: "🇻🇳", name: "Vietnam" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  // Add more as needed
];
