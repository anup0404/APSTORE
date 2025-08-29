import React, { useState, useEffect, useCallback } from "react";
import {
  Heart,
  Share2,
  Star,
  StarOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { HomeProduct } from "../../../types/home.type";

export interface ProductCardProps {
  product: HomeProduct;
  onWishlistToggle?: (id: string) => void;
  onShare?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onAddToBag?: (id: string) => void;
  className?: string;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) =>
    index < rating ? (
      <Star
        key={index}
        className="w-3 h-3 text-yellow-400"
        fill="currentColor"
      />
    ) : (
      <StarOff key={index} className="w-3 h-3 text-gray-300" />
    )
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  onShare,
}) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Use product.images if available, otherwise fallback to single image
  const variantImages =
    product.variant_images && product.variant_images.length > 0
      ? product.variant_images
      : product.primary_image
      ? [product.primary_image]
      : [];

  // Manual navigation handlers
  const handlePrevImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setAutoRotate(false); // Stop auto-rotation when manually navigating
      setCurrentImageIndex(
        (prev) => (prev - 1 + variantImages.length) % variantImages.length
      );

      // Resume auto-rotation after a delay
      setTimeout(() => setAutoRotate(true), 3000);
    },
    [variantImages.length]
  );

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setAutoRotate(false); // Stop auto-rotation when manually navigating
      setCurrentImageIndex((prev) => (prev + 1) % variantImages.length);

      // Resume auto-rotation after a delay
      setTimeout(() => setAutoRotate(true), 3000);
    },
    [variantImages.length]
  );

  // Auto-rotate images on hover (only if autoRotate is true)
  useEffect(() => {
    if (isHovered && variantImages.length > 1 && autoRotate) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % variantImages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isHovered, variantImages.length, autoRotate]);

  // Reset image index when leaving hover
  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      setAutoRotate(true);
    }
  }, [isHovered]);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="relative group cursor-pointer bg-white"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute left-4 top-4 z-10">
          {Object.entries(product.badge).map(([key, value]) =>
            value ? (
              <span
                key={key}
                className={`px-3 py-1 mr-2 text-xs font-medium tracking-wider uppercase ${
                  key === "isNew"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {typeof value === "string" ? value : key.replace("is", "")}
              </span>
            ) : null
          )}
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
        {variantImages.length > 0 ? (
          <>
            <img
              src={variantImages[currentImageIndex]}
              alt={product.name}
              className="object-cover w-full h-full transition-all duration-500 ease-in-out"
            />

            {/* Image Navigation - Only show on hover if multiple images */}
            {variantImages.length > 1 && (
              <>
                <button
                  className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg transition-all duration-300 hover:bg-white z-30 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={handlePrevImage}
                  style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-900" />
                </button>
                <button
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg transition-all duration-300 hover:bg-white z-30 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={handleNextImage}
                  style={{ pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-900" />
                </button>

                {/* Image Indicators */}
                <div
                  className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {variantImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Action Buttons */}
        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 transform z-30 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <button
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistToggle?.(product.id);
            }}
            title="Add to Wishlist"
            style={{ pointerEvents: isHovered ? "auto" : "none" }}
          >
            <Heart className="w-4 h-4 text-gray-900" />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShare?.(product.id);
            }}
            title="Share Product"
            style={{ pointerEvents: isHovered ? "auto" : "none" }}
          >
            <Share2 className="w-4 h-4 text-gray-900" />
          </button>
        </div>

        {/* Hover Information Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 transform z-20 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-white text-lg font-light mb-2 line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-white/90 text-sm font-light line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <div className="text-white text-lg font-light">{product.price}</div>
          </div>
        </div>
      </div>

      {/* Product Details - Hide completely on hover */}
      <div
        className={`p-4 transition-all duration-300 ${
          isHovered ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <div className="text-center">
          <h3 className="text-gray-900 text-base font-light mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center justify-center mb-3">
            {renderStars(product.rating)}
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-900 text-lg font-light">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through font-light">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Discover Button - Appears on Hover */}
      <div
        className={`absolute inset-x-4 bottom-4 transition-all duration-300 transform z-25 ${
          isHovered
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-4 invisible"
        }`}
      >
        <button
          className="w-full py-3 bg-black text-white text-sm font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          style={{ pointerEvents: isHovered ? "auto" : "none" }}
        >
          Discover
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
