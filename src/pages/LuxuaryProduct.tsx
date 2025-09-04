import React, { useState, useMemo, forwardRef } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  Heart,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimitedEdition?: boolean;
  tags: string[];
  description: string;
}

interface FilterState {
  category: string[];
  subcategory: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  rating: number;
  availability: string[];
  sortBy: string;
  searchTerm: string;
}

// Sample data - replace with your actual product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Dior Forever Foundation",
    category: "Makeup",
    subcategory: "Face",
    price: 52,
    originalPrice: 62,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Dior+Forever",
    colors: ["Ivory", "Beige", "Sand", "Honey"],
    sizes: ["30ml", "50ml"],
    rating: 4.8,
    reviews: 1250,
    isNew: true,
    isBestseller: true,
    tags: ["Long-lasting", "Full Coverage"],
    description: "Flawless 24-hour wear foundation with buildable coverage",
  },
  {
    id: "2",
    name: "Miss Dior Eau de Parfum",
    category: "Fragrance",
    subcategory: "Women",
    price: 168,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Miss+Dior",
    colors: [],
    sizes: ["30ml", "50ml", "100ml"],
    rating: 4.9,
    reviews: 2100,
    isBestseller: true,
    isLimitedEdition: true,
    tags: ["Floral", "Elegant"],
    description: "Iconic floral fragrance with rose and peony",
  },
  {
    id: "3",
    name: "Rouge Dior Lipstick",
    category: "Makeup",
    subcategory: "Lips",
    price: 42,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Rouge+Dior",
    colors: ["Red", "Pink", "Coral", "Berry", "Nude"],
    sizes: ["3.5g"],
    rating: 4.7,
    reviews: 890,
    isNew: false,
    tags: ["Matte", "Long-wearing"],
    description: "Luxurious matte lipstick with intense color",
  },
  {
    id: "4",
    name: "Capture Totale Serum",
    category: "Skincare",
    subcategory: "Serums",
    price: 185,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Capture+Totale",
    colors: [],
    sizes: ["30ml", "50ml"],
    rating: 4.6,
    reviews: 567,
    tags: ["Anti-aging", "Firming"],
    description: "Advanced anti-aging serum for firmer skin",
  },
  {
    id: "5",
    name: "Dior Addict Shine",
    category: "Makeup",
    subcategory: "Lips",
    price: 38,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Dior+Addict",
    colors: ["Pink", "Red", "Orange", "Berry"],
    sizes: ["3.2g"],
    rating: 4.5,
    reviews: 432,
    tags: ["Glossy", "Hydrating"],
    description: "Glossy lipstick with hydrating formula",
  },
  {
    id: "6",
    name: "Sauvage Eau de Toilette",
    category: "Fragrance",
    subcategory: "Men",
    price: 132,
    image: "https://via.placeholder.com/300x400/f8f8f8/666?text=Sauvage",
    colors: [],
    sizes: ["60ml", "100ml", "200ml"],
    rating: 4.8,
    reviews: 3200,
    isBestseller: true,
    tags: ["Fresh", "Woody"],
    description: "Fresh and raw fragrance with bergamot and pepper",
  },
];

const categories = ["All", "Makeup", "Fragrance", "Skincare"];
const subcategories = [
  "All",
  "Face",
  "Lips",
  "Eyes",
  "Women",
  "Men",
  "Serums",
  "Moisturizers",
  "Cleansers",
];
const availableColors = [
  "Red",
  "Pink",
  "Beige",
  "Ivory",
  "Sand",
  "Honey",
  "Coral",
  "Berry",
  "Nude",
  "Orange",
];
const availableSizes = [
  "30ml",
  "50ml",
  "100ml",
  "200ml",
  "3.2g",
  "3.5g",
  "60ml",
];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
  { value: "rating", label: "Highest Rated" },
  { value: "bestseller", label: "Bestsellers" },
];

// Product Card Component
const ProductCard = forwardRef<
  HTMLDivElement,
  { product: Product; viewMode: "grid" | "list" }
