import React from "react";
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  Target,
  Users,
  Building,
} from "lucide-react";
import KPISection from "./KPISection";
import DealFlowFunnel from "./DealFlowFunnel";
import RecentActivity from "./RecentActivity";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-slate mb-2">
              Executive Dashboard
            </h1>
            <p className="text-concrete">
              Portfolio overview and operational insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border border-stone">
              <Calendar className="h-4 w-4 text-concrete" />
              <span className="text-sm text-slate">Last 30 days</span>
              <ChevronDown className="h-3 w-3 text-concrete" />
            </div>
          </div>
        </div>
      </section>

      {/* KPI Overview Tiles */}
      <KPISection />

      {/* Deal Flow Funnel */}
      <DealFlowFunnel />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
