import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefixElement?: React.ReactNode;
  className?: string;
  error?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      value,
      onChange,
      className = "",
      prefixElement = null,
      placeholder,
      label,
      error = "",
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const errorId = `${label?.replace(/\s+/g, "-").toLowerCase()}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor={label}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {prefixElement && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {prefixElement}
            </div>
          )}

          <input
            id={label}
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`w-full px-4 py-3 
              bg-gray-50 text-gray-900 placeholder-gray-500 
              border-2 rounded-lg transition-all 
              ${prefixElement ? "pl-10" : ""} 
              ${
                hasError
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-200 focus:border-black"
              } 
              ${className}`}
            {...props}
          />
        </div>

        {hasError && (
          <p id={errorId} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
