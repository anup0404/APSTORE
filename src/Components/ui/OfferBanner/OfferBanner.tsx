import React from "react";
import type { OfferBannerProps } from "./OfferBanner.type";

const OfferBanner = React.forwardRef<HTMLElement, OfferBannerProps>(
  ({ title, offerText, code }, ref) => (
    <section
      ref={ref}
      className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-4"
    >
      <div className="container mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-xl font-bold">{offerText}</span>
        <span className="text-sm">Use code: {code}</span>
      </div>
    </section>
  )
);

OfferBanner.displayName = "OfferBanner";
export default OfferBanner;
