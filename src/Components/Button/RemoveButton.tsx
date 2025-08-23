import { X } from "lucide-react";

interface RemoveButtonProps {
  itemId: string;
  className?: string;
}

const RemoveButton = ({ itemId, className = "" }: RemoveButtonProps) => {
  const handleRemove = () => {
    console.log(`Removing item with id: ${itemId}`);
    // removeFromWishlist(itemId);

    alert(`Item ${itemId} removed successfully`);
  };

  return (
    <button
      onClick={handleRemove}
      className={`w-12 h-12 bg-white border border-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 ${className}`}
      aria-label="Remove item"
    >
      <X className="w-4 h-4" />
    </button>
  );
};

RemoveButton.displayName = "RemoveButton";
export default RemoveButton;
