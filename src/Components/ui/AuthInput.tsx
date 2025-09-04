import { forwardRef } from "react";

interface AuthInputProps {
  // label: string;
  error?: string;
  prefixElement?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  value?: string;
  placeholder?: string;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      error,
      prefixElement,
      value,
      type,
      className = "",
      placeholder,
      ...props
    },
    ref
  ) => (
    <div className="relative">
      <div className="relative">
        {prefixElement && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {prefixElement}
          </div>
        )}
        <input
          ref={ref}
          value={value}
          type={type || "text"}
          className={`w-full bg-transparent border-0 border-b border-gray-300 ${
            prefixElement ? "pl-8" : "pl-0"
          } pr-0 py-4 text-gray-900  focus:outline-none focus:border-black transition-colors duration-300 font-light tracking-wide ${className}`}
          placeholder={placeholder ?? ""}
          {...props}
        />
      </div>
      <p
        className={`text-red-500 text-xs mt-2 font-light tracking-wide transition-opacity duration-0 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </p>
    </div>
  )
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
