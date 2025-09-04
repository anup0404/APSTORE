import React from "react";
import { Truck, Shield, RotateCcw, Gift, Award, Camera } from "lucide-react";

interface ProductFeaturesProps {
  shipping?: {
    freeShipping: boolean;
    estimatedDays: string;
    expedited?: boolean;
  };
  returns?: {
    returnWindow: number;
    freeReturns: boolean;
  };
  hasGiftWrapping?: boolean;
  hasPersonalization?: boolean;
  hasVirtualTryOn?: boolean;
  className?: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  shipping,
  returns,
  hasGiftWrapping,
  hasPersonalization,
  hasVirtualTryOn,
  className = "",
}) => {
  return (
    <div className={`space-y-4 pt-6 border-t border-gray-200 ${className}`}>
      <div className="space-y-3 text-sm">
        {shipping && (
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">
                {shipping.freeShipping ? "Free Shipping" : "Shipping Available"}
              </div>
              <div className="text-gray-600">
                Estimated delivery: {shipping.estimatedDays}
              </div>
            </div>
          </div>
        )}

        {returns && (
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">
                {returns.freeReturns ? "Free Returns" : "Returns Available"}
              </div>
              <div className="text-gray-600">
                {returns.returnWindow} day return window
              </div>
            </div>
          </div>
        )}

        {hasGiftWrapping && (
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">Gift Wrapping Available</div>
              <div className="text-gray-600">
                Complimentary luxury packaging
              </div>
            </div>
          </div>
        )}

        {hasPersonalization && (
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">Personalization Available</div>
              <div className="text-gray-600">
                Add custom engraving or embossing
              </div>
            </div>
          </div>
        )}

        {hasVirtualTryOn && (
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium">Virtual Try-On Available</div>
              <div className="text-gray-600">See how it looks on you</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <div>
            <div className="font-medium">Authenticity Guaranteed</div>
            <div className="text-gray-600">100% genuine products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductFeatures.displayName = "ProductFeatures";
export default ProductFeatures;
