import React from "react";
import { X, Camera, Shield } from "lucide-react";

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  hasAR?: boolean;
}

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  //   productName,
  hasAR = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-white max-w-lg w-full mx-4 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Virtual Try-On Experience</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="aspect-square bg-gray-900 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
            <div className="text-center text-white">
              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">AI-Powered Virtual Try-On</p>
              <p className="text-sm opacity-75">Allow camera access to begin</p>
            </div>

            {/* Simulated camera overlay */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg" />
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/50" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-white/50" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-white/50" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/50" />
          </div>

          <div className="space-y-4">
            <button className="w-full bg-black text-white py-3 px-6 text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              ENABLE CAMERA
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 py-2 px-3 text-xs font-medium transition-colors rounded">
                Photo Mode
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 py-2 px-3 text-xs font-medium transition-colors rounded">
                Video Mode
              </button>
              {hasAR && (
                <button className="bg-purple-100 hover:bg-purple-200 py-2 px-3 text-xs font-medium transition-colors rounded text-purple-800">
                  AR Mode
                </button>
              )}
            </div>

            <div className="text-xs text-gray-500 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-3 h-3" />
                <span>Privacy Protected</span>
              </div>
              <p>Images are processed locally and not stored or shared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VirtualTryOnModal.displayName = "VirtualTryOnModal";
export default VirtualTryOnModal;
