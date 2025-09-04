import { Heart } from "lucide-react";

interface WishlistButtonProps {
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  isWishlisted,
  onWishlistToggle,
  className = "",
  size = "md",
  variant = "outline",
}) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-sm",
  };

  const variantClasses = {
    filled: isWishlisted
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: isWishlisted
      ? "border-red-500 text-red-600 bg-red-50"
      : "border-gray-300 text-gray-900 hover:border-gray-500",
  };

  return (
    <button
      onClick={onWishlistToggle}
      className={`${sizeClasses[size]} ${
        variant === "outline" ? "border" : ""
      } ${
        variantClasses[variant]
      } font-medium tracking-wider uppercase transition-colors ${className}`}
    >
      <Heart
        className={`w-4 h-4 inline mr-2 ${isWishlisted ? "fill-current" : ""}`}
      />
      {isWishlisted ? "Saved" : "Save"}
    </button>
  );
};
WishlistButton.displayName = "WishlistButton";
export default WishlistButton;
