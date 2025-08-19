import React from "react";
import type { FeaturedItemsProps } from "./ui/Product/ProductCard.type";
import ProductCard from "./ui/Product/ProductCard";

const FeaturedItems = React.forwardRef<HTMLDivElement, FeaturedItemsProps>(
  (
    {
      products,
      heading = "Our featured items",
      subheading = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.",
      onWishlistToggle,
      onShare,
    },
    ref
  ) => {
    return (
      <section ref={ref} className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600">
              {subheading}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 lg:mt-16">
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
