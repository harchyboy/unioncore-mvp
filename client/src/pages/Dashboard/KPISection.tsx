import React from "react";
import { TrendingUp, Target, Users, Building } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
  progress: number;
  progressColor: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  icon,
  iconBg,
  progress,
  progressColor,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-stone">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-slate mb-1">{value}</h3>
      <p className="text-sm text-concrete">{title}</p>
      <div className="mt-4 h-2 bg-stone rounded-full">
        <div
          className={`h-2 ${progressColor} rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

const KPISection: React.FC = () => {
  const kpiData = [
    {
      title: "Pipeline Value",
      value: "£47.2M",
      change: "+12.5%",
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      iconBg: "bg-green-100",
      progress: 72,
      progressColor: "bg-green-500",
    },
    {
      title: "Win Rate",
      value: "68.4%",
      change: "+3.2%",
      icon: <Target className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
      progress: 68,
      progressColor: "bg-blue-500",
    },
    {
      title: "Active Leads",
      value: "247",
      change: "+18",
      icon: <Users className="h-6 w-6 text-purple-600" />,
      iconBg: "bg-purple-100",
      progress: 85,
      progressColor: "bg-purple-500",
    },
    {
      title: "Properties",
      value: "156",
      change: "+4",
      icon: <Building className="h-6 w-6 text-orange-600" />,
      iconBg: "bg-orange-100",
      progress: 92,
      progressColor: "bg-orange-500",
    },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>
    </section>
  );
};

export default KPISection;
