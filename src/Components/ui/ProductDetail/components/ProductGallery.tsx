import React, { useState, forwardRef, useEffect, useRef } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ProductVariant } from "../../../../data/productDetailsData";

interface ProductGalleryProps {
  productName: string;
  selectedVariant?: ProductVariant | null;
  has360View?: boolean;
  videos?: string[];
  onImageChange?: (index: number) => void;
}

const ProductGallery = forwardRef<HTMLDivElement, ProductGalleryProps>(
  (
    { productName, selectedVariant, has360View, videos, onImageChange },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [showVideo, setShowVideo] = useState(false);
    const [show360, setShow360] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [scrollDirection, setScrollDirection] = useState(0);

    const mainImageRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    // Get images to display - prioritize variant images if available
    const displayImages = selectedVariant?.images || [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1622137249302-4c5120f55874?w=800&h=800&fit=crop&auto=format",
    ];
    const displayVideos = videos || [];
    const has360ViewEnabled = has360View;

    // Total media items (images + videos + 360 view)
    const totalMediaItems =
      displayImages.length +
      (displayVideos.length > 0 ? 1 : 0) +
      (has360ViewEnabled ? 1 : 0);

    // Reset current index when variant changes
    useEffect(() => {
      if (selectedVariant?.images?.length || displayImages.length) {
        setCurrentIndex(0);
        setShowVideo(false);
        setShow360(false);
        setIsVideoPlaying(false);
      }
    }, [selectedVariant]);

    // Handle scroll on main image to change images - direct replacement
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (!mainImageRef.current?.contains(e.target as Node)) return;

        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;

        if (direction !== scrollDirection) {
          setScrollDirection(direction);

          if (direction > 0) {
            nextImage();
          } else {
            prevImage();
          }

          // Reset scroll direction after a delay
          setTimeout(() => setScrollDirection(0), 500);
        }
      };

      const mainElement = mainImageRef.current;
      if (mainElement) {
        mainElement.addEventListener("wheel", handleWheel, { passive: false });
        return () => mainElement.removeEventListener("wheel", handleWheel);
      }
    }, [scrollDirection, currentIndex, totalMediaItems]);

    // Auto-scroll thumbnails to keep selected item visible
    useEffect(() => {
      if (thumbnailsRef.current) {
        const thumbnailElement = thumbnailsRef.current.children[
          currentIndex
        ] as HTMLElement;
        if (thumbnailElement) {
          thumbnailElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, [currentIndex]);

    const nextImage = () => {
      const newIndex = (currentIndex + 1) % totalMediaItems;
      setCurrentIndex(newIndex);
      handleMediaTypeChange(newIndex);
      onImageChange?.(newIndex);
    };

    const prevImage = () => {
      const newIndex = (currentIndex - 1 + totalMediaItems) % totalMediaItems;
      setCurrentIndex(newIndex);
      handleMediaTypeChange(newIndex);
      onImageChange?.(newIndex);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isZoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({ x, y });
    };

    const handleMediaTypeChange = (index: number) => {
      const imageCount = displayImages.length;
      const videoIndex = imageCount;
      const view360Index = imageCount + (displayVideos.length > 0 ? 1 : 0);

      if (index < imageCount) {
        setShowVideo(false);
        setShow360(false);
      } else if (index === videoIndex && displayVideos.length > 0) {
        setShowVideo(true);
        setShow360(false);
      } else if (index === view360Index && has360ViewEnabled) {
        setShowVideo(false);
        setShow360(true);
      }
    };

    const handleThumbnailClick = (index: number) => {
      setCurrentIndex(index);
      handleMediaTypeChange(index);
      onImageChange?.(index);
    };

    const handleVideoClick = () => {
      const videoIndex = displayImages.length;
      setCurrentIndex(videoIndex);
      setShowVideo(true);
      setShow360(false);
    };

    const handle360Click = () => {
      const view360Index =
        displayImages.length + (displayVideos.length > 0 ? 1 : 0);
      setCurrentIndex(view360Index);
      setShow360(true);
      setShowVideo(false);
    };

    const toggleVideoPlay = () => {
      if (videoRef.current) {
        if (isVideoPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsVideoPlaying(!isVideoPlaying);
      }
    };

    const toggleVideoMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isVideoMuted;
        setIsVideoMuted(!isVideoMuted);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setIsZoomed(false);
      }
    };

    return (
      <div
        ref={ref}
        className="flex gap-4 lg:gap-6 h-full"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Left Thumbnail Navigation */}
        <div className="hidden lg:flex flex-col w-20 xl:w-24 space-y-3">
          <div
            ref={thumbnailsRef}
            className="flex flex-col gap-3 overflow-y-auto scrollbar-hide max-h-[80vh] py-2"
          >
            {/* Image Thumbnails */}
            {displayImages.map((image, index) => (
              <button
                key={`img-${index}`}
                onClick={() => handleThumbnailClick(index)}
                className={`group relative w-full aspect-square border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentIndex === index && !showVideo && !show360
                    ? "border-black shadow-2xl scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105 hover:shadow-lg"
                }`}
                title={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

                {/* Index number overlay */}
                <div className="absolute top-1 right-1 bg-black/70 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </button>
            ))}

            {/* Video Thumbnail */}
            {displayVideos.length > 0 && (
              <button
                onClick={handleVideoClick}
                className={`group relative w-full aspect-square border-2 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300 ${
                  showVideo
                    ? "border-black shadow-2xl scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105 hover:shadow-lg"
                }`}
                title="Play video"
              >
                <Play className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors duration-200" />
                <div className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  VIDEO
                </div>
              </button>
            )}

            {/* 360 View Thumbnail */}
            {has360ViewEnabled && (
              <button
                onClick={handle360Click}
                className={`group relative w-full aspect-square border-2 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300 ${
                  show360
                    ? "border-black shadow-2xl scale-105"
                    : "border-gray-200 hover:border-gray-400 hover:scale-105 hover:shadow-lg"
                }`}
                title="360° View"
              >
                <RotateCcw className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors duration-200" />
                <div className="absolute top-1 right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  360°
                </div>
              </button>
            )}
          </div>

          {/* Scroll Hint */}
          <div className="text-center">
            <div className="text-xs text-gray-400 font-medium tracking-wide">
              SCROLL
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-transparent" />
            </div>
          </div>
        </div>

        {/* Main Image/Video Display */}
        <div className="flex-1 space-y-4">
          <div
            ref={mainImageRef}
            className="relative aspect-square rounded-2xl overflow-hidden group"
          >
            {/* Scroll Hint Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Scroll to browse • Click to zoom
            </div>

            {show360 ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <div className="text-center text-white">
                  <RotateCcw className="w-16 h-16 mx-auto mb-6 animate-spin opacity-75" />
                  <p className="text-lg font-medium mb-2">360° Experience</p>
                  <p className="text-sm opacity-75">
                    Drag to rotate • Scroll to zoom
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse delay-100" />
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            ) : showVideo && displayVideos.length > 0 ? (
              <div className="w-full h-full relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster={displayImages[0]}
                  muted={isVideoMuted}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                >
                  <source src={displayVideos[0]} type="video/mp4" />
                  Your browser does not support video playback.
                </video>

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleVideoPlay}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4 text-gray-900" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-900" />
                      )}
                    </button>
                    <button
                      onClick={toggleVideoMute}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-4 h-4 text-gray-900" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-gray-900" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                {/* Current Image - Direct replacement without sliding animation */}
                <div
                  className="absolute inset-0 w-full h-full cursor-zoom-in flex items-center justify-center transition-opacity duration-300 ease-out"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={displayImages[currentIndex]}
                    alt={`${productName} - Image ${currentIndex + 1}`}
                    className={`max-h-full w-auto object-contain transition-all duration-500 ease-out ${
                      isZoomed ? "scale-200" : "scale-100"
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            filter: "contrast(1.05) saturate(1.1)",
                          }
                        : {}
                    }
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                  />

                  {/* Zoom Grid Overlay */}
                  {isZoomed && (
                    <div className="absolute inset-0 pointer-events-none zoom-grid-overlay"></div>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons overlay */}
            <div className="absolute top-4 lg:top-6 right-4 lg:right-6 flex flex-col gap-2 lg:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white p-2 lg:p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
                title={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <ZoomOut className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900" />
                ) : (
                  <ZoomIn className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900" />
                )}
              </button>

              {has360ViewEnabled && (
                <button
                  onClick={handle360Click}
                  className={`p-2 lg:p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 ${
                    show360
                      ? "bg-black text-white"
                      : "bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900"
                  }`}
                  title="360° View"
                >
                  <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              )}

              {displayVideos.length > 0 && (
                <button
                  onClick={handleVideoClick}
                  className={`p-2 lg:p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110 ${
                    showVideo
                      ? "bg-black text-white"
                      : "bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900"
                  }`}
                  title="Play Video"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Media counter and info */}
            <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 flex flex-col gap-2">
              <div className="bg-black/70 backdrop-blur-sm text-white px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium">
                {currentIndex + 1} / {totalMediaItems}
              </div>
            </div>
          </div>

          {/* Mobile Thumbnail Navigation */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-2 min-w-full px-1">
                {/* Image Thumbnails */}
                {displayImages.map((image, index) => (
                  <button
                    key={`mobile-img-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      currentIndex === index && !showVideo && !show360
                        ? "border-black shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-400 hover:scale-105"
                    }`}
                    title={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}

                {/* Video Thumbnail */}
                {displayVideos.length > 0 && (
                  <button
                    onClick={handleVideoClick}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden flex items-center justify-center bg-gray-100 transition-all duration-200 ${
                      showVideo
                        ? "border-black shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-400 hover:scale-105"
                    }`}
                    title="Play video"
                  >
                    <Play className="w-4 h-4 text-gray-600" />
                  </button>
                )}

                {/* 360 View Thumbnail */}
                {has360ViewEnabled && (
                  <button
                    onClick={handle360Click}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 overflow-hidden flex items-center justify-center bg-gray-100 transition-all duration-200 ${
                      show360
                        ? "border-black shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-400 hover:scale-105"
                    }`}
                    title="360° View"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile swipe indicators */}
            <div className="flex justify-center gap-1 mt-4">
              {Array.from({ length: totalMediaItems }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-black scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .border-3 {
            border-width: 3px;
          }
          .scale-200 {
            transform: scale(2);
          }

          /* Zoom Grid Overlay */
          .zoom-grid-overlay {
            background: 
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(255,255,255,0.3) 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.8;
            animation: gridFadeIn 0.3s ease-out;
          }

          @keyframes gridFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 0.8;
            }
          }
        `}</style>
      </div>
    );
  }
);

ProductGallery.displayName = "ProductGallery";
export default ProductGallery;
