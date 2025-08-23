import React from "react";
import type { OrderedProduct } from "./OrderDetails.types";
import Button from "../../Button";

// Product Item Component
const ProductItem = React.forwardRef<
  HTMLDivElement,
  { product: OrderedProduct }
>(({ product }, ref) => (
  <div
    ref={ref}
    className="flex items-center justify-between py-4  last:border-b-0"
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="#E5E7EB"/>
                    <path d="M20 16L28 24L20 32" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                `)}`;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading  text-sm font-medium text-gray-900 truncate">
          {product.name}
        </h3>
        {product.variant && (
          <p className="font-secondary  text-xs text-gray-500 mt-1">
            {product.variant}
          </p>
        )}
        <div className="flex space-x-4 mt-2">
          <Button
            className="text-xs text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            children="View Product"
          />

          <Button
            className="text-xs text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            children="Similar Product"
          />
        </div>
      </div>
    </div>
    <div className="text-right flex-shrink-0 ml-4">
      <p className="font-secondary text-sm font-semibold text-gray-900">
        ${product.price}
      </p>
    </div>
  </div>
));

ProductItem.displayName = "ProductItem";
export default ProductItem;
