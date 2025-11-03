import React from "react";
import { AreaChart, Building, Users, TrendingUp } from "lucide-react";

const SpaceAllocation: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate mb-2">
            Space Allocation
          </h1>
          <p className="text-concrete">
            Optimize space utilization across your portfolio
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
            NEW
          </span>
        </div>
      </div>

      {/* Space Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Total Space</h3>
            <Building className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">2.4M sq ft</p>
          <p className="text-sm text-blue-600">Across 156 properties</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Occupied</h3>
            <Users className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">2.2M sq ft</p>
          <p className="text-sm text-green-600">92.3% utilization</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Available</h3>
            <AreaChart className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">185K sq ft</p>
          <p className="text-sm text-orange-600">7.7% available</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Revenue/sq ft</h3>
            <TrendingUp className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">£42</p>
          <p className="text-sm text-green-600">+8.3% YoY</p>
        </div>
      </div>

      {/* Space Allocation Chart */}
      <div className="bg-white rounded-lg border border-stone overflow-hidden">
        <div className="px-6 py-4 border-b border-stone">
          <h2 className="text-lg font-semibold text-slate">
            Space Utilization Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mx-auto mb-4">
              <AreaChart className="h-8 w-8 text-concrete" />
            </div>
            <h3 className="text-lg font-medium text-slate mb-2">
              Space Allocation analytics coming soon
            </h3>
            <p className="text-concrete">
              This page will contain detailed space utilization charts and
              optimization tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceAllocation;
