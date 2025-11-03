import React from "react";
import { FEATURE_FLAGS, FeatureFlag } from "../../../../shared/featureFlags";

interface BadgeNewProps {
  featureFlag: FeatureFlag;
  className?: string;
}

const BadgeNew: React.FC<BadgeNewProps> = ({ featureFlag, className = "" }) => {
  const isEnabled = FEATURE_FLAGS[featureFlag];

  if (!isEnabled) {
    return null;
  }

  return (
    <span
      className={`ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full ${className}`}
    >
      NEW
    </span>
  );
};

export default BadgeNew;
