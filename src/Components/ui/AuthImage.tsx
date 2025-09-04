import React from "react";

interface AuthImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export const AuthImage = React.forwardRef<HTMLDivElement, AuthImageProps>(
  (
    {
      src = "https://plus.unsplash.com/premium_photo-1675186049406-3fabe5f387eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
      alt,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`hidden lg:flex w-full h-full relative overflow-hidden bg-black ${className}`}
      >
        {/* Main Background Image with Premium Filter */}
        <div className="absolute inset-0">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover grayscale contrast-125 brightness-75"
            loading="lazy"
          />

          {/* Single Sophisticated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/80" />

          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
        </div>

        {/* Minimal Geometric Elements - Top Left */}
        <div className="absolute top-12 left-12 z-30">
          <div className="w-20 h-[1px] bg-white/30" />
          <div className="w-12 h-[1px] bg-white/20 mt-2" />
        </div>

        {/* Minimal Geometric Elements - Bottom Right */}
        <div className="absolute bottom-12 right-12 z-30">
          <div className="w-12 h-[1px] bg-white/20 ml-auto" />
          <div className="w-20 h-[1px] bg-white/30 mt-2 ml-auto" />
        </div>

        {/* Main Content - Centered Premium Typography */}
        <div className="relative z-20 flex items-center justify-center w-full h-full px-16">
          <div className="text-center space-y-12 max-w-2xl">
            {/* Premium Brand Statement */}
            <div className="space-y-8">
              <h1 className="font-light text-5xl xl:text-6xl 2xl:text-7xl text-white leading-[1.1] tracking-[0.02em]">
                <span className="block">CRAFTED FOR</span>
                <span className="block italic font-extralight opacity-90">
                  Excellence
                </span>
              </h1>

              <div className="w-16 h-[1px] bg-white/40 mx-auto" />

              <p className="text-white/70 text-lg xl:text-xl font-extralight leading-relaxed tracking-wide max-w-lg mx-auto">
                Where timeless sophistication meets modern luxury in every
                exquisite detail
              </p>
            </div>

            {/* Luxury Pillars - Minimal Grid */}
            <div className="grid grid-cols-3 gap-16 pt-12 border-t border-white/10">
              {/* Pillar 1 */}
              <div className="text-center group">
                <div className="w-3 h-3 bg-white/30 rounded-full mx-auto mb-4 group-hover:bg-white/50 transition-all duration-500" />
                <h3 className="text-white text-xs font-light tracking-[0.3em] uppercase mb-3">
                  ARTISANAL
                </h3>
                <p className="text-white/50 text-sm font-extralight leading-relaxed">
                  Hand-crafted with meticulous attention to detail
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="text-center group border-x border-white/10 px-8">
                <div className="w-3 h-3 bg-white/30 rounded-full mx-auto mb-4 group-hover:bg-white/50 transition-all duration-500" />
                <h3 className="text-white text-xs font-light tracking-[0.3em] uppercase mb-3">
                  HERITAGE
                </h3>
                <p className="text-white/50 text-sm font-extralight leading-relaxed">
                  Decades of uncompromising luxury excellence
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="text-center group">
                <div className="w-3 h-3 bg-white/30 rounded-full mx-auto mb-4 group-hover:bg-white/50 transition-all duration-500" />
                <h3 className="text-white text-xs font-light tracking-[0.3em] uppercase mb-3">
                  TIMELESS
                </h3>
                <p className="text-white/50 text-sm font-extralight leading-relaxed">
                  Designs that transcend trends and seasons
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Side Accent */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* Premium Corner Detail - Top Right */}
        <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/20" />

        {/* Premium Corner Detail - Bottom Left */}
        <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/20" />

        <style>{`
          /* Premium fade-in animations */
          @keyframes luxuryFadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes elegantSlideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Apply refined animations */
          h1 {
            animation: luxuryFadeIn 1.2s ease-out 0.3s both;
          }

          p {
            animation: luxuryFadeIn 1.2s ease-out 0.8s both;
          }

          .grid {
            animation: luxuryFadeIn 1.2s ease-out 1.3s both;
          }

          /* Geometric elements animation */
          .absolute.top-12.left-12 {
            animation: elegantSlideIn 1s ease-out 1.8s both;
          }

          .absolute.bottom-12.right-12 {
            animation: elegantSlideIn 1s ease-out 2s both;
          }

          /* Hover effects for luxury feel */
          .group:hover {
            transform: translateY(-2px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Premium radial gradient */
          .bg-radial-gradient {
            background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%);
          }

          /* Ultra-smooth transitions */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Letter spacing refinement */
          .tracking-luxury {
            letter-spacing: 0.05em;
          }
        `}</style>
      </div>
    );
  }
);

AuthImage.displayName = "AuthImage";
export default AuthImage;
