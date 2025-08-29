import type { HomeCategory, HomeProduct, HomeVideo } from "../types/home.type";

export const dummyHomeProducts: HomeProduct[] = [
  {
    id: "1",
    name: "Fitted Jacket with Puff Sleeves",
    price: 85000,
    originalPrice: 95000,
    description:
      "Elegant fitted jacket with distinctive puff sleeves, crafted from premium Italian wool.",
    primary_image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    ],
    rating: 5,
    reviews: 120,
    badge: { isNew: true, isOnSale: false },
  },
  {
    id: "2",
    name: "Luxury Silk Bermuda Shorts",
    price: 45000,
    originalPrice: 60000,
    description:
      "Premium bermuda shorts in pure silk with modern tailoring and exceptional comfort.",
    primary_image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      "https://images.unsplash.com/photo-1506629905607-c34cdf85b6e5?w=800&q=80",
    ],
    rating: 4,
    reviews: 95,
    badge: { isOnSale: true },
  },
  {
    id: "3",
    name: "Couture Toujours Handbag",
    price: 275000,
    originalPrice: 275000,
    description:
      "Expressing creative passion of the finest ateliers, this bag epitomizes timeless luxury.",
    primary_image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    ],
    rating: 5,
    reviews: 240,
    badge: { isNew: false },
  },
  {
    id: "4",
    name: "Vintage Calfskin Shoulder Bag",
    price: 195000,
    originalPrice: 195000,
    description:
      "Sophisticated shoulder bag crafted from vintage smooth calfskin with golden hardware.",
    primary_image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    ],
    rating: 5,
    reviews: 180,
    badge: { isNew: true },
  },
  {
    id: "5",
    name: "Cashmere Turtleneck Sweater",
    price: 65000,
    originalPrice: 65000,
    description:
      "Ultra-luxurious cashmere turtleneck in timeless black, perfect for sophisticated layering.",
    primary_image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    ],
    rating: 5,
    reviews: 200,
  },
  {
    id: "6",
    name: "Leather Chelsea Boots",
    price: 120000,
    originalPrice: 140000,
    description:
      "Classic black leather Chelsea boots with elastic side panels.",
    primary_image:
      "https://images.unsplash.com/photo-1596464716121-48c2ef9d0c2d?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1596464716121-48c2ef9d0c2d?w=800&q=80",
      "https://images.unsplash.com/photo-1612817159949-4f3e6c9b9a3a?w=800&q=80",
    ],
    rating: 4,
    reviews: 150,
    badge: { isOnSale: true },
  },
  {
    id: "7",
    name: "Designer Sunglasses",
    price: 35000,
    originalPrice: 45000,
    description:
      "High-fashion unisex sunglasses with UV protection and modern styling.",
    primary_image:
      "https://images.unsplash.com/photo-1549921296-3a0da7a4d7a2?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1549921296-3a0da7a4d7a2?w=800&q=80",
    ],
    rating: 4,
    reviews: 80,
  },
  {
    id: "8",
    name: "Evening Gown",
    price: 185000,
    originalPrice: 200000,
    description:
      "Floor-length silk evening gown with hand embroidery and elegant drape.",
    primary_image:
      "https://images.unsplash.com/photo-1593032465170-5e1a0bbd10b1?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1593032465170-5e1a0bbd10b1?w=800&q=80",
      "https://images.unsplash.com/photo-1592810841357-99db59bd4cb4?w=800&q=80",
    ],
    rating: 5,
    reviews: 95,
    badge: { isNew: true },
  },
  {
    id: "9",
    name: "Classic Wristwatch",
    price: 220000,
    originalPrice: 250000,
    description:
      "Luxury wristwatch with Swiss movement and genuine leather strap.",
    primary_image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e41?w=800&q=80",
    ],
    rating: 5,
    reviews: 300,
  },
  {
    id: "10",
    name: "Men’s Formal Suit",
    price: 150000,
    originalPrice: 170000,
    description:
      "Tailored men’s formal suit in premium Italian fabric for an elegant look.",
    primary_image:
      "https://images.unsplash.com/photo-1520975918318-3eac2db9c7a4?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1520975918318-3eac2db9c7a4?w=800&q=80",
    ],
    rating: 4,
    reviews: 220,
  },
  {
    id: "11",
    name: "Diamond Necklace",
    price: 750000,
    originalPrice: 800000,
    description:
      "Exquisite diamond necklace crafted in 18K white gold, perfect for special occasions.",
    primary_image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    ],
    rating: 5,
    reviews: 50,
  },
  {
    id: "12",
    name: "Luxury Perfume",
    price: 25000,
    originalPrice: 30000,
    description:
      "Long-lasting fragrance with rich floral and musky notes, perfect for evenings.",
    primary_image:
      "https://images.unsplash.com/photo-1611930022073-1d4fbcdd8a7a?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1611930022073-1d4fbcdd8a7a?w=800&q=80",
    ],
    rating: 4,
    reviews: 180,
    badge: { isOnSale: true },
  },
  {
    id: "13",
    name: "Luxury Sneakers",
    price: 90000,
    originalPrice: 110000,
    description:
      "Premium leather sneakers blending streetwear comfort with designer aesthetics.",
    primary_image:
      "https://images.unsplash.com/photo-1600180758895-6d8f6b6b6d3c?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1600180758895-6d8f6b6b6d3c?w=800&q=80",
    ],
    rating: 5,
    reviews: 260,
  },
  {
    id: "14",
    name: "Wool Overcoat",
    price: 130000,
    originalPrice: 150000,
    description:
      "Warm and stylish overcoat made from 100% Italian wool with a sleek fit.",
    primary_image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716b?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1542060748-10c28b62716b?w=800&q=80",
    ],
    rating: 4,
    reviews: 100,
  },
  {
    id: "15",
    name: "Luxury Silk Scarf",
    price: 20000,
    originalPrice: 25000,
    description: "Elegant silk scarf with hand-painted prints.",
    primary_image:
      "https://images.unsplash.com/photo-1581092808360-1b6fc6f0e9f7?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1581092808360-1b6fc6f0e9f7?w=800&q=80",
    ],
    rating: 5,
    reviews: 60,
  },
  {
    id: "16",
    name: "Elegant Cocktail Dress",
    price: 95000,
    originalPrice: 115000,
    description:
      "Chic cocktail dress with a flattering silhouette and hand-sewn beadwork.",
    primary_image:
      "https://images.unsplash.com/photo-1605559424843-54c72d23b712?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1605559424843-54c72d23b712?w=800&q=80",
    ],
    rating: 5,
    reviews: 145,
  },
  {
    id: "17",
    name: "Luxury Backpack",
    price: 60000,
    originalPrice: 70000,
    description:
      "Designer backpack made with premium leather and functional modern design.",
    primary_image:
      "https://images.unsplash.com/photo-1600180758895-6d8f6b6b6d3c?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1600180758895-6d8f6b6b6d3c?w=800&q=80",
    ],
    rating: 4,
    reviews: 95,
  },
  {
    id: "18",
    name: "Crystal Earrings",
    price: 40000,
    originalPrice: 50000,
    description:
      "Sparkling crystal earrings with intricate craftsmanship, perfect for evening wear.",
    primary_image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80",
    ],
    rating: 5,
    reviews: 75,
  },
  {
    id: "19",
    name: "Designer Hat",
    price: 30000,
    originalPrice: 35000,
    description: "Classic wool hat with a luxury branded finish.",
    primary_image:
      "https://images.unsplash.com/photo-1542062703-6c59e3a1a7f8?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1542062703-6c59e3a1a7f8?w=800&q=80",
    ],
    rating: 4,
    reviews: 40,
  },
  {
    id: "20",
    name: "Luxury Leather Wallet",
    price: 45000,
    originalPrice: 50000,
    description:
      "Compact luxury wallet made from genuine calfskin leather with embossed details.",
    primary_image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    variant_images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    ],
    rating: 5,
    reviews: 180,
  },
];

