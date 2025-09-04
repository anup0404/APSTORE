import { useState, useCallback, forwardRef, useEffect } from "react";

import type { ExpandedFilters, Filters } from "../types/filter.types";
import FilterSidebar from "../Components/ui/Filter/FilterSidebar";
import ActiveFilters from "../Components/ui/Filter/ActiveFilters";
import ProductGrid from "../Components/ui/ProductGrid";
import { Filter } from "lucide-react";
import { SCROLL_THRESHOLD, THROTTLE_DELAY } from "../constants/global.constant";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { getHomeProducts } from "../services/api/services/Home.service";
import type { HomeProduct } from "../types/home.type";

const ProductPage = forwardRef<HTMLDivElement>((_, ref) => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: [],
    subcategory: [],
    priceRange: [0, 5000],
    color: [],
    size: [],
    material: [],
    availability: [],
    rating: 0,
    sortBy: "featured",
  });

  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({
    category: true,
    subcategory: false,
    price: false,
    color: false,
    size: false,
    material: false,
    availability: false,
    rating: false,
  });

  //   const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  //   // Filtering logic
  //   const filteredAndSortedProducts = useMemo(() => {
  //     return sampleProducts.filter((product) => {
  //       // Search filter
  //       if (
  //         filters.search &&
  //         !product.name.toLowerCase().includes(filters.search.toLowerCase())
  //       ) {
  //         return false;
  //       }

  //       // Category filter
  //       if (
  //         filters.category.length > 0 &&
  //         !filters.category.includes(product.category)
  //       ) {
  //         return false;
  //       }

  //       // Subcategory filter
  //       if (
  //         filters.subcategory.length > 0 &&
  //         !filters.subcategory.includes(product.subcategory)
  //       ) {
  //         return false;
  //       }

  //       // Price filter
  //       if (
  //         product.price < filters.priceRange[0] ||
  //         product.price > filters.priceRange[1]
  //       ) {
  //         return false;
  //       }

  //       // Color filter
  //       if (
  //         filters.color.length > 0 &&
  //         !filters.color.some((color) => product.color.includes(color))
  //       ) {
  //         return false;
  //       }

  //       // Size filter
  //       if (
  //         filters.size.length > 0 &&
  //         !filters.size.some((size) => product.size.includes(size))
  //       ) {
  //         return false;
  //       }

  //       // Material filter
  //       if (
  //         filters.material.length > 0 &&
  //         !filters.material.some((material) =>
  //           product.material.includes(material)
  //         )
  //       ) {
  //         return false;
  //       }

  //       // Availability filter
  //       if (
  //         filters.availability.length > 0 &&
  //         !filters.availability.includes(product.availability)
  //       ) {
  //         return false;
  //       }

  //       // Rating filter
  //       if (filters.rating > 0 && product.rating < filters.rating) {
  //         return false;
  //       }

  //       return true;
  //     });
  //   }, [filters]);

  const updateFilter = useCallback((key: keyof Filters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleArrayFilter = useCallback(
    (
      key:
        | "category"
        | "subcategory"
        | "color"
        | "size"
        | "material"
        | "availability",
      value: string
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: [],
      subcategory: [],
      priceRange: [0, 5000],
      color: [],
      size: [],
      material: [],
      availability: [],
      rating: 0,
      sortBy: "featured",
    });
  }, []);

  //   const toggleWishlist = useCallback((id: string) => {
  //     setWishlist((prev) => {
  //       const newSet = new Set(prev);
  //       if (newSet.has(id)) {
  //         newSet.delete(id);
  //       } else {
  //         newSet.add(id);
  //       }
  //       return newSet;
  //     });
  //   }, []);

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
    <div ref={ref} className="min-h-screen bg-white py-5 md:py-15">
      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <FilterSidebar
              filters={filters}
              expandedFilters={expandedFilters}
              updateFilter={updateFilter}
              toggleArrayFilter={toggleArrayFilter}
              clearFilters={clearFilters}
              setExpandedFilters={setExpandedFilters}
              onClose={() => setShowMobileFilters(false)}
              isMobile={true}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:border-black transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <FilterSidebar
                filters={filters}
                expandedFilters={expandedFilters}
                updateFilter={updateFilter}
                toggleArrayFilter={toggleArrayFilter}
                clearFilters={clearFilters}
                setExpandedFilters={setExpandedFilters}
              />
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <ActiveFilters
              filters={filters}
              toggleArrayFilter={toggleArrayFilter}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
            />

            {/* <ProductGrid
              products={filteredAndSortedProducts}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              handleAddToBag={handleAddToBag}
              clearFilters={clearFilters}
            /> */}

            {featuredItemsProducts.length > 0 && (
              <ProductGrid
                products={featuredItemsProducts}
                onWishlistToggle={handleWishlistToggle}
                onShare={handleShare}
                clearFilters={clearFilters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductPage.displayName = "ProductPage";

export default ProductPage;
