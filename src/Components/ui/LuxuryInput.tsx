// Luxury Input component
const LuxuryInput = forwardRef(
  ({ label, error, prefixElement, className = "", ...props }, ref) => (
    <div className="relative">
      <div className="relative">
        {prefixElement && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {prefixElement}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-transparent border-0 border-b border-gray-300 ${
            prefixElement ? "pl-8" : "pl-0"
          } pr-0 py-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-black transition-colors duration-300 font-light tracking-wide ${className}`}
          placeholder=" "
          {...props}
        />
        <label
          className={`absolute left-${
            prefixElement ? "8" : "0"
          } top-4 text-gray-500 transform transition-all duration-300 origin-left pointer-events-none font-light tracking-wide text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:scale-75 peer-focus:text-black`}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 font-light tracking-wide">
          {error}
        </p>
      )}
    </div>
  )
);
LuxuryInput.displayName = "LuxuryInput";