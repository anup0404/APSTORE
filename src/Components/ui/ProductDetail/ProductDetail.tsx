import React, { useState, useImperativeHandle } from "react";
import {
  Heart,
  Share2,
  Star,
  ChevronRight,
  ChevronLeft,
  // Truck,
  // RotateCcw,
  // Tag,
  Check,
  // Plus,
  // Minus,
  // Clock,
  // User,
} from "lucide-react";

// ✅ Define tabs once
const TABS = ["details", "specifications", "reviews"] as const;

// ✅ Define a proper Product type (simplified, can be extended later)
interface Product {
  id: string;
  title: string;
  description?: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  rating?: number;
  reviewsCount?: number;
  colors: { name: string; value: string }[];
  sizes: string[];
}

// ✅ Define ref type exposed by useImperativeHandle
export interface ProductDetailsRef {
  getSelectedVariant: () => {
    color: { name: string; value: string } | [];
    size: string | null;
    quantity: number;
  };
}

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = React.forwardRef<
  ProductDetailsRef,
  ProductDetailsProps
>(({ product }, ref) => {
  const [variant, setVariant] = useState({
    selectedImage: 0,
    selectedColor: 0,
    selectedSize: product.sizes?.[0] || null,
    quantity: 1,
  });

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("details");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // ✅ Expose custom methods via ref
  useImperativeHandle(ref, () => ({
    getSelectedVariant: () => ({
      color: product.colors?.[variant.selectedColor],
      size: variant.selectedSize,
      quantity: variant.quantity,
    }),
  }));

  const nextImage = () =>
    setVariant((prev) => ({
      ...prev,
      selectedImage: (prev.selectedImage + 1) % product.images.length,
    }));

  const prevImage = () =>
    setVariant((prev) => ({
      ...prev,
      selectedImage:
        (prev.selectedImage - 1 + product.images.length) %
        product.images.length,
    }));

  return (
    <div className="bg-white min-h-screen">
      {/* ==== Product Layout ==== */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ==== Image Section ==== */}
          <div className="space-y-4 w-full max-w-full overflow-hidden">
            <div
              className="relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 w-full max-w-full"
              style={{ aspectRatio: "1/1", minHeight: "min(400px, 90vw)" }}
            >
              {product.images?.length ? (
                <img
                  src={product.images[variant.selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover max-w-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  No Image Available
                </div>
              )}

              {/* Navigation Arrows */}
              {product.images?.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Counter */}
              {product.images?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {variant.selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setVariant((prev) => ({ ...prev, selectedImage: idx }))
                    }
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
                      variant.selectedImage === idx
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==== Info Section ==== */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 text-sm font-medium uppercase">
                {product.brand}
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-blue-600 cursor-pointer">
                ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="line-through text-gray-500">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.discount && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">
                  Color: {product.colors[variant.selectedColor]?.name}
                </h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setVariant((prev) => ({
                          ...prev,
                          selectedColor: idx,
                        }))
                      }
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{ backgroundColor: color.value }}
                    >
                      {variant.selectedColor === idx && (
                        <Check className="text-white w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">
                  Size: {variant.selectedSize}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes?.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setVariant((prev) => ({ ...prev, selectedSize: size }))
                      }
                      className={`px-4 py-2 border rounded ${
                        variant.selectedSize === size
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist + Share buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setIsWishlisted((prev) => !prev)}
                className="flex items-center gap-2 text-red-600 border px-4 py-2 rounded-lg"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-600" : "fill-none"
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <button className="flex items-center gap-2 text-blue-600 border px-4 py-2 rounded-lg">
                <Share2 className="h-5 w-5" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Tabs Section ==== */}
      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex border-b overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-gray-900 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 bg-white">
          {activeTab === "details" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Product Details</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
          {activeTab === "specifications" && <div>Specifications go here</div>}
          {activeTab === "reviews" && <div>Reviews go here</div>}
        </div>
      </div>
    </div>
  );
});

ProductDetails.displayName = "ProductDetails";
export default ProductDetails;
