import React from "react";
import HeroCarousel from "../Components/ui/HeroCarousel/HeroCarousel";
import OfferBanner from "../Components/ui/OfferBanner/OfferBanner";
import CategoryGrid from "../Components/ui/CategoryGrid/CategoryGrid";
import Footer from "../Components/ui/Footer/Footer";
import { banners, categories } from "../constants/home";
import Navbar from "../Components/ui/Navbar/Navbar";
import FeaturedItems from "../Components/FeaturedItems";
import { dummyProductCards } from "../constants/product";

const Home: React.FC = () => (
  <>
    <Navbar />
    <HeroCarousel banners={banners} />
    <OfferBanner
      title="🔥 FLASH SALE:"
      offerText="EXTRA 30% OFF ON EVERYTHING"
      code="FLASH30"
    />
    <CategoryGrid categories={categories} />
    <FeaturedItems
      products={dummyProductCards}
      onWishlistToggle={(id) => console.log("Wishlist toggled:", id)}
      onShare={(id) => console.log("Shared product:", id)}
    />
    <Footer year={2025} />
  </>
);

export default Home;
