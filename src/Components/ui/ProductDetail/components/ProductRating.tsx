import React from "react";
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  showWriteReview?: boolean;
  onWriteReview?: () => void;
  onReadReviews?: () => void;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewCount,
  showWriteReview = true,
  onWriteReview,
  onReadReviews,
}) => {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>

        <div className="flex gap-4">
          {onReadReviews && (
            <button
              onClick={onReadReviews}
              className="text-sm text-black hover:underline"
            >
              Read Reviews
            </button>
          )}

          {showWriteReview && onWriteReview && (
            <button
              onClick={onWriteReview}
              className="text-sm text-black hover:underline"
            >
              Write a Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
ProductRating.displayName = "ProductRating";
export default ProductRating;
