import { forwardRef } from "react";

interface LogoProps {
  className?: string;
  logo_name: string;
}

const CentralLogo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className = "", logo_name }, ref) => (
    <div
      ref={ref}
      className={`
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      z-20 pointer-events-none
      ${className}
    `}
    >
      <div className="relative">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light tracking-[0.2em] sm:tracking-[0.25em] lg:tracking-[0.3em] font-serif drop-shadow-2xl text-center">
          {logo_name}
        </div>
        <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>
    </div>
  )
);
CentralLogo.displayName = "CentralLogo";
export default CentralLogo;
