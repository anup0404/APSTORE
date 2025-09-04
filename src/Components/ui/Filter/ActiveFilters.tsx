import { X } from "lucide-react";
import type { ArrayFilterKeys, Filters } from "../../../types/filter.types";

interface ActiveFiltersProps {
  filters: Filters;
  toggleArrayFilter: (key: ArrayFilterKeys, value: string) => void;
  updateFilter: (key: keyof Filters, value: unknown) => void;
  clearFilters: () => void;
}

const ActiveFilters = ({
  filters,
  toggleArrayFilter,
  clearFilters,
  updateFilter,
}: ActiveFiltersProps) => {
  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.subcategory.length > 0 ||
    filters.color.length > 0 ||
    filters.size.length > 0 ||
    filters.material.length > 0 ||
    filters.availability.length > 0 ||
    filters.rating > 0 ||
    filters.search !== "";

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium uppercase tracking-wide">
          Active Filters
        </span>
        <button
          onClick={clearFilters}
          className="text-xs text-gray-500 hover:text-black underline transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Search filter */}
        {filters.search && (
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            Search: {filters.search}
            <button onClick={() => updateFilter("search", "")}>
              <X size={12} />
            </button>
          </span>
        )}

        {/* Category filters */}
        {filters.category.map((c) => (
          <span
            key={c}
            className="bg-black text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {c}
            <button onClick={() => toggleArrayFilter("category", c)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Subcategory filters */}
        {filters.subcategory.map((sc) => (
          <span
            key={sc}
            className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {sc}
            <button onClick={() => toggleArrayFilter("subcategory", sc)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Color filters */}
        {filters.color.map((color) => (
          <span
            key={color}
            className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {color}
            <button onClick={() => toggleArrayFilter("color", color)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Size filters */}
        {filters.size.map((size) => (
          <span
            key={size}
            className="bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {size}
            <button onClick={() => toggleArrayFilter("size", size)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Material filters */}
        {filters.material.map((material) => (
          <span
            key={material}
            className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {material}
            <button onClick={() => toggleArrayFilter("material", material)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Availability filters */}
        {filters.availability.map((avail) => (
          <span
            key={avail}
            className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
          >
            {avail}
            <button onClick={() => toggleArrayFilter("availability", avail)}>
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Rating filter */}
        {filters.rating > 0 && (
          <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            {filters.rating}+ Stars
            <button onClick={() => updateFilter("rating", 0)}>
              <X size={12} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

ActiveFilters.displayName = "ActiveFilters";
export default ActiveFilters;
