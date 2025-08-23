import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";

import {
  Heart,
  X,
  ShoppingBag,
  Plus,
  Minus,
  Tag,
  CreditCard,
  Shield,
  Truck,
  ArrowRight,
  Gift,
  // Percent,
  Lock,
  CheckCircle,
} from "lucide-react";

// // Error handler function
// const handleError = (error: Error, errorInfo: { componentStack: string }) => {
//   console.error("Shopping Bag Error:", error, errorInfo);
// };

// TypeScript Interfaces
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  inStock: boolean;
  maxQuantity: number;
  category: string;
  collection?: string;
  isLimited?: boolean;
  isNew?: boolean;
}

interface CartSummary {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  savings: number;
  tax: number;
}

interface ShoppingBagRef {
  getTotalItems: () => number;
  getTotalAmount: () => number;
  clearCart: () => void;
  getCartItems: () => CartItem[];
}

interface ShoppingBagProps {
  initialItems?: CartItem[];
  onItemUpdate?: (item: CartItem) => void;
  onItemRemove?: (itemId: string) => void;
  onCheckout?: (items: CartItem[], summary: CartSummary) => void;
  onMoveToWishlist?: (itemId: string) => void;
}

// Sample luxury items data
const dummyItems: CartItem[] = [
  {
    id: "1",
    name: "Lady Dior Medium Bag",
    description: "Crafted in black lambskin with Cannage stitching",
    price: 5200,
    originalPrice: 5200,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
    size: "Medium",
    color: "Black",
    inStock: true,
    maxQuantity: 2,
    category: "Handbags",
    collection: "Dior Icons",
    isNew: true,
  },
  {
    id: "2",
    name: "J'adore Eau de Parfum",
    description: "Luminous and sensual fragrance",
    price: 150,
    originalPrice: 180,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop&crop=center",
    size: "100ml",
    inStock: true,
    maxQuantity: 5,
    category: "Fragrance",
    collection: "Les Parfums",
    isLimited: true,
  },
  {
    id: "3",
    name: "Dior Oblique Silk Scarf",
    description: "Iconic motif in elegant navy and gold",
    price: 420,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop&crop=center",
    inStock: true,
    maxQuantity: 3,
    category: "Accessories",
    collection: "Dior Oblique",
  },
];

// Individual Cart Item Component
const CartItemComponent = forwardRef<
  HTMLDivElement,
  {
    item: CartItem;
    onQuantityUpdate: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onMoveToWishlist: (id: string) => void;
  }
