import { forwardRef, useState } from "react";

import VideoCard from "./Video";
import CentralLogo from "./CentralLogo";
import { LOGO_NAME } from "../../constants/global.constant";
import type { HomeVideo } from "../../types/home.type";

interface HeroSectionProps {
  className?: string;
  videos: HomeVideo[];
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className = "", videos }, ref) => {
    const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
    const [activeVideoId, setActiveVideoId] = useState<string>("fragrance");

    const handleVideoHover = (videoId: string) => {
      setHoveredVideoId(videoId);
      setActiveVideoId(videoId);
    };

    const handleVideoLeave = () => {
      setHoveredVideoId(null);
    };

    // Check if any video is currently being hovered (playing)
    const isAnyVideoPlaying = hoveredVideoId !== null;

    return (
      <section
        ref={ref}
        className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
      >
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row h-full">
          {videos.length > 0 &&
            videos.map((video) => (
              <VideoCard
                key={video.id}
                data={video}
                isHovered={hoveredVideoId === video.id}
                isActive={activeVideoId === video.id}
                onMouseEnter={() => handleVideoHover(video.id)}
                onMouseLeave={handleVideoLeave}
              />
            ))}
        </div>

        {/* Central DIOR Logo - Gets lighter when any video is playing */}
        <div
          className={`
            transition-opacity duration-500 ease-out
            ${isAnyVideoPlaying ? "opacity-70" : "opacity-100"}
          `}
        >
          <CentralLogo logo_name={LOGO_NAME} />
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