export const defaultVideoData: HomeVideo[] = [
  {
    id: "fashion",
    title: "Fashion & Accessories",
    subtitle: "Shop now",
    link: "/fashion",
    videoUrl:
      "https://res.cloudinary.com/dlqd8n49u/video/upload/v1755860840/9760427-uhd_4096_2160_25fps_vm9djp.mp4",
    thumbnail:
      "https://diorama.dam-broadcast.com/cdn-cgi/image/width=1440,format=auto/pm_11872_1097_1097688-66nku5afvr-whr.jpg",
  },
  {
    id: "fragrance",
    title: "Fragrance & Beauty",
    subtitle: "Shop now",
    link: "/fragrance",
    videoUrl:
      "https://res.cloudinary.com/dlqd8n49u/video/upload/v1755860835/5805065-uhd_3840_2160_25fps_trgq4k.mp4",
    thumbnail:
      "https://diorama.dam-broadcast.com/cdn-cgi/image/width=3000,format=auto/pm_11872_1142_1142166-08w02b9ro4-whr.jpg",
  },
];

export const dummyCategories: HomeCategory[] = [
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

// // List of countries with flags and dial codes
// export const countryCodes = [
//   { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
//   { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
//   { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
//   { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
//   { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
//   { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
//   { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
//   { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
//   { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
//   { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
//   { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
//   { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
//   { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
//   { code: "+66", country: "TH", flag: "🇹🇭", name: "Thailand" },
//   { code: "+84", country: "VN", flag: "🇻🇳", name: "Vietnam" },
//   { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
//   { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
//   // Add more as needed
// ];
