import React from "react";
import {
  X,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Copy,
  QrCode,
} from "lucide-react";

interface ShareModalProps {
  productId: string;
  productName?: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  productId,
  productName,
  onClose,
}) => {
  const productUrl = `${window.location.origin}/product/${productId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      // You could add a toast notification here
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(
      `Check out this amazing product: ${productName || "Product"}`
    );

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodedText}&body=Check out this product: ${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-sm w-full mx-4 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Share Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialShare("facebook")}
              className="flex items-center justify-center gap-2 p-3 border border-gray-200 hover:bg-gray-50 rounded-lg"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
            <button
              onClick={() => console.log("Instagram share")}
              className="flex items-center justify-center gap-2 p-3 border border-gray-200 hover:bg-gray-50 rounded-lg"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="text-sm font-medium">Instagram</span>
            </button>
            <button
              onClick={() => handleSocialShare("twitter")}
              className="flex items-center justify-center gap-2 p-3 border border-gray-200 hover:bg-gray-50 rounded-lg"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Twitter</span>
            </button>
            <button
              onClick={() => handleSocialShare("email")}
              className="flex items-center justify-center gap-2 p-3 border border-gray-200 hover:bg-gray-50 rounded-lg"
            >
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Email</span>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={productUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-600"
              />
              <button
                onClick={handleCopyLink}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => console.log("Generate QR code")}
            className="w-full bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

ShareModal.displayName = "ShareModal";
export default ShareModal;
