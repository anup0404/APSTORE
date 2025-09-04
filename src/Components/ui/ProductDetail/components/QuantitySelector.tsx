import React from "react";
import { MinusCircle, PlusCircle } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
  minQuantity?: number;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  maxQuantity = 10,
  minQuantity = 1,
  disabled = false,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded">
      <button
        onClick={() => onQuantityChange(Math.max(minQuantity, quantity - 1))}
        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || quantity <= minQuantity}
      >
        <MinusCircle className="w-4 h-4" />
      </button>
      <span className="px-4 py-2 min-w-[3rem] text-center text-sm">
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || quantity >= maxQuantity}
      >
        <PlusCircle className="w-4 h-4" />
      </button>
    </div>
  );
};

QuantitySelector.displayName = "QuantitySelector";
export default QuantitySelector;
