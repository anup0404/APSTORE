import React from "react";
import CategoryGrid from "../Components/ui/CategoryGrid/CategoryGrid";
import FeaturedItems from "../Components/ui/FeaturedItems";
import HeroSection from "../Components/ui/HeroSection";

import { videoData } from "../constants/navbar.constant";
import { mockCategories } from "../constants/home";
import { dummyProductCards } from "../constants/product";
import {
  HOME_PRODUCT_CARD_FEATURED_HEADING,
  HOME_PRODUCT_CARD_FEATURED_SUBHEADING,
} from "../constants/global.constant";

// interface HomeProps {}

const Home = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      <HeroSection videos={videoData} />
      <CategoryGrid categories={mockCategories} />
      <FeaturedItems
        heading={HOME_PRODUCT_CARD_FEATURED_HEADING}
        subheading={HOME_PRODUCT_CARD_FEATURED_SUBHEADING}
        products={dummyProductCards.map((item) => ({ ...item }))}
        onWishlistToggle={(id: number | string) => {
          console.log("Added to wishlist:", id);
          // Handle wishlist logic here
        }}
        onShare={(id: number | string) => {
          console.log("Sharing product:", id);
          // Handle share logic here
        }}
        onAddToCart={(id: number | string) => {
          console.log("Added to cart:", id);
          // Handle add to cart logic here
        }}
        onAddToBag={(id: number | string) => {
          console.log("Added to bag:", id);
          // Handle add to bag logic here
        }}
      />
    </div>
  );
});

Home.displayName = "Home";

export default Home;
