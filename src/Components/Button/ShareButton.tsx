// import { Share2 } from "lucide-react";

import { Share2 } from "lucide-react";

// interface ShareButtonProps {
//   id: string;
//   className?: string;
// }

// const ShareButton = ({ id, className = "" }: ShareButtonProps) => {
//   const handleShare = () => {
//     // Construct the shareable link (replace with your real product route)
//     const url = `${window.location.origin}/product/${id}`;

//     navigator.clipboard.writeText(url);
//     alert("Link copied to clipboard!");
//   };

//   return (
//     <button
//       onClick={handleShare}
//       className={`w-12 h-12 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ${className}`}
//       aria-label="Share item"
//     >
//       <Share2 className="w-4 h-4" />
//     </button>
//   );
// };

// ShareButton.displayName = "ShareButton";
// export default ShareButton;

interface ShareButtonProps {
  onShare: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "outline";
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  onShare,
  className = "",
  size = "md",
  variant = "outline",
}) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-sm",
  };

  const variantClasses = {
    filled: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-900 hover:border-gray-500",
  };

  return (
    <button
      onClick={onShare}
      className={`${sizeClasses[size]} ${variantClasses[variant]} font-medium tracking-wider uppercase transition-colors ${className}`}
    >
      <Share2 className="w-4 h-4 inline mr-2" />
      Share
    </button>
  );
};

ShareButton.displayName = "ShareButton";
export default ShareButton;
