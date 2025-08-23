import { Share2 } from "lucide-react";

interface ShareButtonProps {
  id: string;
  className?: string;
}

const ShareButton = ({ id, className = "" }: ShareButtonProps) => {
  const handleShare = () => {
    // Construct the shareable link (replace with your real product route)
    const url = `${window.location.origin}/product/${id}`;

    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <button
      onClick={handleShare}
      className={`w-12 h-12 bg-white border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 ${className}`}
      aria-label="Share item"
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
};

ShareButton.displayName = "ShareButton";
export default ShareButton;
