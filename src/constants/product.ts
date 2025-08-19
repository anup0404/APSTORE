import type { ProductCardProps } from "../Components/ui/Product/ProductCard.type";

export const productdetails = [
  {
    id: 1,
    title: "Drop Shoulder Tee",
    brand: "MNML",
    price: 99.99,
    originalPrice: 149.99,
    discount: 33,
    rating: 4.3,
    reviewsCount: 2847,
    isNew: true,
    isOnSale: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=800&q=80",
    ],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Purple", value: "#8B5CF6" },
      { name: "Black", value: "#000000" },
      { name: "Green", value: "#10B981" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Premium drop shoulder tee with relaxed fit. Made from 100% organic cotton.",
    features: ["100% Organic Cotton", "Pre-shrunk fabric", "Machine washable"],
    offers: [
      "Get 20% off with coupon FIRST20 on orders above ₹500",
      "Buy 2 or more and get free shipping",
      "Special Festival Sale: Extra ₹100 off on cart value ₹2000+",
    ],
    deliveryInfo: {
      free: "Free standard delivery within 5-7 days",
      express: "Express delivery (2-3 days) available at ₹99",
    },
    returnPolicy:
      "Return or exchange within 30 days of delivery. Quality and satisfaction guaranteed.",
    reviews: [
      {
        id: 1,
        name: "Rahul M.",
        rating: 5,
        comment: "Great quality! Very comfortable and fits perfectly.",
        date: "2024-01-15",
        deliveryDate: "January 18, 2024 • 4:30 PM",
        verified: true,
        images: [
          "https://images.unsplash.com/photo-1556821840-3a9b520c7d31?auto=format&fit=crop&w=400&q=80",
        ],
      },
      {
        id: 2,
        name: "Priya S.",
        rating: 4,
        comment: "Size runs a bit large. Fabric feels premium.",
        date: "2024-02-10",
        deliveryDate: "February 14, 2024 • 2:15 PM",
        verified: true,
      },
    ],
  },
  {
    id: 2,
    title: "Beoplay M5 Bluetooth Speaker",
    brand: "Bang & Olufsen",
    price: 99.0,
    originalPrice: 149.0,
    discount: 34,
    rating: 4,
    reviewsCount: 860,
    isNew: true,
    isOnSale: true,
    image:
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png",
    images: [
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png",
    ],
    colors: [{ name: "Black", value: "#000" }],
    sizes: [],
    description: "Powerful Bluetooth speaker with immersive sound.",
    features: ["360-degree sound", "Bluetooth 5.0", "Premium aluminum design"],
    offers: ["Flat 10% OFF on prepaid orders"],
    deliveryInfo: {
      free: "Free shipping in 5-7 days",
      express: "Express shipping in 2-3 days ₹99",
    },
    returnPolicy: "Returns within 15 days of purchase.",
    reviews: [],
  },
  {
    id: 3,
    title: "Apple Smart Watch 6 - Special Edition",
    brand: "Apple",
    price: 299.0,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviewsCount: 1540,
    isNew: true,
    isOnSale: false,
    image:
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png",
    images: [
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png",
    ],
    colors: [{ name: "Silver", value: "#C0C0C0" }],
    sizes: ["40mm", "44mm"],
    description:
      "Smartwatch with health tracking, fitness, and always-on display.",
    features: [
      "SpO2 sensor & ECG app",
      "Always-On Retina display",
      "Swimproof design",
    ],
    offers: ["5% cashback on Apple Pay"],
    deliveryInfo: {
      free: "Free delivery within 3-5 days",
      express: "Same day delivery ₹199",
    },
    returnPolicy: "10-day replacement policy only.",
    reviews: [],
  },
  {
    id: 4,
    title: "Beylob 90 Speaker",
    brand: "Beylob",
    price: 49.0,
    originalPrice: 99.0,
    discount: 50,
    rating: 0,
    reviewsCount: 0,
    isNew: false,
    isOnSale: true,
    image:
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png",
    images: [
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png",
    ],
    description: "Compact speaker ideal for small rooms and travel.",
    features: ["Clear sound", "Compact and portable", "Rechargeable battery"],
    offers: ["Buy 1 Get 1 at 50% off"],
    deliveryInfo: {
      free: "Delivery in 7 days",
      express: "Fast delivery in 2-4 days ₹79",
    },
    returnPolicy: "30-day returns.",
    reviews: [],
  },
  {
    id: 5,
    title: "Martino 75 Bluetooth",
    brand: "Martino",
    price: 79.0,
    originalPrice: null,
    discount: null,
    rating: 4,
    reviewsCount: 523,
    isNew: false,
    isOnSale: false,
    image:
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png",
    images: [
      "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png",
    ],
    description: "Bluetooth music system with sleek design.",
    features: ["Bluetooth connectivity", "12hr battery", "Premium sound"],
    offers: ["Flat ₹100 off on first purchase"],
    deliveryInfo: {
      free: "Free delivery in 5-6 days",
      express: "Same day shipping ₹129",
    },
    returnPolicy: "Return in 15 days with original packaging.",
    reviews: [],
  },
  {
    id: 6,
    title: "Noise ColorFit Pro 4 Alpha Smartwatch",
    brand: "Noise",
    price: 59.0,
    originalPrice: null,
    discount: null,
    rating: 4,
    reviewsCount: 1120,
    isNew: true,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1603791452906-c28d02f0b9dd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603791452906-c28d02f0b9dd?auto=format&fit=crop&w=800&q=80",
    ],
    description:
      "Smartwatch with HD display, fitness tracking, and AI voice assistant.",
    features: ["1.78” AMOLED screen", "100+ sports modes", "Fast charging"],
    offers: ["Flat 20% OFF Festival Sale"],
    deliveryInfo: {
      free: "Delivery in 6-8 days",
      express: "Delivery in 2-3 days ₹99",
    },
    returnPolicy: "7-day returns acceptable.",
    reviews: [],
  },
  {
    id: 7,
    title: "Sony WH-1000XM4 Wireless Headphones",
    brand: "Sony",
    price: 349.0,
    originalPrice: 399.0,
    discount: 12,
    rating: 5,
    reviewsCount: 2315,
    isNew: false,
    isOnSale: true,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa0abc3a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa0abc3a?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Industry-leading noise cancellation headphones.",
    features: ["30-hour battery", "Touch controls", "Alexa & Google Assistant"],
    offers: ["Flat ₹1000 OFF"],
    deliveryInfo: {
      free: "Delivery in 3-5 days",
      express: "24hr delivery ₹199",
    },
    returnPolicy: "Return within 10 days of purchase.",
    reviews: [],
  },
  {
    id: 8,
    title: "Canon EOS M50 Mirrorless Camera",
    brand: "Canon",
    price: 599.0,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviewsCount: 1875,
    isNew: true,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1519183071298-a2962be96c46?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519183071298-a2962be96c46?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Mirrorless camera for high-quality photography.",
    features: ["24.1MP APS-C sensor", "4K recording", "Dual Pixel AF"],
    offers: ["Free Camera Bag + SD Card"],
    deliveryInfo: {
      free: "Delivery in 4-6 working days",
      express: "Delivery in 2 days ₹249",
    },
    returnPolicy: "Replacement within 7 days",
    reviews: [],
  },
  {
    id: 9,
    title: "Nike Air Zoom Pegasus 39",
    brand: "Nike",
    price: 120.0,
    originalPrice: 150.0,
    discount: 20,
    rating: 4,
    reviewsCount: 980,
    isNew: false,
    isOnSale: true,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4eb49b0?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4eb49b0?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Comfortable running shoe for everyday training.",
    features: ["Lightweight mesh", "Responsive cushioning", "Durable outsole"],
    offers: ["Festival Offer: ₹500 OFF"],
    deliveryInfo: { free: "Delivery in 3-7 days", express: "2 day ₹99" },
    returnPolicy: "30 days return",
    reviews: [],
  },
  {
    id: 10,
    title: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 180.0,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviewsCount: 1330,
    isNew: false,
    isOnSale: false,
    image:
      "https://images.unsplash.com/photo-1586363104863-5b6c3c16ab54?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586363104863-5b6c3c16ab54?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Premium performance shoe with cushioning for long runs.",
    features: [
      "Boost midsole",
      "Primeknit upper",
      "Made with recycled ocean plastic",
    ],
    offers: ["₹1000 OFF on cart total above 5K"],
    deliveryInfo: { free: "Delivery in 4-6 days", express: "1-2 days ₹149" },
    returnPolicy: "Return in 15 days",
    reviews: [],
  },
];





