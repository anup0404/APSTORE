import { forwardRef } from "react";

const ShopButton = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className = "" }, ref) => (
  <button
    ref={ref}
    className={`
        relative text-white/95 text-xs sm:text-sm lg:text-base font-extralight 
        tracking-[0.15em] sm:tracking-[0.2em] uppercase
        pb-1 sm:pb-2 group cursor-pointer font-serif transition-all duration-500
        hover:text-white hover:tracking-[0.2em] sm:hover:tracking-[0.25em]
        ${className}
      `}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-white via-white/80 to-transparent group-hover:w-full transition-all duration-500"></div>
    <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
  </button>
));
ShopButton.displayName = "ShopButton";
export default ShopButton;
