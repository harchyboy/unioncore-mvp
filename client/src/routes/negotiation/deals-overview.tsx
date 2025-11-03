import React, { useState } from 'react';
import { PieChart, TrendingUp, Users, DollarSign, Handshake, FileText, Clock, Trophy } from 'lucide-react';

// Mock data matching the HTML design
const kpiData = [
  {
    title: 'Active Deals',
    value: '24',
    change: '+12%',
    changeLabel: 'vs last month',
    icon: Handshake,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Total Value',
    value: '£8.4M',
    change: '+18%',
    changeLabel: 'vs last month',
    icon: DollarSign,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Pending Approvals',
    value: '7',
    change: '+3',
    changeLabel: 'this week',
    icon: Clock,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    title: 'Win Rate',
    value: '73%',
    change: '+5%',
    changeLabel: 'vs last quarter',
    icon: Trophy,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

const pipelineStages = [
  { name: 'Lead', count: 8, value: '£1.2M', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-600', borderStyle: 'border-2' },
  { name: 'Viewing', count: 6, value: '£980K', color: 'bg-indigo-50 border-indigo-200', textColor: 'text-indigo-600', borderStyle: 'border' },
  { name: 'Proposal', count: 4, value: '£1.8M', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-600', borderStyle: 'border' },
  { name: 'HoTs', count: 3, value: '£2.1M', color: 'bg-pink-50 border-pink-200', textColor: 'text-pink-600', borderStyle: 'border' },
  { name: 'Contract', count: 2, value: '£1.5M', color: 'bg-red-50 border-red-200', textColor: 'text-red-600', borderStyle: 'border' },
  { name: 'Onboarding', count: 1, value: '£800K', color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-600', borderStyle: 'border' },
  { name: 'Live', count: 12, value: '£5.2M', color: 'bg-green-50 border-green-200', textColor: 'text-green-600', borderStyle: 'border' },
];

const mockActiveDeals = [
  {
    dealName: 'Canary Wharf Office Complex',
    property: 'One Canada Square',
    stage: 'Negotiation',
    value: '£2.5M',
    probability: '75%',
    nextAction: 'Review lease terms',
    dueDate: '2024-11-15',
  },
  {
    dealName: 'Shoreditch Creative Hub',
    property: 'Tech City Tower',
    stage: 'Proposal',
    value: '£1.8M',
    probability: '60%',
    nextAction: 'Client presentation',
    dueDate: '2024-11-10',
  },
  {
    dealName: 'King\'s Cross Retail Space',
    property: 'Coal Drops Yard',
    stage: 'Due Diligence',
    value: '£3.2M',
    probability: '85%',
    nextAction: 'Legal review',
    dueDate: '2024-11-08',
  },
  {
    dealName: 'Bermondsey Warehouse',
    property: 'Maltby Street',
    stage: 'HoTs',
    value: '£1.2M',
    probability: '90%',
    nextAction: 'Final negotiations',
    dueDate: '2024-11-12',
  },
];

export default function DealsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Year');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeals = mockActiveDeals.filter(deal =>
    deal.dealName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium">{kpi.change}</span>
                  <span className="text-gray-500 text-sm ml-2">{kpi.changeLabel}</span>
                </div>
              </div>
              <div className={`${kpi.iconBg} p-3 rounded-full`}>
                <kpi.icon className={`${kpi.iconColor} text-xl`} size={24} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Deal Pipeline Overview */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Deal Pipeline Overview</h3>
          <div className="flex items-center space-x-2">
            {['This Month', 'This Quarter', 'This Year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {pipelineStages.map((stage, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg ${stage.color} ${stage.borderStyle}`}
            >
              <div className={`text-2xl font-bold ${stage.textColor}`}>{stage.count}</div>
              <div className={`text-sm font-medium mt-1 ${stage.textColor.replace('600', '700')}`}>
                {stage.name}
              </div>
              <div className={`text-xs mt-1 ${stage.textColor}`}>{stage.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Value Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Value Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-2 text-gray-300" />
              <p>Chart visualization would go here</p>
              <p className="text-sm">Integration with Recharts pending</p>
            </div>
          </div>
        </div>

        {/* Deal Stage Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Stage Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <PieChart size={48} className="mx-auto mb-2 text-gray-300" />
              <p>Pie chart visualization would go here</p>
              <p className="text-sm">Integration with Recharts pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Deals Table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Active Deals</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FileText className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
            </div>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Users className="mr-2" size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Deal Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Stage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Probability</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Next Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{deal.dealName}</td>
                  <td className="py-3 px-4 text-gray-600">{deal.property}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      deal.stage === 'Negotiation' ? 'bg-blue-100 text-blue-800' :
                      deal.stage === 'Proposal' ? 'bg-purple-100 text-purple-800' :
                      deal.stage === 'Due Diligence' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{deal.value}</td>
                  <td className="py-3 px-4 text-gray-600">{deal.probability}</td>
                  <td className="py-3 px-4 text-gray-600">{deal.nextAction}</td>
                  <td className="py-3 px-4 text-gray-600">{deal.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}