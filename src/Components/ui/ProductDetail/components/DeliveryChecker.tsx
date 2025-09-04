import React from "react";
import { MapPin } from "lucide-react";

interface DeliveryCheckerProps {
  pincode: string;
  onPincodeChange: (pincode: string) => void;
  onCheck?: (pincode: string) => void;
}

const DeliveryChecker: React.FC<DeliveryCheckerProps> = ({
  pincode,
  onPincodeChange,
  onCheck,
}) => {
  const handleCheck = () => {
    if (onCheck) {
      onCheck(pincode);
    } else {
      console.log("Checking delivery for pincode:", pincode);
    }
  };

  return (
    <div className="mb-8 lg:mb-10 border-t border-gray-100 pt-6 lg:pt-8">
      <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4 tracking-wider uppercase">
        Check Delivery & Services
      </h3>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => onPincodeChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>
        <button
          onClick={handleCheck}
          className="bg-gray-900 text-white px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Check
        </button>
      </div>
    </div>
  );
};

DeliveryChecker.displayName = "DeliveryChecker";

export default DeliveryChecker;
