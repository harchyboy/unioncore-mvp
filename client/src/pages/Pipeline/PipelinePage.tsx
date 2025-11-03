import React from "react";
import { BarChart3, Filter, Download } from "lucide-react";

const PipelinePage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate mb-2">Pipeline</h1>
          <p className="text-concrete">
            Track deals through your sales pipeline
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone rounded-lg text-slate hover:bg-stone transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone rounded-lg text-slate hover:bg-stone transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">
              Total Pipeline
            </h3>
            <BarChart3 className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">£47.2M</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Active Deals</h3>
            <BarChart3 className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">247</p>
          <p className="text-sm text-green-600">+18 new this week</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Avg Deal Size</h3>
            <BarChart3 className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">£191K</p>
          <p className="text-sm text-blue-600">+5.2% from last month</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Close Rate</h3>
            <BarChart3 className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">68.4%</p>
          <p className="text-sm text-green-600">+3.2% from last month</p>
        </div>
      </div>

      {/* Pipeline Table */}
      <div className="bg-white rounded-lg border border-stone overflow-hidden">
        <div className="px-6 py-4 border-b border-stone">
          <h2 className="text-lg font-semibold text-slate">
            Pipeline Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-concrete" />
            </div>
            <h3 className="text-lg font-medium text-slate mb-2">
              Pipeline functionality coming soon
            </h3>
            <p className="text-concrete">
              This page will contain the full pipeline management interface
              extracted from the HTML file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;
