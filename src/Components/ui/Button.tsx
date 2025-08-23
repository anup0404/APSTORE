import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  prefixElement?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "white";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "",
      size = "md",
      prefixElement = null,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantClasses: Record<string, string> = {
      primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
      secondary:
        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400",
    };

    const sizeClasses: Record<string, string> = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-lg",
    };

    const baseClasses = " font-heading gap-2 rounded-lg transition-all";

    const finalClassName = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={finalClassName} type={type} {...props}>
        {prefixElement && (
          <span className="w-4 h-4 inline mr-2">{prefixElement}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
