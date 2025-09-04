import React from "react";
import {
  ShoppingBag,
  Heart,
  Share2,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

interface ActionButtonsProps {
  inStock: boolean;
  isWishlisted: boolean;
  onAddToBag: () => void;
  onWishlistToggle: () => void;
  onShare?: () => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  inStock,
  isWishlisted,
  onAddToBag,
  onWishlistToggle,
  onShare,
  quantity,
  onQuantityChange,
  maxQuantity = 10,
}) => {
  return (
    <div className="space-y-4 mb-8 lg:mb-10">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">
          Quantity
        </span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <MinusCircle className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center text-sm">
            {quantity}
          </span>
          <button
            onClick={() =>
              onQuantityChange(Math.min(maxQuantity, quantity + 1))
            }
            className="p-2 hover:bg-gray-50 disabled:opacity-50"
            disabled={quantity >= maxQuantity}
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Action */}
      <button
        onClick={onAddToBag}
        disabled={!inStock}
        className={`w-full py-3 lg:py-4 px-6 lg:px-8 text-sm font-medium tracking-wider uppercase transition-colors ${
          inStock
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <ShoppingBag className="w-4 h-4 inline mr-2" />
        {inStock ? "Add to Bag" : "Out of Stock"}
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onWishlistToggle}
          className={`py-3 lg:py-4 px-6 lg:px-8 border text-sm font-medium tracking-wider uppercase transition-colors ${
            isWishlisted
              ? "border-red-500 text-red-600 bg-red-50"
              : "border-gray-300 text-gray-900 hover:border-gray-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 inline mr-2 ${
              isWishlisted ? "fill-red-500" : ""
            }`}
          />
          {isWishlisted ? "Saved" : "Save"}
        </button>

        <button
          onClick={onShare}
          className="py-3 lg:py-4 px-6 lg:px-8 border border-gray-300 text-gray-900 hover:border-gray-500 text-sm font-medium tracking-wider uppercase transition-colors"
        >
          <Share2 className="w-4 h-4 inline mr-2" />
          Share
        </button>
      </div>
    </div>
  );
};

ActionButtons.displayName = "ActionButtons";
export default ActionButtons;
