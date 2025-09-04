import React from "react";
import { Award, Gift } from "lucide-react";

interface LoyaltyInfoProps {
  pointsEarned?: number;
  memberDiscount?: number;
  hasGiftWrapping?: boolean;
  className?: string;
}

const LoyaltyInfo: React.FC<LoyaltyInfoProps> = ({
  pointsEarned,
  memberDiscount,
  hasGiftWrapping,
  className = "",
}) => {
  if (!pointsEarned && !memberDiscount && !hasGiftWrapping) return null;

  return (
    <div className={`space-y-2 text-sm ${className}`}>
      {pointsEarned && (
        <div className="flex items-center gap-2 text-gray-600">
          <Award className="w-4 h-4" />
          <span>Earn {pointsEarned} loyalty points with this purchase</span>
        </div>
      )}

      {hasGiftWrapping && (
        <div className="flex items-center gap-2 text-gray-600">
          <Gift className="w-4 h-4" />
          <span>Complimentary gift wrapping available</span>
        </div>
      )}
    </div>
  );
};

LoyaltyInfo.displayName = "LoyaltyInfo";
export default LoyaltyInfo;
