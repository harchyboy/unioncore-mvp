import React from "react";
import { Plus, Filter, Search } from "lucide-react";

const LeadsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate mb-2">Leads</h1>
          <p className="text-concrete">Manage and track your lead pipeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone rounded-lg text-slate hover:bg-stone transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 border border-stone">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-concrete" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border border-stone rounded-lg focus:outline-none focus:ring-2 focus:ring-slate"
            />
          </div>
          <select className="px-4 py-2 border border-stone rounded-lg focus:outline-none focus:ring-2 focus:ring-slate">
            <option>All Status</option>
            <option>New</option>
            <option>Qualified</option>
            <option>Viewing</option>
            <option>Proposal</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-stone overflow-hidden">
        <div className="px-6 py-4 border-b border-stone">
          <h2 className="text-lg font-semibold text-slate">
            Active Leads (247)
          </h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-concrete" />
            </div>
            <h3 className="text-lg font-medium text-slate mb-2">
              Leads functionality coming soon
            </h3>
            <p className="text-concrete">
              This page will contain the full leads management interface
              extracted from the HTML file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
