import { Search } from "lucide-react";
import type { HomeProduct } from "../../types/home.type";
import ProductCard from "./Product/ProductCard";

interface ProductGridProps {
  products: HomeProduct[];
  onWishlistToggle?: (id: string) => void;
  onShare?: (id: string) => void;
  clearFilters?: () => void;
}

const ProductGrid = ({
  products,
  onWishlistToggle,
  onShare,
  clearFilters,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-sm">
            Try adjusting your filters to see more results
          </p>
        </div>
        <button
          onClick={clearFilters}
          className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors rounded"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 mt-12 sm:mt-16 lg:mt-20">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onWishlistToggle={onWishlistToggle}
            onShare={onShare}
          />
        ))}
      </div>
    </div>
  );
};
ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
