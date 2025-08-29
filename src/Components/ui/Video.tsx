import { forwardRef, useEffect, useRef, useState } from "react";
import type { VideoData } from "./video/video.type";
import ShopButton from "./ShopButton";
import { Link } from "react-router-dom";

interface VideoCardProps {
  data: VideoData;
  isHovered: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const VideoCard = forwardRef<HTMLDivElement, VideoCardProps>(
  ({ data, isHovered, isActive, onMouseEnter, onMouseLeave }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        setVideoError(false);
      };

      const handleError = () => {
        setVideoError(true);
        setIsVideoLoaded(false);
      };

      const handleCanPlay = () => {
        setIsVideoLoaded(true);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);

      // Control playback
      if (isHovered && isVideoLoaded && !videoError) {
        video.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      } else if (!isHovered && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      };
    }, [isHovered, isVideoLoaded, videoError]);

    return (
      <div
        ref={ref}
        className="relative flex-1 h-full group cursor-pointer overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Video Element*/}
        {!videoError && (
          <video
            ref={videoRef}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-500 ease-out
              ${
                isHovered && isVideoLoaded
                  ? "scale-105 z-30 opacity-100"
                  : "scale-100 z-10 opacity-0"
              }
            `}
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={data.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Thumbnail Fallback - Lower z-index, hidden when video should show */}
        <div
          className={`
            absolute inset-0 w-full h-full bg-cover bg-center z-20
            transition-opacity duration-300
            ${
              isHovered && isVideoLoaded && !videoError
                ? "opacity-0"
                : "opacity-100"
            }
          `}
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        />

        {/* Error State Indicator */}
        {videoError && (
          <div className="absolute top-4 left-4 bg-red-500/80 text-white px-2 py-1 rounded text-xs z-40">
            Video unavailable
          </div>
        )}

        {/* Dark Overlay for Text Visibility */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-40
            transition-opacity duration-500
            ${isActive || isHovered ? "opacity-90" : "opacity-70"}
          `}
        />

        {/* Additional overlay */}
        <div
          className={`
            absolute inset-0 bg-black transition-opacity duration-500 z-40
            ${isActive || isHovered ? "opacity-20" : "opacity-40"}
          `}
        />

        {/* Content - Highest z-index */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 z-50">
          <div className="text-left text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 max-w-2xl">
            <h2
              className={`
                text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl
                font-serif font-extralight tracking-[0.05em] sm:tracking-[0.08em] lg:tracking-[0.1em] 
                mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8
                leading-tight transition-all duration-700 ease-out drop-shadow-lg
                ${
                  isActive || isHovered
                    ? "opacity-100 translate-y-0 blur-none"
                    : "opacity-70 translate-y-2 sm:translate-y-4 blur-[1px]"
                }
              `}
            >
              <span className="block relative">
                {data.title.split("&").map((part, index) => (
                  <span
                    key={index}
                    className={
                      index === 1 ? "font-light italic text-amber-50/95" : ""
                    }
                  >
                    {index > 0 && "& "}
                    {part}
                  </span>
                ))}
              </span>
            </h2>
            <div
              className={`
                transition-all duration-700 delay-200 ease-out
                ${
                  isActive || isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-50 translate-y-2 sm:translate-y-3"
                }
              `}
            >
              <Link to={data.link}>
                <ShopButton>{data.subtitle}</ShopButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Play Indicator */}
        {isHovered && (
          <div className="absolute bottom-6 left-6 animate-pulse z-60">
            <div className="w-10 h-10 flex items-center justify-center backdrop-blur-sm bg-white/15 rounded-full border border-white/40">
              {isVideoLoaded && !videoError ? (
                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
              ) : (
                <div className="w-4 h-4 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoCard.displayName = "VideoCard";
export default VideoCard;
