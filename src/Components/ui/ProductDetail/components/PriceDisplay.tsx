import React from "react";

interface PriceDisplayProps {
  price: number | string;
  originalPrice?: number;
  discount?: number;
  currency?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  discount,
  currency = "₹",
}) => {
  const discountPercentage =
    originalPrice && typeof price === "number"
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : discount;

  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex items-baseline gap-3 lg:gap-4 mb-2 flex-wrap">
        <span className="text-xl lg:text-2xl font-light text-gray-900">
          {currency}
          {typeof price === "number" ? price.toLocaleString() : price}
        </span>
        {originalPrice && (
          <>
            <span className="text-base lg:text-lg text-gray-500 line-through">
              {currency}
              {originalPrice.toLocaleString()}
            </span>
            {discountPercentage && (
              <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium rounded">
                -{discountPercentage}% OFF
              </span>
            )}
          </>
        )}
      </div>

      {discountPercentage && !originalPrice && (
        <span className="text-sm text-green-700 font-medium">
          {discountPercentage}% OFF
        </span>
      )}
    </div>
  );
};

PriceDisplay.displayName = "PriceDisplay";

export default PriceDisplay;
