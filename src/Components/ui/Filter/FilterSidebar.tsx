// // components/filters/FilterSidebar.tsx

import { Search, X, Star } from "lucide-react";
import type {
  ArrayFilterKeys,
  ExpandedFilters,
  Filters,
} from "../../../types/filter.types";
import FilterSection from "./FilterSection";
import {
  availabilityOptions,
  categories,
  colors,
  materials,
  sizes,
  subcategories,
} from "../../../types/dummyProduct.types";

// interface FilterSidebarProps {
//   filters: Filters;
//   expandedFilters: Record<string, boolean>;
//   updateFilter: (key: keyof Filters, value: unknown) => void;
//   toggleArrayFilter: (key: keyof Filters, value: string) => void;
//   clearFilters: () => void;
//   setExpandedFilters: React.Dispatch<
//     React.SetStateAction<Record<string, boolean>>
//   >;
// }

// const FilterSidebar = ({
//   filters,
//   expandedFilters,
//   updateFilter,
//   toggleArrayFilter,
//   clearFilters,
//   setExpandedFilters,
// }: FilterSidebarProps) => {
//   return (
//     <div className="space-y-6">
//       {/* 🔍 Search */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//         <input
//           type="text"
//           placeholder="Search Dior collection..."
//           value={filters.search}
//           onChange={(e) => updateFilter("search", e.target.value)}
//           className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
//         />
//         {filters.search && (
//           <button
//             onClick={() => updateFilter("search", "")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* 📂 Categories */}
//       <FilterSection
//         title="Categories"
//         isOpen={expandedFilters.category}
//         onToggle={() =>
//           setExpandedFilters((p) => ({ ...p, category: !p.category }))
//         }
//       >
//         {categories.map((category) => (
//           <label key={category} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={filters.category.includes(category)}
//               onChange={() => toggleArrayFilter("category", category)}
//               className="rounded border-gray-300 text-black focus:ring-black"
//             />
//             <span className="ml-2 text-sm">{category}</span>
//           </label>
//         ))}
//       </FilterSection>

//       {/* 📂 Subcategories */}
//       <FilterSection
//         title="Subcategories"
//         isOpen={expandedFilters.subcategory}
//         onToggle={() =>
//           setExpandedFilters((p) => ({ ...p, subcategory: !p.subcategory }))
//         }
//       >
//         {subcategories.map((subcategory) => (
//           <label key={subcategory} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={filters.subcategory.includes(subcategory)}
//               onChange={() => toggleArrayFilter("subcategory", subcategory)}
//               className="rounded border-gray-300 text-black focus:ring-black"
//             />
//             <span className="ml-2 text-sm">{subcategory}</span>
//           </label>
//         ))}
//       </FilterSection>

//       {/* 💰 Price Range */}
//       <FilterSection
//         title="Price Range"
//         isOpen={expandedFilters.price}
//         onToggle={() => setExpandedFilters((p) => ({ ...p, price: !p.price }))}
//       >
//         <div className="flex items-center space-x-2">
//           <input
//             type="number"
//             value={filters.priceRange[0]}
//             onChange={(e) =>
//               updateFilter("priceRange", [
//                 Number(e.target.value),
//                 filters.priceRange[1],
//               ])
//             }
//             className="w-20 border border-gray-300 p-1 text-sm"
//             min={0}
//           />
//           <span>-</span>
//           <input
//             type="number"
//             value={filters.priceRange[1]}
//             onChange={(e) =>
//               updateFilter("priceRange", [
//                 filters.priceRange[0],
//                 Number(e.target.value),
//               ])
//             }
//             className="w-20 border border-gray-300 p-1 text-sm"
//             min={0}
//           />
//         </div>
//       </FilterSection>

//       {/* ✅ Availability */}
//       <FilterSection
//         title="Availability"
//         isOpen={expandedFilters.availability}
//         onToggle={() =>
//           setExpandedFilters((p) => ({ ...p, availability: !p.availability }))
//         }
//       >
//         {availabilityOptions.map((option) => (
//           <label key={option} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={filters.availability.includes(option)}
//               onChange={() => toggleArrayFilter("availability", option)}
//               className="rounded border-gray-300 text-black focus:ring-black"
//             />
//             <span className="ml-2 text-sm">{option}</span>
//           </label>
//         ))}
//       </FilterSection>

