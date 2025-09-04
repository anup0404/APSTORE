import React, { useEffect } from "react";
import HeroSection from "../Components/ui/HeroSection";
import CategoryGrid from "../Components/ui/CategoryGrid";

import {
  HOME_PRODUCT_CARD_FEATURED_HEADING,
  HOME_PRODUCT_CARD_FEATURED_SUBHEADING,
  SCROLL_THRESHOLD,
  THROTTLE_DELAY,
} from "../constants/global.constant";

import type { HomeProduct } from "../types/home.type";
import {
  // getHomeCategory,
  getHomeProducts,
} from "../services/api/services/Home.service";
import { useInfiniteScroll } from "../hooks";

// ✅ Icons from Lucide
import { Loader2, AlertCircle } from "lucide-react";
import Button from "../Components/ui/Button";
import {
  useGetHomeCategoryQuery,
  useGetHomeVideosQuery,
} from "../store/api/homeApi";
import ProductGrid from "../Components/ui/ProductGrid";

const Home = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { data: videosData } = useGetHomeVideosQuery();
  const { data: categoriesData } = useGetHomeCategoryQuery();

  const {
    data: featuredItemsProducts,
    loading,
    error,
    hasMore,
    retry,
    reset,
  } = useInfiniteScroll<HomeProduct>(
    async (page, size) => await getHomeProducts(page, size),
    {
      threshold: SCROLL_THRESHOLD,
      throttleMs: THROTTLE_DELAY,
      initialLoad: true,
      enabled: true,
    }
  );

  // ✅ Cleanup products when component unmounts
  useEffect(() => {
    return () => reset();
  }, [reset]);

  // ✅ Event handlers
  const handleWishlistToggle = (id: number | string) => {
    console.log("Added to wishlist:", id);
  };

  const handleShare = (id: number | string) => {
    console.log("Sharing product:", id);
  };

  return (
    <div ref={ref} className="pb-16">
      {/* ✅ Hero Section */}
      <HeroSection videos={videosData ?? []} />

      {/* ✅ Categories */}
      {categoriesData && categoriesData.length > 0 && (
        <CategoryGrid categories={categoriesData} />
      )}

      {/* ✅ Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center mt-6 text-center">
          <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
          <p className="text-red-500 mb-3">Failed to load products</p>
          <Button onClick={retry} variant="primary">
            Retry
          </Button>
        </div>
      )}

      {/* ✅ Initial Loading */}
      {loading && featuredItemsProducts.length === 0 && (
        <div className="flex justify-center items-center mt-6">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          <p className="ml-2 text-gray-500">Loading products...</p>
        </div>
      )}

      {/* ✅ Product List */}

      {featuredItemsProducts.length > 0 && (
        <section ref={ref} className="py-12 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-light text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-wide">
                {HOME_PRODUCT_CARD_FEATURED_HEADING}
              </h2>
              {HOME_PRODUCT_CARD_FEATURED_SUBHEADING && (
                <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-gray-600 font-light">
                  {HOME_PRODUCT_CARD_FEATURED_SUBHEADING}
                </p>
              )}
            </div>
            <ProductGrid
              products={featuredItemsProducts}
              onWishlistToggle={handleWishlistToggle}
              onShare={handleShare}
            />
          </div>
        </section>
      )}

      {/* ✅ Infinite Scroll Loader */}
      {loading && featuredItemsProducts.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-400">Loading more...</span>
        </div>
      )}

      {/* ✅ No more data */}
      {!hasMore && featuredItemsProducts.length > 0 && (
        <p className="text-gray-400 text-center mt-6">No more products</p>
      )}
    </div>
  );
});

Home.displayName = "Home";

export default Home;
