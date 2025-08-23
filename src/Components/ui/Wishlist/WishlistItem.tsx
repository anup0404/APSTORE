import { forwardRef, useCallback, useState } from "react";
import type { WishlistItem } from "./wishlist.types";
import { Share2, ShoppingBag, X } from "lucide-react";
import ShareButton from "../../Button/ShareButton";
import RemoveButton from "../../Button/RemoveButton";

interface WishlistItemProps {
  item: WishlistItem;
  onAddToBag: (id: string) => void;
  index: number;
}

const WishlistItem = forwardRef<HTMLDivElement, WishlistItemProps>(
  ({ item, onAddToBag, index }, ref) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setImageError(true);
      setImageLoaded(true);
    }, []);

    // Large featured layout for first item
    if (index === 0) {
      return (
        <div
          ref={ref}
          className="col-span-full mb-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hero Image */}
          <div className="relative aspect-[16/10] mb-12 overflow-hidden bg-gray-50">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-100" />}

            {!imageError ? (
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                } ${isHovered ? "scale-105" : "scale-100"}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 border border-black flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-light uppercase tracking-[0.2em]">
                    Image Unavailable
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className={`absolute top-8 right-8 flex flex-col gap-4 transition-all duration-500 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              <ShareButton id={item.id} />
              <RemoveButton itemId={item.id} />
              {/* <button
                onClick={() => onShare(item.id)}
                className="w-12 h-12 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Share item"
              >
                <Share2 className="w-4 h-4" />
              </button> */}
              {/* <button
                onClick={() => onRemove(item.id)}
                className="w-12 h-12 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Remove from wishlist"
              >
                <X className="w-4 h-4" />
              </button>*/}
            </div>

            {/* Badges */}
            {(item.isNew || item.isExclusive) && (
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {item.isNew && (
                  <div className="bg-black text-white px-6 py-2 font-light text-xs tracking-[0.3em] uppercase">
                    New
                  </div>
                )}
                {item.isExclusive && (
                  <div className="bg-white border border-black text-black px-6 py-2 font-light text-xs tracking-[0.3em] uppercase">
                    Exclusive
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center">
            {item.collection && (
              <p className="text-xs font-light tracking-[0.4em] uppercase text-gray-600 mb-4">
                {item.collection}
              </p>
            )}

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 tracking-[0.1em] leading-tight">
              {item.name}
            </h2>

            {item.description && (
              <p className="text-lg font-light text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="flex items-center justify-center gap-12 mb-12">
              <div className="text-center">
                <p className="text-3xl font-light text-black mb-2">
                  ${item.price.toLocaleString()}
                </p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-lg font-light text-gray-500 line-through">
                    ${item.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => onAddToBag(item.id)}
              className="border border-black px-16 py-4 bg-white text-black font-light tracking-[0.3em] text-sm uppercase hover:bg-black hover:text-white transition-all duration-500"
            >
              Add to Bag
            </button>
          </div>
        </div>
      );
    }

    // Standard grid layout for other items
    return (
      <div
        ref={ref}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-gray-50">
          {!imageLoaded && <div className="absolute inset-0 bg-gray-100" />}

          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isHovered ? "scale-105" : "scale-100"}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 border border-black flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-xs font-light uppercase tracking-[0.2em]">
                  Image Unavailable
                </p>
              </div>
            </div>
          )}

          {/* Overlay Actions */}
          <div
            className={`absolute inset-0 bg-black transition-all duration-500 flex items-center justify-center gap-4 ${
              isHovered ? "bg-opacity-20" : "bg-opacity-0 pointer-events-none"
            }`}
          >
            {/* <button
              onClick={() => onShare(item.id)}
              className={`w-10 h-10 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              aria-label="Share item"
            >
              <Share2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className={`w-10 h-10 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              aria-label="Remove from wishlist"
            >
              <X className="w-3 h-3" />
            </button> */}

            <ShareButton id={item.id} />
            <RemoveButton itemId={item.id} />
          </div>

          {/* Badges */}
          {(item.isNew || item.isExclusive) && (
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              {item.isNew && (
                <div className="bg-black text-white px-3 py-1 font-light text-xs tracking-[0.2em] uppercase">
                  New
                </div>
              )}
              {item.isExclusive && (
                <div className="bg-white border border-black text-black px-3 py-1 font-light text-xs tracking-[0.2em] uppercase">
                  Exclusive
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="text-center">
          {item.collection && (
            <p className="text-xs font-light tracking-[0.3em] uppercase text-gray-600 mb-2">
              {item.collection}
            </p>
          )}

          <h3 className="text-lg font-light text-black mb-4 tracking-[0.1em] leading-tight">
            {item.name}
          </h3>

          <div className="mb-6">
            <p className="text-xl font-light text-black">
              ${item.price.toLocaleString()}
            </p>
            {item.originalPrice && item.originalPrice > item.price && (
              <p className="text-sm font-light text-gray-500 line-through mt-1">
                ${item.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={() => onAddToBag(item.id)}
            className="border border-black px-8 py-3 bg-white text-black font-light tracking-[0.2em] text-xs uppercase hover:bg-black hover:text-white transition-all duration-500"
          >
            Add to Bag
          </button>
        </div>
      </div>
    );
  }
);

WishlistItem.displayName = "WishlistItem";
export default WishlistItem;