//       {/* ⭐ Rating */}
//       <FilterSection
//         title="Rating"
//         isOpen={expandedFilters.rating}
//         onToggle={() =>
//           setExpandedFilters((p) => ({ ...p, rating: !p.rating }))
//         }
//       >
//         {[5, 4, 3, 2, 1].map((rating) => (
//           <label
//             key={rating}
//             className="flex items-center space-x-1 cursor-pointer"
//           >
//             <input
//               type="radio"
//               name="rating"
//               value={rating}
//               checked={filters.rating === rating}
//               onChange={() => updateFilter("rating", rating)}
//               className="hidden"
//             />
//             <div className="flex items-center">
//               {Array.from({ length: rating }).map((_, i) => (
//                 <Star
//                   key={i}
//                   className="w-4 h-4 fill-current text-yellow-500"
//                 />
//               ))}
//               <span className="ml-1 text-sm">& up</span>
//             </div>
//           </label>
//         ))}
//       </FilterSection>

//       {/* 🎨 Colors */}
//       <FilterSection
//         title="Colors"
//         isOpen={expandedFilters.color}
//         onToggle={() => setExpandedFilters((p) => ({ ...p, color: !p.color }))}
//       >
//         <div className="flex flex-wrap gap-2">
//           {colors.map((color) => (
//             <button
//               key={color}
//               onClick={() => toggleArrayFilter("color", color)}
//               className={`w-6 h-6 rounded-full border-2 ${
//                 filters.color.includes(color)
//                   ? "border-black"
//                   : "border-gray-300"
//               }`}
//               style={{ backgroundColor: color.toLowerCase() }}
//             />
//           ))}
//         </div>
//       </FilterSection>

//       {/* 📏 Sizes */}
//       <FilterSection
//         title="Sizes"
//         isOpen={expandedFilters.size}
//         onToggle={() => setExpandedFilters((p) => ({ ...p, size: !p.size }))}
//       >
//         <div className="flex flex-wrap gap-2">
//           {sizes.map((size) => (
//             <button
//               key={size}
//               onClick={() => toggleArrayFilter("size", size)}
//               className={`px-3 py-1 border text-sm ${
//                 filters.size.includes(size)
//                   ? "bg-black text-white"
//                   : "border-gray-300"
//               }`}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </FilterSection>

//       {/* 🪵 Materials */}
//       <FilterSection
//         title="Materials"
//         isOpen={expandedFilters.material}
//         onToggle={() =>
//           setExpandedFilters((p) => ({ ...p, material: !p.material }))
//         }
//       >
//         {materials.map((material) => (
//           <label key={material} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={filters.material.includes(material)}
//               onChange={() => toggleArrayFilter("material", material)}
//               className="rounded border-gray-300 text-black focus:ring-black"
//             />
//             <span className="ml-2 text-sm">{material}</span>
//           </label>
//         ))}
//       </FilterSection>

//       {/* ❌ Clear All */}
//       <button
//         onClick={clearFilters}
//         className="w-full py-3 border text-sm text-gray-600 hover:text-black"
//       >
//         Clear All Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSidebar;

interface FilterSidebarProps {
  filters: Filters;
  expandedFilters: Record<string, boolean>;
  updateFilter: (key: keyof Filters, value: unknown) => void;
  toggleArrayFilter: (key: ArrayFilterKeys, value: string) => void; // ✅ fixed
  clearFilters: () => void;
  setExpandedFilters: React.Dispatch<React.SetStateAction<ExpandedFilters>>;
  onClose?: () => void;
  isMobile?: boolean;
}

