import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Heart,
  Share2,
  Star,
  ChevronDown,
  Check,
  ShoppingBag,
  MapPin,
  ThumbsUp,
  Shield,
} from "lucide-react";
// import { mockProductDetails } from "../../../constants/product";
import {
  PRODUCT_DETAIL_CONTACT_INFO,
  TABS,
} from "../../../constants/global.constant";
import { useGetProductByIdQuery } from "../../../store/api/productApi";

interface ProductDetailsProps {
  productId: string;
}

interface ProductDetailsRef {
  getSelectedVariant: () => {
    color: unknown;
    size: string;
    quantity: number;
  };
}

const ProductDetails = React.forwardRef<ProductDetailsRef, ProductDetailsProps>(
  ({ productId }, ref) => {
    // const [product] = useState(mockProductDetails);
    const [loading] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [activeTab, setActiveTab] =
      useState<(typeof TABS)[number]>("Description");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [pincode, setPincode] = useState("");

    const { data: product } = useGetProductByIdQuery(productId);

    useEffect(() => {
      if (product && product.variants?.[0]) {
        setSelectedSize(product.variants[0].size || "");
      }
    }, [product]);

    useImperativeHandle(ref, () => ({
      getSelectedVariant: () => ({
        color: product?.variants?.[selectedColor]?.color,
        size: selectedSize,
        quantity: 1,
      }),
    }));

    const uniqueColors =
      product && product.variants
        ? product.variants.reduce((acc, variant) => {
            if (
              variant.color &&
              !acc.some((c) => c.value === variant.color?.value)
            ) {
              acc.push(variant.color);
            }
            return acc;
          }, [] as Array<{ name: string; value: string }>)
        : [];

    const uniqueSizes =
      product && product.variants
        ? [...new Set(product.variants.map((v) => v.size).filter(Boolean))]
        : [];

    if (loading) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto pt-12">
          <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
            {/* Mobile Images - Above content on small screens */}
            <div className="lg:hidden bg-gray-50">
              <div className="overflow-x-auto">
                <div className="flex gap-0">
                  {product?.images?.map((image, index) => (
                    <div
                      key={image.id}
                      className="flex-shrink-0 w-screen h-96 flex items-center justify-center p-4"
                    >
                      <img
                        src={image.url}
                        alt={`${product?.title ?? ""} - View ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image indicators for mobile */}
              <div className="flex justify-center gap-2 py-4 bg-gray-50">
                {product?.images?.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </div>

            {/* Desktop Images - Left side sticky for large screens */}
            <div className="hidden lg:block relative bg-gray-50">
              <div
                className="sticky top-0 h-screen overflow-y-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="space-y-0">
                  {product?.images?.map((image, index) => (
                    <div
                      key={image.id}
                      className="w-full h-screen flex items-center justify-center p-8"
                    >
                      <img
                        src={image.url}
                        alt={`${product?.title} - View ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Share Button - Desktop only */}
              <button className="fixed top-24 left-8 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Product Info */}
            <div className="bg-white">
              <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto p-6 lg:p-12">
                {/* Mobile Share Button */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                  <div></div>
                  <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                {/* Product Header */}
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-xl lg:text-2xl xl:text-3xl font-light text-gray-900 mb-2 leading-tight">
                    {product?.title}
                  </h1>
                  <div className="text-sm text-gray-600 mb-4">
                    {product?.description}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6">
                    Reference: L{product?.id}1803NUYA0404
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 lg:mb-8">
                  <div className="flex items-baseline gap-3 lg:gap-4 mb-2">
                    <span className="text-xl lg:text-2xl font-light text-gray-900">
                      ₹
                      {typeof product?.price === "number"
                        ? product.price.toLocaleString()
                        : product?.price}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-base lg:text-lg text-gray-500 line-through">
                        ₹{product?.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {product?.offers?.discount && (
                    <span className="text-sm text-green-700 font-medium">
                      {product.offers.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Colors */}
                {uniqueColors && uniqueColors.length > 0 && (
                  <div className="mb-6 lg:mb-8">
                    <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4 tracking-wider uppercase">
                      More Colors: {uniqueColors[selectedColor]?.name}
                    </h3>
                    <div className="flex gap-2 lg:gap-3">
                      {uniqueColors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all ${
                            selectedColor === idx
                              ? "border-gray-900 scale-110"
                              : "border-gray-300 hover:border-gray-500"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {uniqueSizes && uniqueSizes.length > 0 && (
                  <div className="mb-6 lg:mb-8">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-xs lg:text-sm font-medium text-gray-900 tracking-wider uppercase">
                        Size: {selectedSize || "Select Size"}
                      </h3>
                      <button
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-xs text-gray-600 hover:text-gray-900 underline transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {uniqueSizes.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(size || "")}
                          className={`py-2 lg:py-3 px-3 lg:px-4 border text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-300 text-gray-900 hover:border-gray-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="mb-6 lg:mb-8">
                  {product?.variants?.find((v) => v.size === selectedSize)
                    ?.stock ? (
                    <div className="flex items-center text-sm text-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      In Stock
                    </div>
                  ) : (
                    <div className="text-sm text-red-600">Out of Stock</div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
                  <button className="w-full bg-gray-900 text-white py-3 lg:py-4 px-6 lg:px-8 text-sm font-medium tracking-wider uppercase hover:bg-gray-800 transition-colors">
                    <ShoppingBag className="w-4 h-4 inline mr-2" />
                    Add to Bag
                  </button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-full py-3 lg:py-4 px-6 lg:px-8 border text-sm font-medium tracking-wider uppercase transition-colors ${
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
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                {/* Delivery Check */}
                <div className="mb-8 lg:mb-10 border-t border-gray-100 pt-6 lg:pt-8">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4 tracking-wider uppercase">
                    Check Delivery & Services
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <button className="bg-gray-900 text-white px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                      Check
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-100">
                  {TABS.map((tab) => (
                    <div
                      key={tab}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        onClick={() =>
                          setActiveTab(activeTab === tab ? "Description" : tab)
                        }
                        className="w-full py-5 lg:py-6 text-left flex items-center justify-between text-xs lg:text-sm font-medium text-gray-900 tracking-wider uppercase hover:bg-gray-50 px-0 transition-colors"
                      >
                        <span>{tab}</span>
                        <ChevronDown
                          className={`w-4 h-4 transform transition-transform ${
                            activeTab === tab ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeTab === tab && (
                        <div className="pb-5 lg:pb-6 text-sm text-gray-700 leading-relaxed">
                          {tab === "Description" && (
                            <div className="space-y-4">
                              <p>{product?.description}</p>
                              {product?.features && (
                                <div className="space-y-2">
                                  <h4 className="font-medium text-gray-900">
                                    Features:
                                  </h4>
                                  {Object.entries(product?.features).map(
                                    ([key, value]) => (
                                      <div key={key} className="flex">
                                        <span className="font-medium min-w-32">
                                          {key}:
                                        </span>
                                        <span className="text-gray-600">
                                          {value}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {tab === "Size & Fit" && (
                            <div className="space-y-4">
                              {product?.specifications && (
                                <div className="space-y-2">
                                  {Object.entries(product?.specifications).map(
                                    ([key, value]) => (
                                      <div key={key} className="flex">
                                        <span className="font-medium min-w-32">
                                          {key}:
                                        </span>
                                        <span className="text-gray-600">
                                          {value}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {tab === "Reviews & Ratings" && (
                            <div className="space-y-6">
                              {/* Rating Summary */}
                              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                          i <
                                          Math.floor(
                                            product?.averageRating || 0
                                          )
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-lg font-medium text-gray-900">
                                    {product?.averageRating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-600">
                                  Based on {product?.reviewsCount} reviews
                                </span>
                              </div>

                              {/* Individual Reviews */}
                              <div className="space-y-8">
                                {product?.reviews?.map((review) => (
                                  <div key={review.id} className="space-y-4">
                                    {/* Review Header */}
                                    <div className="flex items-start justify-between">
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                          <span className="font-medium text-gray-900">
                                            {review.reviewerName}
                                          </span>
                                          {review.verified && (
                                            <div className="flex items-center gap-1 text-green-600">
                                              <Shield className="w-3 h-3" />
                                              <span className="text-xs">
                                                Verified Purchase
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <div className="flex">
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
                                          <span className="text-xs text-gray-500">
                                            {review.reviewDate?.toLocaleDateString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Review Content */}
                                    <p className="text-gray-700 leading-relaxed">
                                      {review.comment}
                                    </p>

                                    {/* Review Images */}
                                    {review.images &&
                                      review.images.length > 0 && (
                                        <div className="flex gap-3 overflow-x-auto">
                                          {review.images.map(
                                            (imageUrl, idx) => (
                                              <div
                                                key={idx}
                                                className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
                                              >
                                                <img
                                                  src={imageUrl}
                                                  alt={`Review image ${
                                                    idx + 1
                                                  }`}
                                                  className="w-full h-full object-cover"
                                                />
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}

                                    {/* Review Actions */}
                                    <div className="flex items-center gap-4 pt-2">
                                      <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 transition-colors">
                                        <ThumbsUp className="w-3 h-3" />
                                        {/* Helpful ({review?.helpful}) */}
                                        <span className="text-xs text-gray-600">
                                          Helpful (0)
                                        </span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* View All Reviews Button */}
                              <div className="pt-6 border-t border-gray-100">
                                <button className="w-full py-3 px-6 border border-gray-300 text-sm font-medium text-gray-900 tracking-wider uppercase hover:bg-gray-50 transition-colors">
                                  View All {product?.reviewsCount} Reviews
                                </button>
                              </div>
                            </div>
                          )}

                          {tab === "Contact & In-Store Availability" && (
                            <div className="space-y-4">
                              <p>{PRODUCT_DETAIL_CONTACT_INFO.message}</p>
                              <div className="space-y-2">
                                <p>
                                  <strong>Phone:</strong>{" "}
                                  {PRODUCT_DETAIL_CONTACT_INFO.phone}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {PRODUCT_DETAIL_CONTACT_INFO.email}
                                </p>
                                <p>
                                  <strong>Store Hours:</strong>{" "}
                                  {PRODUCT_DETAIL_CONTACT_INFO.storeHours}
                                </p>
                              </div>

                              {product?.deliveryInfo && (
                                <div className="space-y-2">
                                  <h4 className="font-medium text-gray-900">
                                    Delivery Information:
                                  </h4>
                                  <p>
                                    •{" "}
                                    {product?.deliveryInfo?.free
                                      ? "Free delivery"
                                      : "Paid delivery"}
                                  </p>
                                  {product?.deliveryInfo?.express && (
                                    <p>• {product?.deliveryInfo?.express}</p>
                                  )}
                                  {product?.returnPolicy && (
                                    <p>• {product?.returnPolicy}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Styles for Scrollbar */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .sticky > div::-webkit-scrollbar {
              display: none;
            }
          `,
          }}
        />
      </div>
    );
  }
);

ProductDetails.displayName = "ProductDetails";
export default ProductDetails;
