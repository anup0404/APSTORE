import { forwardRef, type ForwardedRef } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ui/ProductDetail/ProductDetail";
import FeaturedItems from "../Components/ui/FeaturedItems";
import { dummyProductCards } from "../constants/product";

const ProductDetailsPage = forwardRef<HTMLDivElement>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => {
    const { id } = useParams<Record<string, string>>();
    if (!id) return <div ref={ref}>No product ID!</div>;

    return (
      <div ref={ref} className="max-w-7xl mx-auto py-8 space-y-8">
        <ProductDetails productId={id} />

        <hr className="border-t border-gray-300 my-8" />

        <FeaturedItems
          heading="Similar Products"
          products={dummyProductCards}
          onWishlistToggle={(idx: number | string) =>
            console.log("Wishlist toggled:", idx)
          }
          onShare={(idx: number | string) =>
            console.log("Shared product:", idx)
          }
        />
      </div>
    );
  }
);

ProductDetailsPage.displayName = "ProductDetailsPage";

export default ProductDetailsPage;
