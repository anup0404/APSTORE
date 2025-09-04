import { Check } from "lucide-react";
import React from "react";

interface Color {
  name: string;
  value: string;
  isAvailable?: boolean; // ✅ new optional flag
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string | null;
  onColorSelect: (colorName: string) => void;
  disabled?: boolean;
  title?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  disabled = false,
  title = "More Colors",
}) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="mb-6 lg:mb-8">
      <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4 tracking-wider uppercase">
        {title}: {selectedColor || "Select Color"}
      </h3>
      <div className="flex flex-wrap gap-2 lg:gap-3">
        {colors.map((color, idx) => {
          const isSelected = selectedColor === color.name;
          const isAvailable = color.isAvailable ?? true;
          const isDisabled = disabled || !isAvailable;

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onColorSelect(color.name)}
              disabled={isDisabled}
              className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all relative ${
                isSelected
                  ? "border-gray-900 scale-110"
                  : isDisabled
                  ? "border-gray-200 cursor-not-allowed opacity-50"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              style={{ backgroundColor: color.value }}
              title={`${color.name}${!isAvailable ? " (Not available)" : ""}`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              )}
              {isDisabled && !isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 rotate-45"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

ColorSelector.displayName = "ColorSelector";

export default ColorSelector;
