import React, { useState } from "react";
import type { CategoryGridProps } from "./CategoryGrid.type";

const CategoryGrid = React.forwardRef<HTMLElement, CategoryGridProps>(
  ({ categories }, ref) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
      <section ref={ref} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-48 object-cover transition-transform duration-300 ${
                      hoveredId === category.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

CategoryGrid.displayName = "CategoryGrid";
export default CategoryGrid;
