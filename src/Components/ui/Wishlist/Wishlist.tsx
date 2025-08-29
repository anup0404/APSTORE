import React, { useState, forwardRef, useCallback } from "react";
import {
  Heart,
  X,
  ShoppingBag,
  Share2,
  Filter,
  Plus,
  Minus,
} from "lucide-react";
import type { WishlistItem } from "./wishlist.types";
import { wishlistData } from "./wishlistData";
import withErrorBoundary from "../ErrorBoundary/withErrorBoundary";
import WishlistItem from "./WishlistItem";

// Filter Component - Minimal Dior Style
const FilterComponent = forwardRef<
  HTMLDivElement,
  {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    isOpen: boolean;
    onToggle: () => void;
  }
>(
  (
    {
      categories,
      selectedCategory,
      onCategoryChange,
      sortBy,
      onSortChange,
      isOpen,
      onToggle,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="border-b border-gray-200 mb-16">
        <div className="flex items-center justify-between py-6">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 text-sm font-light tracking-[0.2em] uppercase text-black hover:text-gray-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter & Sort
            {isOpen ? (
              <Minus className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <label className="block text-xs font-light tracking-[0.2em] uppercase text-gray-600 mb-3">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm font-light focus:outline-none focus:border-black transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-light tracking-[0.2em] uppercase text-gray-600 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full border-b border-gray-300 bg-transparent py-2 text-sm font-light focus:outline-none focus:border-black transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FilterComponent.displayName = "FilterComponent";

interface WishlistProps {}

// Main Wishlist Component
const Wishlist = forwardRef<HTMLDivElement, WishlistProps>((props, ref) => {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(wishlistData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Get unique categories
  const categories = Array.from(
    new Set(wishlistItems.map((item) => item.category))
  );

  // Filter and sort items
  const filteredAndSortedItems = React.useMemo(() => {
    const filtered = wishlistItems.filter(
      (item) => selectedCategory === "" || item.category === selectedCategory
    );

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
      default:
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [wishlistItems, selectedCategory, sortBy]);

  // const handleRemoveItem = useCallback((id: string) => {
  //   setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  // }, []);

  const handleAddToBag = useCallback(
    (id: string) => {
      const item = wishlistItems.find((item) => item.id === id);
      if (item) {
        alert(`Added "${item.name}" to your shopping bag!`);
      }
    },
    [wishlistItems]
  );

  const handleShare = useCallback(
    (id: string) => {
      const item = wishlistItems.find((item) => item.id === id);
      if (item) {
        if (navigator.share) {
          navigator.share({
            title: item.name,
            text: `Discover ${item.name} from Dior`,
            url: window.location.href,
          });
        } else {
          alert(`Sharing: ${item.name}`);
        }
      }
    },
    [wishlistItems]
  );

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  if (wishlistItems.length === 0) {
    return (
      <div
        ref={ref}
        className="min-h-screen bg-white flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-8">
          <div className="w-24 h-24 mx-auto mb-12 border border-black flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-light text-black mb-8 tracking-[0.1em]">
            Your Wishlist is Empty
          </h2>
          <p className="text-lg font-light text-gray-600 mb-12 leading-relaxed">
            Discover our collections and save your favorite pieces for later.
          </p>
          <button className="border border-black px-16 py-4 bg-white text-black font-light tracking-[0.3em] text-sm uppercase hover:bg-black hover:text-white transition-all duration-500">
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="min-h-screen bg-white">
      {/* Minimalist Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-8 border border-black flex items-center justify-center">
            <span className="text-black font-light text-sm tracking-[0.2em]">
              DIOR
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light text-black tracking-[0.1em] mb-6">
            MY WISHLIST
          </h1>

          <div className="flex items-center justify-center gap-8 text-sm font-light text-gray-600">
            <span className="tracking-[0.2em] uppercase">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "Item" : "Items"}
            </span>
            <span className="w-px h-4 bg-gray-300" />
            <span className="tracking-[0.2em] uppercase">
              Total Value: ${totalValue.toLocaleString()}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Filters */}
        <FilterComponent
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          isOpen={filtersOpen}
          onToggle={() => setFiltersOpen(!filtersOpen)}
        />

        {/* Items Grid - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 lg:gap-24">
          {filteredAndSortedItems.map((item, index) => (
            <WishlistItem
              key={item.id}
              item={item}
              index={index}
              onAddToBag={handleAddToBag}
            />
          ))}
        </div>

        {/* Footer Summary */}
        {filteredAndSortedItems.length > 0 && (
          <div className="mt-32 pt-16 border-t border-gray-200 text-center">
            <h3 className="text-2xl font-light text-black mb-8 tracking-[0.1em]">
              Complete Your Selection
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="border border-gray-300 px-12 py-4 bg-white text-black font-light tracking-[0.2em] text-sm uppercase hover:border-black transition-all duration-500">
                Share Wishlist
              </button>
              <button className="border border-black px-12 py-4 bg-black text-white font-light tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black transition-all duration-500">
                Add All to Bag
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
});

Wishlist.displayName = "Wishlist";
export default withErrorBoundary(Wishlist, {
  title: "Unable to load Wishlist",
  message: "Please try again later or refresh the page.",
  showReload: true,
});
