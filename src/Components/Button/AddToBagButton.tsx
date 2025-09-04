import React from "react";
import { ShoppingBag } from "lucide-react";

// Add to Bag Button
interface AddToBagButtonProps {
  inStock: boolean;
  onAddToBag: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
  inStock,
  onAddToBag,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-sm",
  };

  return (
    <button
      onClick={onAddToBag}
      disabled={!inStock}
      className={`${
        sizeClasses[size]
      } font-medium tracking-wider uppercase transition-colors ${
        inStock
          ? "bg-gray-900 text-white hover:bg-gray-800"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      } ${className}`}
    >
      <ShoppingBag className="w-4 h-4 inline mr-2" />
      {inStock ? "Add to Bag" : "Out of Stock"}
    </button>
  );
};

AddToBagButton.displayName = "AddToBagButton";
export default AddToBagButton;