>(({ product, viewMode }, ref) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");

  const isOnSale =
    product.originalPrice && product.originalPrice > product.price;

  if (viewMode === "list") {
    return (
      <div
        ref={ref}
        className="flex bg-white border border-gray-100 rounded-lg hover:shadow-lg transition-all duration-300 p-6"
      >
        <div className="w-48 h-64 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 ml-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                {product.subcategory}
              </p>
              <h3 className="text-lg font-light text-gray-900 mb-2">
                {product.name}
              </h3>
            </div>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Heart
                size={20}
                className={
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Colors:</span>
                {product.colors.slice(0, 4).map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-light text-gray-900">
                ${product.price}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative bg-gray-50 aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
              BESTSELLER
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              LIMITED
            </span>
          )}
          {isOnSale && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart
              size={16}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }
            />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <ShoppingBag size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-white"
                } shadow-sm`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-gray-600">
                  +{product.colors.length - 4}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
            {product.subcategory}
          </p>
          <h3 className="text-base font-light text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-light text-gray-900">
              ${product.price}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button className="w-full mt-3 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium opacity-0 group-hover:opacity-100">
          Add to Bag
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

// Filter Component
const FilterPanel = forwardRef<
  HTMLDivElement,
  {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    isOpen: boolean;
    onToggle: () => void;
    resultCount: number;
  }
>(({ filters, onFiltersChange, isOpen, onToggle, resultCount }, ref) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    colors: true,
    sizes: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      subcategory: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
      rating: 0,
      availability: [],
      sortBy: "featured",
      searchTerm: "",
    });
  };

  const activeFiltersCount =
    [
      ...filters.category,
      ...filters.subcategory,
      ...filters.colors,
      ...filters.sizes,
      ...filters.availability,
    ].length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0);

  return (
    <div
      ref={ref}
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-80" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <h2 className="text-lg font-light text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button onClick={onToggle} className="p-1 hover:bg-gray-100 rounded">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-600">{resultCount} Products</span>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-black transition-colors underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">Category</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.category ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.category && (
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...filters.category, category]
                        : filters.category.filter((c) => c !== category);
                      onFiltersChange({ ...filters, category: newCategories });
                    }}
                    className="mr-3 rounded"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Subcategory Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("subcategory")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">
              Subcategory
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.subcategory ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.subcategory && (
            <div className="mt-3 space-y-2">
              {subcategories.map((subcategory) => (
                <label
                  key={subcategory}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.subcategory.includes(subcategory)}
                    onChange={(e) => {
                      const newSubcategories = e.target.checked
                        ? [...filters.subcategory, subcategory]
                        : filters.subcategory.filter((s) => s !== subcategory);
                      onFiltersChange({
                        ...filters,
                        subcategory: newSubcategories,
                      });
                    }}
                    className="mr-3 rounded"
                  />
                  <span className="text-sm text-gray-700">{subcategory}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">
              Price Range
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.price ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.price && (
            <div className="mt-3">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceRange: [
                        Number(e.target.value),
                        filters.priceRange[1],
                      ],
                    })
                  }
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      priceRange: [
                        filters.priceRange[0],
                        Number(e.target.value),
                      ],
                    })
                  }
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], Number(e.target.value)],
                  })
                }
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Colors Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("colors")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">Colors</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.colors ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.colors && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    const newColors = filters.colors.includes(color)
                      ? filters.colors.filter((c) => c !== color)
                      : [...filters.colors, color];
                    onFiltersChange({ ...filters, colors: newColors });
                  }}
                  className={`w-12 h-12 rounded-lg border-2 ${
                    filters.colors.includes(color)
                      ? "border-black ring-2 ring-gray-300"
                      : "border-gray-200 hover:border-gray-300"
                  } transition-all`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sizes Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("sizes")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">Sizes</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.sizes ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.sizes && (
            <div className="mt-3 flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const newSizes = filters.sizes.includes(size)
                      ? filters.sizes.filter((s) => s !== size)
                      : [...filters.sizes, size];
                    onFiltersChange({ ...filters, sizes: newSizes });
                  }}
                  className={`px-3 py-1 border rounded text-sm transition-colors ${
                    filters.sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("rating")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">
              Minimum Rating
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.rating ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.rating && (
            <div className="mt-3 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => onFiltersChange({ ...filters, rating })}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < rating ? "fill-current" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("availability")}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="text-sm font-medium text-gray-900">
              Availability
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                openSections.availability ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSections.availability && (
            <div className="mt-3 space-y-2">
              {[
                "In Stock",
                "On Sale",
                "New Arrivals",
                "Limited Edition",
                "Bestsellers",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(option)}
                    onChange={(e) => {
                      const newAvailability = e.target.checked
                        ? [...filters.availability, option]
                        : filters.availability.filter((a) => a !== option);
                      onFiltersChange({
                        ...filters,
                        availability: newAvailability,
                      });
                    }}
                    className="mr-3 rounded"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

FilterPanel.displayName = "FilterPanel";

// Main Product Page Component
const LuxaryDiorProductPage = forwardRef<HTMLDivElement>((props, ref) => {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    subcategory: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
    rating: 0,
    availability: [],
    sortBy: "featured",
    searchTerm: "",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      // Search term
      if (
        filters.searchTerm &&
        !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category
      if (
        filters.category.length > 0 &&
        !filters.category.includes("All") &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }

      // Subcategory
      if (
        filters.subcategory.length > 0 &&
        !filters.subcategory.includes("All") &&
        !filters.subcategory.includes(product.subcategory)
      ) {
        return false;
      }

      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Colors
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((color) => product.colors.includes(color))
      ) {
        return false;
      }

      // Sizes
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      // Rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Availability
      if (filters.availability.length > 0) {
        const hasAvailabilityMatch = filters.availability.some((avail) => {
          switch (avail) {
            case "In Stock":
              return true; // All products are in stock for demo
            case "On Sale":
              return (
                product.originalPrice && product.originalPrice > product.price
              );
            case "New Arrivals":
              return product.isNew;
            case "Limited Edition":
              return product.isLimitedEdition;
            case "Bestsellers":
              return product.isBestseller;
            default:
              return false;
          }
        });
        if (!hasAvailabilityMatch) return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        filtered.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
        break;
      default:
        // Featured - keep original order but prioritize bestsellers
        filtered.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)
        );
    }

    return filtered;
  }, [filters]);

  return (
    <div ref={ref} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-light text-gray-900 tracking-wider">
                DIOR
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart size={20} className="text-gray-600" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ShoppingBag size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <span>Home</span> <span className="mx-2">/</span>{" "}
          <span className="text-gray-900">All Products</span>
        </nav>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            resultCount={filteredProducts.length}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-colors ${
                    showFilters
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  <Filter size={16} />
                  Filters
                  {filters.category.length +
                    filters.subcategory.length +
                    filters.colors.length +
                    filters.sizes.length +
                    filters.availability.length +
                    (filters.rating > 0 ? 1 : 0) >
                    0 && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {filters.category.length +
                        filters.subcategory.length +
                        filters.colors.length +
                        filters.sizes.length +
                        filters.availability.length +
                        (filters.rating > 0 ? 1 : 0)}
                    </span>
                  )}
                </button>

                <span className="text-sm text-gray-600">
                  {filteredProducts.length} of {sampleProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.category.length > 0 ||
              filters.subcategory.length > 0 ||
              filters.colors.length > 0 ||
              filters.sizes.length > 0 ||
              filters.availability.length > 0 ||
              filters.rating > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">
                  Active filters:
                </span>

                {filters.category.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full"
                  >
                    {category}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          category: filters.category.filter(
                            (c) => c !== category
                          ),
                        })
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.subcategory.map((subcategory) => (
                  <span
                    key={subcategory}
                    className="inline-flex items-center gap-1 bg-gray-800 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {subcategory}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          subcategory: filters.subcategory.filter(
                            (s) => s !== subcategory
                          ),
                        })
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.colors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex items-center gap-1 bg-gray-600 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {color}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          colors: filters.colors.filter((c) => c !== color),
                        })
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1 bg-gray-500 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {size}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          sizes: filters.sizes.filter((s) => s !== size),
                        })
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.availability.map((avail) => (
                  <span
                    key={avail}
                    className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {avail}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          availability: filters.availability.filter(
                            (a) => a !== avail
                          ),
                        })
                      }
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.rating > 0 && (
                  <span className="inline-flex items-center gap-1 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full">
                    {filters.rating}+ Stars
                    <button
                      onClick={() => setFilters({ ...filters, rating: 0 })}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: [],
                      subcategory: [],
                      priceRange: [0, 500],
                      colors: [],
                      sizes: [],
                      rating: 0,
                      availability: [],
                      sortBy: "featured",
                      searchTerm: "",
                    })
                  }
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white text-black border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={true}
              onToggle={() => setShowFilters(false)}
              resultCount={filteredProducts.length}
            />
          </div>
        </div>
      )}
    </div>
  );
});

LuxaryDiorProductPage.displayName = "LuxaryDiorProductPage";

export default LuxaryDiorProductPage;
