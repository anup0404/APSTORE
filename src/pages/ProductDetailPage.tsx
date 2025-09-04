// import React, { useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { X } from "lucide-react";

// import { useProductActions } from "../hooks/useProductActions";
// import { sampleProducts } from "../data/mydummy";
// import ProductDetails from "../Components/ui/ProductDetail/ProductDetail";
// // import { mockMakeupProductData } from "../Components/ui/ProductDetail/ProductDetail.type";
// // import BreadcrumbNavigation from "../Components/ui/ProductDetail/components/BreadcrumbNavigation";
// // import ProductDetails from "../Components/ui/ProductDetail/ProductDetail";
// // import ProductFeatures from "../Components/ui/ProductDetail/components/ProductFeatures";
// // import LoyaltyInfo from "../Components/ui/ProductDetail/components/LoyaltyInfo";
// // import RecentlyViewed from "../Components/ui/ProductDetail/components/RecentlyViewed";
// // import VirtualTryOnModal from "../Components/ui/ProductDetail/components/VirtualTryOnModal";

// const ProductDetailsPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const navigate = useNavigate();
//   // Define the type for the ProductDetails ref
//   type ProductDetailsRef = {
//     getSelectedVariant: () => { quantity: number };
//   };

//   const productRef = useRef<ProductDetailsRef>(null);

//   const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);

//   // const {
//   //   data: product,
//   //   isLoading,
//   //   error,
//   // } = useGetProductByIdQuery(productId || "");

//   const [product, setProduct] = useState(sampleProducts[0]);
//   const { toggleWishlist, addToCart, isInWishlist } = useProductActions();

//   // Show notification helper
//   // const showNotificationMessage = (message: string) => {
//   //   setNotificationMessage(message);
//   //   setShowNotification(true);
//   //   setTimeout(() => setShowNotification(false), 3000);
//   // };

//   // Handle add to bag
//   const handleAddToBag = () => {
//     if (productRef.current && productId) {
//       const selectedVariant = productRef.current.getSelectedVariant();
//       addToCart(productId, selectedVariant.quantity);
//     }
//   };

//   // Handle wishlist toggle
//   const handleWishlistToggle = () => {
//     if (productId) {
//       toggleWishlist(productId);
//       const isCurrentlyWishlisted = isInWishlist(productId);
//     }
//   };

//   // Handle virtual try-on
//   const handleVirtualTryOn = () => {
//     setShowVirtualTryOn(true);
//   };

//   // // Breadcrumb items
//   // const breadcrumbItems = [
//   //   { label: "Home", onClick: () => navigate("/") },
//   //   {
//   //     label: product?.category || "Products",
//   //     onClick: () => navigate("/products"),
//   //   },
//   //   {
//   //     label: product?.subcategory || "",
//   //     onClick: () => navigate(`/products?category=${product?.category}`),
//   //   },
//   //   { label: product?.title || "Product" },
//   // ].filter((item) => item.label); // Remove empty labels

//   // if (error) {
//   //   return (
//   //     <div className="min-h-screen bg-white flex items-center justify-center">
//   //       <div className="text-center">
//   //         <h1 className="text-2xl font-light text-gray-900 mb-4">
//   //           Product Not Found
//   //         </h1>
//   //         <p className="text-gray-600 mb-6">
//   //           The product you're looking for doesn't exist.
//   //         </p>
//   //         <button
//   //           onClick={() => navigate("/products")}
//   //           className="bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
//   //         >
//   //           Browse Products
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen bg-white  pt-20">
//       {/* Breadcrumb Navigation */}
//       {/* <div className="max-w-7xl mx-auto px-14 sm:px-6 lg:px-8 pt-18">
//         <BreadcrumbNavigation items={breadcrumbItems} />
//       </div> */}

//       {/* Main Product Details */}

//       <ProductDetails productId={productId ? productId : ""}
//       onVirtualTryOn={handleVirtualTryOn}
//       isWishlisted={isInWishlist(productId)}
//       handleWishlistToggle={handleWishlistToggle}
//       handleAddToBag={handleAddToBag}
//       />

//       {/* Loading State */}
//       {/* {isLoading && (
//         <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-40">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading product details...</p>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default ProductDetailsPage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductActions } from "../hooks/useProductActions";
import ProductDetails from "../Components/ui/ProductDetail/ProductDetail";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string | undefined }>();
  // const navigate = useNavigate();
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);

  const { toggleWishlist, addToCart, isInWishlist } = useProductActions();

  // if (!productId) {
  //   navigate("/product");
  //   return null;
  // }

  const handleAddToBag = () => {
    if (productId) {
      addToCart(productId, 1); // Quantity will be handled by Redux state
      console.log("Added to bag:", { productId });
    } else {
      console.warn("No productId provided, cannot add to bag.");
    }
  };

  const handleWishlistToggle = () => {
    if (productId) {
      toggleWishlist(productId);
      console.log("Wishlist toggled:", {
        productId,
        isWishlisted: isInWishlist(productId),
      });
    } else {
      console.warn("No productId provided, cannot toggle wishlist.");
    }
  };

  const handleVirtualTryOn = () => {
    setShowVirtualTryOn(true);
    console.log("Virtual try-on opened for:", productId);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <ProductDetails
        productId={productId ?? "prod1"}
        onVirtualTryOn={handleVirtualTryOn}
        isWishlisted={isInWishlist(productId ?? "prod1")}
        onWishlistToggle={handleWishlistToggle}
        onAddToBag={handleAddToBag}
      />
      {/* // Modals */}
      {/* <ShareModal
//           productId={productId}
//           productName={product.title}
//           // isOpen={showShareModal}
//           onClose={() => setShowShareModal(false)}
//         /> */}
      {/* Virtual Try-On Modal */}
      {showVirtualTryOn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Virtual Try-On</h3>
            <p className="text-gray-600 mb-4">
              Virtual try-on feature would be implemented here.
            </p>
            <button
              onClick={() => setShowVirtualTryOn(false)}
              className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
ProductDetailsPage.displayName = "ProductDetailsPage";
export default ProductDetailsPage;
