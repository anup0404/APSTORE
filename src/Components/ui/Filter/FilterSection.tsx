// import { ChevronDown, ChevronUp } from "lucide-react";
// import { forwardRef } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef } from "react";

// interface FilterSectionProps {
//   title: string;
//   children: React.ReactNode;
//   isOpen: boolean;
//   onToggle: () => void;
// }

// const FilterSection = forwardRef<HTMLDivElement, FilterSectionProps>(
//   ({ title, children, isOpen, onToggle }, ref) => (
//     <div ref={ref} className="border-b border-gray-200 pb-4">
//       <button
//         onClick={onToggle}
//         className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-gray-700 transition-colors"
//       >
//         <span className="text-sm uppercase tracking-wide">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="w-4 h-4" />
//         ) : (
//           <ChevronDown className="w-4 h-4" />
//         )}
//       </button>
//       {isOpen && <div className="mt-4 space-y-3">{children}</div>}
//     </div>
//   )
// );

// FilterSection.displayName = "FilterSection";
// export default FilterSection;

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection = forwardRef<HTMLDivElement, FilterSectionProps>(
  ({ title, children, isOpen, onToggle }, ref) => (
    <div ref={ref} className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 hover:text-gray-700 transition-colors"
      >
        <span className="text-sm uppercase tracking-wide">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isOpen && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )
);

FilterSection.displayName = "FilterSection";
export default FilterSection;
