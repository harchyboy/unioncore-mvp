import React from "react";

interface NavigationHeadingProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const NavigationHeading: React.FC<NavigationHeadingProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate">{title}</h1>
        {subtitle && <p className="text-sm text-concrete mt-1">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex items-center space-x-3">{children}</div>
      )}
    </div>
  );
};

export default NavigationHeading;
