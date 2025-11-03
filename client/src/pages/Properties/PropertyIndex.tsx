import React from "react";
import { Building, Plus, Filter, Search } from "lucide-react";

const PropertyIndex: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate mb-2">
            Property Index
          </h1>
          <p className="text-concrete">
            Comprehensive property database and management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone rounded-lg text-slate hover:bg-stone transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">
              Total Properties
            </h3>
            <Building className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">156</p>
          <p className="text-sm text-green-600">+4 new this month</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">
              Occupancy Rate
            </h3>
            <Building className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">92.3%</p>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-stone">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-concrete">Total Sq Ft</h3>
            <Building className="h-4 w-4 text-concrete" />
          </div>
          <p className="text-2xl font-semibold text-slate">2.4M</p>
          <p className="text-sm text-blue-600">Across all properties</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 border border-stone">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-concrete" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border border-stone rounded-lg focus:outline-none focus:ring-2 focus:ring-slate"
            />
          </div>
          <select className="px-4 py-2 border border-stone rounded-lg focus:outline-none focus:ring-2 focus:ring-slate">
            <option>All Types</option>
            <option>Office</option>
            <option>Retail</option>
            <option>Industrial</option>
            <option>Mixed Use</option>
          </select>
          <select className="px-4 py-2 border border-stone rounded-lg focus:outline-none focus:ring-2 focus:ring-slate">
            <option>All Locations</option>
            <option>City of London</option>
            <option>Canary Wharf</option>
            <option>West End</option>
            <option>Shoreditch</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-lg border border-stone overflow-hidden">
        <div className="px-6 py-4 border-b border-stone">
          <h2 className="text-lg font-semibold text-slate">Properties (156)</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-concrete" />
            </div>
            <h3 className="text-lg font-medium text-slate mb-2">
              Property Index functionality coming soon
            </h3>
            <p className="text-concrete">
              This page will contain the full property management interface
              extracted from the HTML file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyIndex;
