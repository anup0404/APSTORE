// HeroCarousel.tsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroCarouselProps } from "./HeroCarousel.type";

const HeroCarousel = React.forwardRef<HTMLElement, HeroCarouselProps>(
  ({ banners }, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const next = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
    const prev = () =>
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

    return (
      <section ref={ref} className="relative overflow-hidden">
        <div className="relative h-96 md:h-screen">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {banner.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-400">
                    {banner.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl">
                    {banner.description}
                  </p>
                  <button className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-colors">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>
    );
  }
);

HeroCarousel.displayName = "HeroCarousel";
export default HeroCarousel;