const FilterSidebar = ({
  filters,
  expandedFilters,
  updateFilter,
  toggleArrayFilter,
  clearFilters,
  setExpandedFilters,
  onClose,
  isMobile = false,
}: FilterSidebarProps) => {
  return (
    <div className={`space-y-6 ${isMobile ? "p-4" : ""}`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-lg font-medium">Filters</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search Dior collection..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-md"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection
        title="Categories"
        isOpen={expandedFilters.category}
        onToggle={() =>
          setExpandedFilters((p) => ({ ...p, category: !p.category }))
        }
      >
        {categories.map((category) => (
          <label key={category} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.category.includes(category)}
              onChange={() => toggleArrayFilter("category", category)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm">{category}</span>
          </label>
        ))}
      </FilterSection>

      {/* Subcategories */}
      <FilterSection
        title="Subcategories"
        isOpen={expandedFilters.subcategory}
        onToggle={() =>
          setExpandedFilters((p) => ({ ...p, subcategory: !p.subcategory }))
        }
      >
        {subcategories.map((subcategory) => (
          <label key={subcategory} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.subcategory.includes(subcategory)}
              onChange={() => toggleArrayFilter("subcategory", subcategory)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm">{subcategory}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isOpen={expandedFilters.price}
        onToggle={() => setExpandedFilters((p) => ({ ...p, price: !p.price }))}
      >
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) =>
              updateFilter("priceRange", [
                Number(e.target.value),
                filters.priceRange[1],
              ])
            }
            className="w-20 border border-gray-300 p-2 text-sm rounded"
            min={0}
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) =>
              updateFilter("priceRange", [
                filters.priceRange[0],
                Number(e.target.value),
              ])
            }
            className="w-20 border border-gray-300 p-2 text-sm rounded"
            min={0}
            placeholder="Max"
          />
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection
        title="Availability"
        isOpen={expandedFilters.availability}
        onToggle={() =>
          setExpandedFilters((p) => ({ ...p, availability: !p.availability }))
        }
      >
        {availabilityOptions.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.availability.includes(option)}
              onChange={() => toggleArrayFilter("availability", option)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm">{option}</span>
          </label>
        ))}
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title="Rating"
        isOpen={expandedFilters.rating}
        onToggle={() =>
          setExpandedFilters((p) => ({ ...p, rating: !p.rating }))
        }
      >
        {[5, 4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <input
              type="radio"
              name="rating"
              value={rating}
              checked={filters.rating === rating}
              onChange={() => updateFilter("rating", rating)}
              className="hidden"
            />
            <div className="flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-current text-yellow-500"
                />
              ))}
              <span className="ml-1 text-sm">& up</span>
            </div>
          </label>
        ))}
      </FilterSection>

      {/* Colors */}
      <FilterSection
        title="Colors"
        isOpen={expandedFilters.color}
        onToggle={() => setExpandedFilters((p) => ({ ...p, color: !p.color }))}
      >
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleArrayFilter("color", color)}
              className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                filters.color.includes(color)
                  ? "border-black ring-2 ring-black ring-offset-2"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection
        title="Sizes"
        isOpen={expandedFilters.size}
        onToggle={() => setExpandedFilters((p) => ({ ...p, size: !p.size }))}
      >
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayFilter("size", size)}
              className={`px-3 py-1 border text-sm rounded transition-colors ${
                filters.size.includes(size)
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Materials */}
      <FilterSection
        title="Materials"
        isOpen={expandedFilters.material}
        onToggle={() =>
          setExpandedFilters((p) => ({ ...p, material: !p.material }))
        }
      >
        {materials.map((material) => (
          <label key={material} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.material.includes(material)}
              onChange={() => toggleArrayFilter("material", material)}
              className="rounded border-gray-300 text-black focus:ring-black"
            />
            <span className="ml-2 text-sm">{material}</span>
          </label>
        ))}
      </FilterSection>

      {/* Clear All */}
      <button
        onClick={clearFilters}
        className="w-full py-3 border border-gray-300 text-sm text-gray-600 hover:text-black hover:border-black transition-colors rounded"
      >
        Clear All Filters
      </button>
    </div>
  );
};

FilterSidebar.displayName = "FilterSidebar";

export default FilterSidebar;
