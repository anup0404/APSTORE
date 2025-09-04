import React from "react";

export interface SizeOption {
  size: string; // must always be a string
  stock: number; // must always be a number
}

interface SizeSelectorProps {
  sizes: SizeOption[]; // expect normalized data
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  onShowSizeGuide?: () => void;
  disabled?: boolean;
  allSizes?: string[];
  title?: string;
}
const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
  onShowSizeGuide,
  disabled = false,
  allSizes = [],
  title = "Size",
}) => {
  if (!sizes || sizes.length === 0) return null;

  // Available sizes from current variants (with stock info)
  const availableSizeMap = new Map(sizes.map((s) => [s.size, s.stock]));

  // Show allSizes if given, otherwise just available ones
  const sizesToDisplay =
    allSizes.length > 0 ? allSizes : sizes.map((s) => s.size);

  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="text-xs lg:text-sm font-medium text-gray-900 tracking-wider uppercase">
          {title}: {selectedSize || "Select Size"}
        </h3>
        {onShowSizeGuide && (
          <button
            onClick={onShowSizeGuide}
            className="text-xs text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            Size Guide
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {sizesToDisplay.map((size, idx) => {
          const stock = availableSizeMap.get(size) ?? 0;
          const isSelected = selectedSize === size;
          const isAvailable = stock > 0;
          const isDisabled = disabled || !isAvailable;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onSizeSelect(size)}
              disabled={isDisabled}
              className={`py-2 lg:py-3 px-3 lg:px-4 border text-sm font-medium transition-colors relative ${
                isSelected
                  ? "border-gray-900 bg-gray-900 text-white"
                  : isDisabled
                  ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                  : "border-gray-300 text-gray-900 hover:border-gray-500 hover:bg-gray-50"
              }`}
              title={
                !isAvailable
                  ? `${size} - Not available`
                  : `${size} (${stock} in stock)`
              }
            >
              {size}
              {/* Strike-through for out of stock */}
              {stock <= 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-1/3 h-[1px] bg-gray-400 rotate-45"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {disabled && (
        <div className="mt-2 text-xs text-gray-500">
          Select a color first to see available sizes
        </div>
      )}
    </div>
  );
};

SizeSelector.displayName = "SizeSelector";

export default SizeSelector;
