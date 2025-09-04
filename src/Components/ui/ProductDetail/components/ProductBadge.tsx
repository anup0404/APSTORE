import React from "react";

interface ProductBadgeProps {
  // badge?: "NEW" | "SALE" | "LIMITED" | "BESTSELLER" | "EXCLUSIVE";
  badge?: string;
  isEcoFriendly?: boolean;
  isLowStock?: boolean;
  stockCount?: number;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({
  badge,
  isEcoFriendly,
  isLowStock,
  stockCount,
}) => {
  if (!badge && !isEcoFriendly && !isLowStock) return null;

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {badge && (
        <span
          className={`px-3 py-1 text-xs font-medium tracking-wide rounded-full ${
            badge === "NEW"
              ? "bg-black text-white"
              : badge === "SALE"
              ? "bg-red-600 text-white"
              : badge === "BESTSELLER"
              ? "bg-yellow-500 text-black"
              : badge === "EXCLUSIVE"
              ? "bg-purple-600 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {badge}
        </span>
      )}

      {isEcoFriendly && (
        <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-medium tracking-wide rounded-full">
          Sustainable
        </span>
      )}

      {isLowStock && stockCount && (
        <span className="bg-orange-100 text-orange-800 px-3 py-1 text-xs font-medium tracking-wide rounded-full">
          Only {stockCount} left
        </span>
      )}
    </div>
  );
};

ProductBadge.displayName = "ProductBadge";
export default ProductBadge;
