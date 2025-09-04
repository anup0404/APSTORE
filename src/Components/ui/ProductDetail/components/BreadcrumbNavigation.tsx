import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items,
  className = "",
}) => {
  return (
    <nav className={`text-sm text-gray-500 ${className}`}>
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {index > 0 && <ChevronRight className="w-3 h-3 mx-2" />}
          {item.href || item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-gray-700 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? "text-gray-900" : ""}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

BreadcrumbNavigation.displayName = "BreadcrumbNavigation";
export default BreadcrumbNavigation;
