// Luxury Button component
const LuxuryButton = ({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`relative overflow-hidden transition-all duration-500 font-light tracking-[0.15em] text-sm uppercase bg-black text-white border border-black hover:bg-transparent hover:text-black before:absolute before:inset-0 before:bg-white before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 hover:before:scale-x-100 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};
