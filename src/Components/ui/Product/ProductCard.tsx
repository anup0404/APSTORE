import React from "react";
import { Heart, Share2, Star, StarOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProductCardProps } from "./ProductCard.type";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) =>
    index < rating ? (
      <Star
        key={index}
        className="w-4 h-4 text-yellow-400"
        fill="currentColor"
      />
    ) : (
      <StarOff key={index} className="w-4 h-4 text-gray-300" />
    )
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  onShare,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative w-full h-56 sm:h-64 lg:h-72 bg-gray-100 flex items-center justify-center rounded-lg border overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle?.(product.id);
            }}
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onShare?.(product.id);
            }}
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Badge */}
      {(product.isNew || product.isOnSale) && (
        <div className="absolute left-3 top-3">
          <p
            className={`px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase rounded-full ${
              product.isNew
                ? "bg-white text-gray-900"
                : "bg-gray-900 text-white"
            }`}
          >
            {product.isNew ? "New" : "Sale"}
          </p>
        </div>
      )}

      {/* Details */}
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div>
          <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center mt-2 space-x-0.5">
            {renderStars(product.rating)}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
            {product.price}
          </p>
          {product.oldPrice && (
            <del className="mt-0.5 text-xs sm:text-sm font-bold text-gray-500">
              {product.oldPrice}
            </del>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