export const dummyProductCards: ProductCardProps[] = [
  {
    product: {
      id: "1",
      title: "Drop Shoulder Tee",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      price: "99.99",
      oldPrice: "149.99",
      rating: 4.3,
      isNew: true,
      isOnSale: true,
    },
  },
  {
    product: {
      id: "2",
      title: "Beoplay M5 Bluetooth Speaker",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-1.png",
      price: "99.0",
      oldPrice: "149.0",
      rating: 4,
      isNew: true,
      isOnSale: true,
    },
  },
  {
    product: {
      id: "3",
      title: "Apple Smart Watch 6 - Special Edition",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-2.png",
      price: "299.0",
      oldPrice: "",
      rating: 5,
      isNew: true,
      isOnSale: false,
    },
  },
  {
    product: {
      id: "4",
      title: "Beylob 90 Speaker",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-3.png",
      price: "49.0",
      oldPrice: "99.0",
      rating: 0,
      isNew: false,
      isOnSale: true,
    },
  },
  {
    product: {
      id: "5",
      title: "Martino 75 Bluetooth",
      image:
        "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png",
      price: "79.0",
      oldPrice: "",
      rating: 4,
      isNew: false,
      isOnSale: false,
    },
  },
  {
    product: {
      id: "6",
      title: "Noise ColorFit Pro 4 Alpha Smartwatch",
      image:
        "https://images.unsplash.com/photo-1603791452906-c28d02f0b9dd?auto=format&fit=crop&w=800&q=80",
      price: "59.0",
      oldPrice: "",
      rating: 4,
      isNew: true,
      isOnSale: false,
    },
  },
  {
    product: {
      id: "7",
      title: "Sony WH-1000XM4 Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa0abc3a?auto=format&fit=crop&w=800&q=80",
      price: "349.0",
      oldPrice: "399.0",
      rating: 5,
      isNew: false,
      isOnSale: true,
    },
  },
  {
    product: {
      id: "8",
      title: "Canon EOS M50 Mirrorless Camera",
      image:
        "https://images.unsplash.com/photo-1519183071298-a2962be96c46?auto=format&fit=crop&w=800&q=80",
      price: "599.0",
      oldPrice: "",
      rating: 5,
      isNew: true,
      isOnSale: false,
    },
  },
  {
    product: {
      id: "9",
      title: "Nike Air Zoom Pegasus 39",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4eb49b0?auto=format&fit=crop&w=800&q=80",
      price: "120.0",
      oldPrice: "150.0",
      rating: 4,
      isNew: false,
      isOnSale: true,
    },
  },
  {
    product: {
      id: "10",
      title: "Adidas Ultraboost 22",
      image:
        "https://images.unsplash.com/photo-1586363104863-5b6c3c16ab54?auto=format&fit=crop&w=800&q=80",
      price: "180.0",
      oldPrice: "",
      rating: 5,
      isNew: false,
      isOnSale: false,
    },
  },
];
