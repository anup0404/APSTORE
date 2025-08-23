import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "./CategoryGrid.type";
import { HOME_CATEGORY_HEADING } from "../../../constants/global.constant";
import { Link } from "react-router-dom";

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = React.forwardRef<HTMLElement, CategoryGridProps>(
  ({ categories }, ref) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
      }
    };

    return (
      <section ref={ref} className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-gray-900 tracking-wide mb-4">
              {HOME_CATEGORY_HEADING}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
          </div>

          {/* Scrollable Container */}
          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Categories Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories?.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`flex-none group cursor-pointer transition-all duration-500 ${
                    index % 2 === 0 ? "w-80 lg:w-96" : "w-72 lg:w-80"
                  }`}
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`relative overflow-hidden transition-all duration-700 ${
                      index % 2 === 0 ? "h-96 lg:h-[500px]" : "h-80 lg:h-96"
                    } ${
                      hoveredId === category.id
                        ? "transform -translate-y-2 shadow-2xl"
                        : "shadow-lg"
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredId === category.id
                          ? "scale-110 brightness-110"
                          : "scale-100"
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        hoveredId === category.id
                          ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                          : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                      }`}
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                      <div
                        className={`transform transition-all duration-500 ${
                          hoveredId === category.id
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-90"
                        }`}
                      >
                        {/* Category Badge */}
                        <div className="mb-3">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-light uppercase tracking-wider transition-all duration-300 ${
                              hoveredId === category.id
                                ? "bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                                : "bg-black/20 text-white/90 border border-white/20"
                            }`}
                          >
                            {category.count}
                          </span>
                        </div>

                        {/* Category Title */}
                        <h3
                          className={`font-serif text-lg lg:text-xl font-light text-white leading-tight mb-4 transition-all duration-300 ${
                            hoveredId === category.id
                              ? "tracking-wide"
                              : "tracking-normal"
                          }`}
                        >
                          {category.name}
                        </h3>

                        {/* Explore Button */}
                        <div
                          className={`transform transition-all duration-500 ${
                            hoveredId === category.id
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          }`}
                        >
                          <span className="group/btn relative text-white text-sm font-light uppercase tracking-wider pb-1 transition-all duration-300 hover:tracking-widest">
                            Explore Collection
                          </span>
                          <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white via-white/80 to-transparent group-hover/btn:w-full transition-all duration-500"></div>
                          <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
                        hoveredId === category.id
                          ? "ring-2 ring-white/30 ring-inset"
                          : ""
                      }`}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {Array.from({
                length: Math.min(categories?.length, 6),
              }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300"
                />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    );
  }
);

CategoryGrid.displayName = "CategoryGrid";
export default CategoryGrid;
