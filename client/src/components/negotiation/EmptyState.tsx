import React from "react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-stone p-12 text-center ${className}`}
    >
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-stone flex items-center justify-center text-concrete">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-slate mb-2">{title}</h3>

      {description && (
        <p className="text-concrete mb-6 max-w-md mx-auto">{description}</p>
      )}

      {action && (
        <Button onClick={action.onClick} className="bg-slate hover:bg-slate/90">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
