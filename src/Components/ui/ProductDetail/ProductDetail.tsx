import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Award, Camera, Check, Share2, X } from "lucide-react";
// import { useGetProductByIdQuery } from "../../../store/api/productApi";
import { useProductSelection } from "../../../hooks/useProductSelection";
import { resetSelection } from "../../../store/slice/productSlice";
import { sampleProducts } from "../../../data/productDetailsData";
import ProductGallery from "./components/ProductGallery";
import ProductBadge from "./components/ProductBadge";
import ProductRating from "./components/ProductRating";
import PriceDisplay from "./components/PriceDisplay";
import ColorSelector from "./components/ColorSelector";
import SizeSelector from "./components/SizeSelector";
import ActionButtons from "./components/ActionButtons";
import DeliveryChecker from "./components/DeliveryChecker";
import ProductFeatures from "./components/ProductFeatures";
import ProductTabs from "./components/ProductTabs";
import ReviewsSection from "./ReviewSection";
import RecommendationsCarousel from "./components/RecommendationsCarousel";
import {
  PRODUCT_DETAIL_CONTACT_INFO,
  TABS,
} from "../../../constants/global.constant";

interface ProductDetailsProps {
  productId: string;
  onVirtualTryOn: () => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToBag: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  onVirtualTryOn,
  isWishlisted,
  onWishlistToggle,
  onAddToBag,
}) => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState(
    sampleProducts.find((p) => p.id === productId) || sampleProducts[0]
  );
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Description");

  const {
    selectedVariant,
    quantity,
    pincode,
    colorsWithAvailability,
    sizesWithAvailability,
    handleColorSelect,
    handleSizeSelect,
    handleQuantityChange,
    handlePincodeChange,
    initializeVariant,
    getUniqueSizes,
  } = useProductSelection(product);

  useEffect(() => {
    if (product) {
      initializeVariant(product);
    }
  }, [product, initializeVariant]);

  useEffect(() => {
    return () => {
      dispatch(resetSelection());
    };
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const isInStock = (selectedVariant?.stock || 0) > 0;
  const isLowStock = (selectedVariant?.stock || 0) <= product.lowStockThreshold;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left Column - Product Gallery (sticky like Flipkart) */}
          <div className="lg:sticky lg:top-0 self-start">
            <ProductGallery
              videos={product.videos}
              has360View={product.has360View}
              productName={product.title}
              selectedVariant={selectedVariant}
            />
          </div>

          {/* Right Column - Product Info (scrolls naturally) */}
          <div className="bg-white lg:pr-6 flex flex-col">
            <div className="p-6 lg:p-12 flex-1">
              {/* Mobile Share Button */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Product Header */}
              <div className="mb-6 lg:mb-8">
                <div className="text-md text-gray-600 uppercase tracking-wide">
                  {product.brand}
                </div>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-light text-gray-900 mb-2 leading-tight">
                  {product.title}
                </h1>
                {product.description && (
                  <div className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </div>
                )}
                <div className="text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6">
                  Reference: L{product.id}1803GENDORI0404
                </div>
              </div>

              {/* Product Badges */}
              <ProductBadge
                badge={product.badge}
                isEcoFriendly={product.sustainability.isEcoFriendly}
                isLowStock={isLowStock}
                stockCount={selectedVariant?.stock}
              />

              {/* Product Rating */}
              <ProductRating
                rating={product.averageRating}
                reviewCount={product.reviewCount}
              />

              {/* Price Display */}
              <PriceDisplay
                price={selectedVariant?.price || 0}
                originalPrice={product.originalPrice}
                discount={selectedVariant?.discount}
              />

              {/* Loyalty Points */}
              {product.loyalty.pointsEarned && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>
                    Earn {product.loyalty.pointsEarned} loyalty points with this
                    purchase
                  </span>
                </div>
              )}

              {/* Color Selection */}
              <ColorSelector
                colors={colorsWithAvailability}
                selectedColor={selectedVariant?.color.name || null}
                onColorSelect={handleColorSelect}
              />

              {/* Size Selection */}
              <SizeSelector
                sizes={sizesWithAvailability}
                selectedSize={selectedVariant?.size || null}
                onSizeSelect={handleSizeSelect}
                disabled={!selectedVariant?.color}
                onShowSizeGuide={() => setShowSizeGuide(true)}
              />

              {/* Stock Status */}
              <div className="mb-6 lg:mb-8">
                {isInStock ? (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      In Stock
                    </div>
                    {isLowStock && (
                      <div className="text-sm text-orange-600">
                        Only {selectedVariant?.stock} left in stock
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-red-600">Out of Stock</div>
                )}
              </div>

              {/* Virtual Try-On Button */}
              {product.virtualTryOn && isInStock && (
                <div className="mb-6 lg:mb-8">
                  <button
                    onClick={onVirtualTryOn}
                    className="w-full bg-purple-600 text-white py-3 px-6 text-sm font-medium tracking-wider uppercase hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Try Virtual Try-On
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <ActionButtons
                inStock={isInStock}
                isWishlisted={isWishlisted}
                onAddToBag={onAddToBag}
                onWishlistToggle={onWishlistToggle}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                maxQuantity={selectedVariant?.stock || 0}
              />

              {/* Delivery Checker */}
              <DeliveryChecker
                pincode={pincode}
                onPincodeChange={handlePincodeChange}
              />

              {/* Product Features */}
              <ProductFeatures
                shipping={product.shipping}
                returns={product.returns}
                hasGiftWrapping={product.giftWrapping}
                hasPersonalization={product.personalizable}
                hasVirtualTryOn={product.virtualTryOn}
                className="mb-8 lg:mb-10"
              />

              {/* Product Tabs */}
              <ProductTabs
                activeTab={activeTab}
                onTabChange={(tab: string) => setActiveTab(tab)}
                product={product}
                tabs={TABS}
                contactInfo={PRODUCT_DETAIL_CONTACT_INFO}
              />
            </div>
          </div>
        </div>

        {/* Luxury Divider Section */}
        <div className="relative py-8 lg:py-10">
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-8">
                <div className="h-px w-16 lg:w-24 bg-gradient-to-r from-transparent to-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rotate-45"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rotate-45"></div>
                </div>
                <div className="h-px w-16 lg:w-24 bg-gradient-to-l from-transparent to-gray-300"></div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 uppercase tracking-[0.15em]">
                Reviews & Recommendations
              </h2>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-6 lg:px-12 py-16 space-y-16">
          <ReviewsSection
            reviews={product?.reviews}
            productRating={product?.averageRating}
            reviewCount={product?.reviewCount}
          />
        </div>

        {/* Recommendations Section */}
        <div className="px-6 lg:px-12 py-16 space-y-16">
          <RecommendationsCarousel
            title="You May Also Like"
            productId={productId}
          />
          <RecommendationsCarousel
            title="Frequently Bought Together"
            productId={productId}
            maxProducts={3}
          />
          <RecommendationsCarousel
            title="Recently Viewed"
            productId={productId}
            maxProducts={4}
          />
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white max-w-2xl w-full mx-4 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Size Guide</h2>
                <button onClick={() => setShowSizeGuide(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Measurements</th>
                        <th className="text-left py-2">Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUniqueSizes()?.map((size) => (
                        <tr key={size} className="border-b">
                          <td className="py-2 font-medium">{size}</td>
                          <td className="py-2 text-gray-600">--</td>
                          <td className="py-2 text-gray-600">Regular</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProductDetails.displayName = "ProductDetails";
export default ProductDetails;
