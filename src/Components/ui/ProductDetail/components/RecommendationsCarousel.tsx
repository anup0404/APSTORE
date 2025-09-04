import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import ProductGrid from "../../ProductGrid";

interface RecommendedProduct {
  id: string;
  title: string;
  brand: string;
  price?: number;
  originalPrice?: number;
  averagerating?: number;
  reviewCounts?: number;
  images: string[];
  badge?: string;
}

interface RecommendationsCarouselProps {
  title: string;
  productId: string;
  relatedProducts?: string[];
  maxProducts?: number;
}

// Mock data - in real app, this would come from your data source
const mockRecommendations = [
  {
    id: "p1",
    name: "Wireless Bluetooth Headphones",
    price: 2999,
    description: "High-quality wireless headphones with noise cancellation.",
    originalPrice: 4999,
    primary_image: "/images/products/headphones.jpg",
    rating: 4.5,
    reviews: 128,
    badge: {
      isOnSale: true,
    },
    variant_images: [
      "/images/products/headphones-black.jpg",
      "/images/products/headphones-blue.jpg",
    ],
  },
  {
    id: "p2",
    name: "Smartwatch Pro X",
    price: 8999,
    description: "Feature-rich smartwatch with health tracking and GPS.",
    originalPrice: 10999,
    primary_image: "/images/products/smartwatch.jpg",
    rating: 4.2,
    reviews: 342,
    badge: {
      isNew: true,
    },
    variant_images: [
      "/images/products/smartwatch-black.jpg",
      "/images/products/smartwatch-silver.jpg",
    ],
  },
  {
    id: "p3",
    name: "Ergonomic Office Chair",
    price: 12499,
    description:
      "Comfortable office chair with adjustable height and lumbar support.",
    originalPrice: 14999,
    primary_image: "/images/products/office-chair.jpg",
    rating: 4.7,
    reviews: 89,
    badge: {
      isBestSeller: true,
    },
    variant_images: [
      "/images/products/office-chair-grey.jpg",
      "/images/products/office-chair-black.jpg",
    ],
  },
  {
    id: "p4",
    name: "Gaming Laptop Ultra 15",
    price: 74999,
    description:
      "High-performance gaming laptop with RTX graphics and 16GB RAM.",
    originalPrice: 89999,
    primary_image: "/images/products/gaming-laptop.jpg",
    rating: 4.8,
    reviews: 56,
    badge: {
      isPreOrder: true,
    },
    variant_images: [
      "/images/products/gaming-laptop-front.jpg",
      "/images/products/gaming-laptop-side.jpg",
    ],
  },
];

const RecommendationsCarousel: React.FC<RecommendationsCarouselProps> = ({
  title,
  productId,
  maxProducts = 6,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Filter out current product and apply maxProducts limit
  const displayProducts = mockRecommendations
    .filter((product) => product.id !== productId)
    .slice(0, maxProducts);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!displayProducts || displayProducts.length === 0) return null;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-light text-gray-900">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-white/90 border border-gray-300 rounded-full shadow hover:scale-110 transition-transform"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-white/90 border border-gray-300 rounded-full shadow hover:scale-110 transition-transform"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <ProductGrid
            products={displayProducts}
            // onWishlistToggle={handleWishlistToggle}
            // onShare={handleShare}
          />
        </div>

        {/* Show all products link */}
        <div className="text-center mt-6">
          <button className="text-sm text-gray-600 hover:text-black transition-colors underline">
            View All {title.toLowerCase()}
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

RecommendationsCarousel.displayName = "RecommendationsCarousel";
export default RecommendationsCarousel;
