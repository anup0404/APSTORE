import React from "react";
import ProductCard, { type ProductCardProps } from "./Product/ProductCard";

export interface FeaturedItemsProps {
  heading?: string;
  subheading?: string;
  products: ProductCardProps[];
  onAddToCart?: (id: string) => void;
  onAddToBag?: (id: string) => void;
  onWishlistToggle?: (id: string) => void;
  onShare?: (id: string) => void;
}

const FeaturedItems = React.forwardRef<HTMLDivElement, FeaturedItemsProps>(
  ({ products, heading, subheading, onWishlistToggle, onShare }, ref) => {
    return (
      <section ref={ref} className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-light text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-wide">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-gray-600 font-light">
                {subheading}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 sm:mt-16 lg:mt-20">
            {products.map((item) => (
              <ProductCard
                key={item.product.id}
                product={item.product}
                onWishlistToggle={onWishlistToggle}
                onShare={onShare}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

FeaturedItems.displayName = "FeaturedItems";
export default FeaturedItems;