>(({ item, onQuantityUpdate, onRemove, onMoveToWishlist }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      className="bg-white border-b border-gray-100 py-8 first:pt-0 last:border-b-0"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-32 h-40 bg-gray-50 overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}

            {!imageError ? (
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
            )}

            {/* Stock Status Overlay */}
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-xs font-light tracking-[0.2em] uppercase bg-black bg-opacity-75 px-2 py-1">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {item.isNew && (
                <div className="bg-black text-white px-2 py-1 text-xs font-light tracking-[0.2em] uppercase">
                  New
                </div>
              )}
              {item.isLimited && (
                <div className="bg-white border border-black text-black px-2 py-1 text-xs font-light tracking-[0.2em] uppercase">
                  Limited
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex-1">
              {/* Collection & Category */}
              <div className="flex items-center gap-4 mb-2">
                {item.collection && (
                  <p className="text-xs font-light tracking-[0.3em] uppercase text-gray-600">
                    {item.collection}
                  </p>
                )}
                <span className="text-xs font-light tracking-[0.2em] uppercase text-gray-500 border-l pl-4">
                  {item.category}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-xl font-light text-black mb-2 tracking-[0.05em]">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-sm font-light text-gray-600 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Attributes */}
              <div className="flex items-center gap-4 text-xs font-light text-gray-600 mb-6">
                {item.size && (
                  <span className="border-b border-gray-200 pb-1">
                    Size: <span className="text-black">{item.size}</span>
                  </span>
                )}
                {item.color && (
                  <span className="border-b border-gray-200 pb-1">
                    Color: <span className="text-black">{item.color}</span>
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-light tracking-[0.2em] uppercase text-gray-600">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        onQuantityUpdate(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1 || !item.inStock}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-light border-l border-r border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onQuantityUpdate(item.id, item.quantity + 1)
                      }
                      disabled={
                        item.quantity >= item.maxQuantity || !item.inStock
                      }
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Max Quantity Info */}
                <span className="text-xs font-light text-gray-500">
                  Max: {item.maxQuantity}
                </span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="text-center md:text-right">
              {/* Price */}
              <div className="mb-4">
                <p className="text-2xl font-light text-black">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-sm font-light text-gray-500 line-through mt-1">
                    ${(item.originalPrice * item.quantity).toLocaleString()}
                  </p>
                )}
                <p className="text-xs font-light text-gray-600 mt-2">
                  ${item.price.toLocaleString()} each
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-center md:justify-end gap-3">
                <button
                  onClick={() => onMoveToWishlist(item.id)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-gray-400 hover:text-gray-600 transition-all duration-300 group"
                  aria-label="Move to wishlist"
                  title="Move to Wishlist"
                >
                  <Heart className="w-4 h-4 group-hover:fill-current" />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-all duration-300"
                  aria-label="Remove item"
                  title="Remove Item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItemComponent.displayName = "CartItemComponent";

// // Coupon Component
// const CouponComponent = forwardRef<
//   HTMLDivElement,
//   {
//     appliedCoupon: string;
//     onApplyCoupon: (code: string) => void;
//     onRemoveCoupon: () => void;
//     isLoading: boolean;
//   }
// >(({ appliedCoupon, onApplyCoupon, onRemoveCoupon, isLoading }, ref) => {
//   const [couponCode, setCouponCode] = useState("");
//   const [showInput, setShowInput] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (couponCode.trim()) {
//       onApplyCoupon(couponCode.trim());
//     }
//   };

//   return (
//     <div ref={ref} className="bg-white border border-gray-200 mb-8">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-light text-black tracking-[0.1em] uppercase flex items-center">
//             <Tag className="w-5 h-5 mr-3 text-gray-400" />
//             Promotional Code
//           </h3>
//           {appliedCoupon && (
//             <button
//               onClick={onRemoveCoupon}
//               className="text-gray-400 hover:text-red-500 transition-colors"
//               aria-label="Remove coupon"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           )}
//         </div>

//         {appliedCoupon ? (
//           <div className="border border-green-200 bg-green-50 p-4 flex items-center gap-3">
//             <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//             <div>
//               <p className="text-sm font-light text-green-800">
//                 Code <span className="font-medium">"{appliedCoupon}"</span>{" "}
//                 applied successfully
//               </p>
//               <p className="text-xs font-light text-green-700 mt-1">
//                 10% discount has been applied to your order
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {!showInput ? (
//               <button
//                 onClick={() => setShowInput(true)}
//                 className="w-full text-left text-sm font-light text-gray-600 hover:text-black transition-colors py-2 border-b border-gray-200 hover:border-black"
//               >
//                 Do you have a promotional code?
//               </button>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Enter promotional code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                   className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-sm font-light focus:outline-none focus:border-black transition-colors placeholder-gray-400"
//                   disabled={isLoading}
//                 />
//                 <div className="flex gap-4">
//                   <button
//                     type="submit"
//                     disabled={!couponCode.trim() || isLoading}
//                     className="flex-1 border border-black px-6 py-3 bg-white text-black font-light tracking-[0.2em] text-sm uppercase hover:bg-black hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isLoading ? "Applying..." : "Apply"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowInput(false);
//                       setCouponCode("");
//                     }}
//                     className="px-6 py-3 text-sm font-light text-gray-600 hover:text-black transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 <p className="text-xs font-light text-gray-500">
//                   Try: SAVE10, WELCOME, LUXURY15
//                 </p>
//               </form>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// CouponComponent.displayName = "CouponComponent";

const CouponComponent = forwardRef<
  HTMLDivElement,
  {
    appliedCoupon: string;
    onApplyCoupon: (code: string) => void;
    onRemoveCoupon: () => void;
    isLoading: boolean;
  }
>(({ appliedCoupon, onApplyCoupon, onRemoveCoupon, isLoading }, ref) => {
  const [couponCode, setCouponCode] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Available coupons with descriptions
  const availableCoupons = [
    { code: "SAVE10", description: "10% off your order" },
    { code: "WELCOME", description: "15% off for new customers" },
    { code: "LUXURY15", description: "15% off luxury items" },
    { code: "FREESHIP", description: "Free shipping on orders" },
  ];

  const handleSubmit = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
    }
  };

  const handleCouponClick = (code: string) => {
    onApplyCoupon(code);
  };

  return (
    <div ref={ref} className="bg-white border border-gray-200 mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light text-black tracking-[0.1em] uppercase flex items-center">
            <Tag className="w-5 h-5 mr-3 text-gray-400" />
            Promotional Code
          </h3>
          {appliedCoupon && (
            <button
              onClick={onRemoveCoupon}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {appliedCoupon ? (
          <div className="border border-green-200 bg-green-50 p-4 flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-light text-green-800">
                Code <span className="font-medium">"{appliedCoupon}"</span>{" "}
                applied successfully
              </p>
              <p className="text-xs font-light text-green-700 mt-1">
                10% discount has been applied to your order
              </p>
            </div>
          </div>
        ) : (
          <div>
            {!showInput ? (
              <div className="space-y-4">
                {/* Main toggle button */}
                <button
                  onClick={() => setShowInput(true)}
                  className="w-full text-left text-sm font-light text-gray-600 hover:text-black transition-colors py-2 border-b border-gray-200 hover:border-black"
                >
                  Do you have a promotional code?
                </button>

                {/* Clickable coupon list */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-3">
                    💡 Click to apply available codes:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {availableCoupons.map((coupon) => (
                      <button
                        key={coupon.code}
                        onClick={() => handleCouponClick(coupon.code)}
                        disabled={isLoading}
                        className="w-full text-left p-3 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-black group-hover:text-black">
                              {coupon.code}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {coupon.description}
                            </p>
                          </div>
                          <div className="text-xs text-gray-400 group-hover:text-black transition-colors">
                            Click to apply →
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter promotional code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-transparent text-sm font-light focus:outline-none focus:border-black transition-colors placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!couponCode.trim() || isLoading}
                    className="flex-1 border border-black px-6 py-3 bg-white text-black font-light tracking-[0.2em] text-sm uppercase hover:bg-black hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Applying..." : "Apply"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInput(false);
                      setCouponCode("");
                    }}
                    className="px-6 py-3 text-sm font-light text-gray-600 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Quick select codes - also clickable */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-light text-gray-500 mb-2">
                    Or click to select:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <button
                        key={coupon.code}
                        type="button"
                        onClick={() => setCouponCode(coupon.code)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
                      >
                        {coupon.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

CouponComponent.displayName = "CouponComponent";

// Main Shopping Bag Component
const LuxuryShoppingBag = forwardRef<ShoppingBagRef, ShoppingBagProps>(
  (
    {
      initialItems = dummyItems,
      onItemUpdate,
      onItemRemove,
      onCheckout,
      onMoveToWishlist,
    },
    ref
  ) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
    const [appliedCoupon, setAppliedCoupon] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Calculate order summary
    const calculateSummary = useCallback((): CartSummary => {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const originalTotal = cartItems.reduce(
        (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
        0
      );
      const savings = originalTotal - subtotal;

      // Shipping: Free over $100
      const delivery = subtotal > 100 ? 0 : 25;

      // Coupon discount
      const couponDiscount = appliedCoupon ? subtotal * 0.1 : 0;

      // Tax calculation
      const taxableAmount = subtotal - couponDiscount;
      const tax = taxableAmount * 0.08; // 8% tax

      const total = subtotal + delivery + tax - couponDiscount;

      return {
        subtotal,
        delivery,
        discount: couponDiscount,
        tax,
        total,
        savings,
      };
    }, [cartItems, appliedCoupon]);

    const summary = calculateSummary();

    // Update item quantity
    const updateQuantity = useCallback(
      (itemId: string, newQuantity: number) => {
        setCartItems((prevItems) =>
          prevItems.map((item) => {
            if (item.id === itemId) {
              const quantity = Math.max(
                1,
                Math.min(newQuantity, item.maxQuantity)
              );
              const updatedItem = { ...item, quantity };
              onItemUpdate?.(updatedItem);
              return updatedItem;
            }
            return item;
          })
        );
      },
      [onItemUpdate]
    );

    // Remove item from cart
    const removeItem = useCallback(
      (itemId: string) => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        onItemRemove?.(itemId);
      },
      [onItemRemove]
    );

    // Move item to wishlist
    const moveToWishlist = useCallback(
      (itemId: string) => {
        onMoveToWishlist?.(itemId);
        removeItem(itemId);
      },
      [onMoveToWishlist, removeItem]
    );

    // Apply coupon
    const applyCoupon = useCallback((code: string) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const validCoupons = ["SAVE10", "WELCOME", "LUXURY15"];
        if (validCoupons.includes(code.toUpperCase())) {
          setAppliedCoupon(code.toUpperCase());
        } else {
          alert(
            "Invalid promotional code. Please try: SAVE10, WELCOME, or LUXURY15"
          );
        }
        setIsLoading(false);
      }, 1000);
    }, []);

    // Remove coupon
    const removeCoupon = useCallback(() => {
      setAppliedCoupon("");
    }, []);

    // Handle checkout
    const handleCheckout = useCallback(() => {
      if (cartItems.length > 0) {
        onCheckout?.(cartItems, summary);
      }
    }, [cartItems, summary, onCheckout]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getTotalItems: () =>
          cartItems.reduce((sum, item) => sum + item.quantity, 0),
        getTotalAmount: () => summary.total,
        clearCart: () => setCartItems([]),
        getCartItems: () => cartItems,
      }),
      [cartItems, summary.total]
    );

    // Empty cart state
    if (cartItems.length === 0) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-8">
            <div className="w-24 h-24 mx-auto mb-12 border border-gray-300 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-3xl font-light text-black mb-8 tracking-[0.1em]">
              Your Bag is Empty
            </h2>
            <p className="text-lg font-light text-gray-600 mb-12 leading-relaxed">
              Discover our collections and add your favorite pieces to your bag.
            </p>
            <button className="border border-black px-16 py-4 bg-white text-black font-light tracking-[0.3em] text-sm uppercase hover:bg-black hover:text-white transition-all duration-500">
              Explore Collections
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-8 border border-black flex items-center justify-center">
              <span className="text-black font-light text-sm tracking-[0.2em]">
                DIOR
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-black tracking-[0.1em] mb-6">
              MY BAG
            </h1>

            <div className="flex items-center justify-center gap-8 text-sm font-light text-gray-600">
              <span className="tracking-[0.2em] uppercase">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0) === 1
                  ? " Item"
                  : " Items"}
              </span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="tracking-[0.2em] uppercase">
                Total: ${summary.total.toLocaleString()}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200">
                <div className="p-8">
                  {cartItems.map((item) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onQuantityUpdate={updateQuantity}
                      onRemove={removeItem}
                      onMoveToWishlist={moveToWishlist}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              {/* Coupon */}
              <CouponComponent
                appliedCoupon={appliedCoupon}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                isLoading={isLoading}
              />

              {/* Summary */}
              <div className="bg-white border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-light text-black tracking-[0.1em] uppercase mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 text-sm font-light">
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-black">
                        ${summary.subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-black">
                        {summary.delivery === 0 ? (
                          <span className="text-green-600">Complimentary</span>
                        ) : (
                          `$${summary.delivery.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-black">
                        ${summary.tax.toFixed(2)}
                      </span>
                    </div>

                    {summary.discount > 0 && (
                      <div className="flex justify-between items-center pb-2 text-green-600">
                        <span>Promotional Discount</span>
                        <span>-${summary.discount.toFixed(2)}</span>
                      </div>
                    )}

                    {summary.savings > 0 && (
                      <div className="flex justify-between items-center pb-2 text-green-600">
                        <span>You Save</span>
                        <span>${summary.savings.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-light text-black tracking-[0.1em] uppercase">
                          Total
                        </span>
                        <span className="font-light text-black">
                          ${summary.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-8 border border-black px-6 py-4 bg-black text-white font-light tracking-[0.2em] text-sm uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Security Features */}
                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-light text-gray-600">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span>Secure checkout with 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-light text-gray-600">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Complimentary shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-light text-gray-600">
                      <Gift className="w-4 h-4 text-purple-600" />
                      <span>Complimentary gift wrapping available</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-light text-gray-600">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <span>30-day return policy</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs font-light text-gray-600 mb-3 tracking-[0.2em] uppercase">
                      We Accept
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-blue-600 text-xs font-light">
                        <CreditCard className="w-4 h-4" />
                        PayPal
                      </div>
                      <div className="w-8 h-5 bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                      <div className="w-8 h-5 bg-yellow-500 text-white text-xs flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div className="w-8 h-5 bg-green-600 text-white text-xs flex items-center justify-center font-bold">
                        AE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="text-center">
                <button className="border border-gray-300 px-12 py-4 bg-white text-black font-light tracking-[0.2em] text-sm uppercase hover:border-black transition-all duration-500">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

LuxuryShoppingBag.displayName = "LuxuryShoppingBag";
export default LuxuryShoppingBag;

// // Export with Error Boundary wrapper
// export default function App() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onError={handleError}
//       onReset={() => {
//         window.location.hash = "";
//       }}
//     >
//       <LuxuryShoppingBag />
//     </ErrorBoundary>
//   );
// }
