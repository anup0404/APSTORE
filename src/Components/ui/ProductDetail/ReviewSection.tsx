import { forwardRef, useState } from "react";
import type { Review } from "../../../data/mydummy";
import { MoreVertical, Star, ThumbsDown, ThumbsUp, X } from "lucide-react";

interface ReviewsSectionProps {
  reviews?: Review[];
  productRating?: number;
  reviewCount?: number;
}

const ReviewsSection = forwardRef<HTMLDivElement, ReviewsSectionProps>(
  ({ reviews = [], productRating = 0, reviewCount = 0 }, ref) => {
    const [sortBy, setSortBy] = useState("helpful");
    const [filterRating, setFilterRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [newReviewTitle, setNewReviewTitle] = useState("");
    const [newReviewContent, setNewReviewContent] = useState("");

    // Generate rating distribution based on reviews or use mock data
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
      const count =
        reviews.filter((r) => r.rating === rating).length ||
        Math.floor(Math.random() * 50) + 10;
      const percentage =
        reviewCount > 0
          ? (count / reviewCount) * 100
          : Math.floor(Math.random() * 40) + 10;
      return {
        rating,
        count,
        percentage,
      };
    });

    // Filter and sort reviews
    const filteredReviews = reviews.filter(
      (review) => filterRating === 0 || review.rating === filterRating
    );

    const sortedReviews = [...filteredReviews].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
        default:
          return (b.helpful || 0) - (a.helpful || 0);
      }
    });

    const handleSubmitReview = () => {
      if (
        newReviewRating > 0 &&
        newReviewTitle.trim() &&
        newReviewContent.trim()
      ) {
        // In a real app, this would call an API
        console.log("Submitting review:", {
          rating: newReviewRating,
          title: newReviewTitle,
          content: newReviewContent,
        });

        // Reset form
        setNewReviewRating(0);
        setNewReviewTitle("");
        setNewReviewContent("");
        setShowReviewForm(false);
      }
    };

    return (
      <div ref={ref} className="space-y-6">
        {/* Reviews Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light">Customer Reviews</h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Review Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
              <span className="text-4xl font-light">
                {productRating.toFixed(1)}
              </span>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {reviewCount} reviews
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3 text-sm">
                <span className="w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 flex-wrap">
            <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
              Filter by rating:
            </span>
            <div className="flex flex-wrap gap-2">
              {[0, 5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base border rounded transition ${
                    filterRating === rating
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {rating === 0 ? "All" : `${rating}★`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {sortedReviews.length > 0 ? (
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {typeof review.date === "string"
                          ? review.date
                          : review.date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {review.content}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border flex-shrink-0"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful || 0})</span>
                  </button>
                  <button className="text-gray-600 hover:text-black transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-black transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No reviews yet</div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Be the first to review
            </button>
          </div>
        )}

        {/* Load More Reviews */}
        {sortedReviews.length > 0 && sortedReviews.length >= 5 && (
          <div className="text-center">
            <button className="border border-gray-300 px-6 py-2 text-sm font-medium hover:border-gray-500 transition-colors">
              Load More Reviews
            </button>
          </div>
        )}

        {/* Write Review Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white max-w-md w-full rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Write a Review</h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating *
                  </label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewReviewRating(i + 1)}
                        className="p-1 transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            i < newReviewRating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300 hover:text-yellow-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Summarize your review"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Review *
                  </label>
                  <textarea
                    rows={4}
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Tell others about your experience with this product"
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {newReviewContent.length}/500 characters
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowReviewForm(false);
                      setNewReviewRating(0);
                      setNewReviewTitle("");
                      setNewReviewContent("");
                    }}
                    className="flex-1 border border-gray-300 py-2 text-sm font-medium hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={
                      !newReviewRating ||
                      !newReviewTitle.trim() ||
                      !newReviewContent.trim()
                    }
                    className="flex-1 bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ReviewsSection.displayName = "ReviewsSection";
export default ReviewsSection;
