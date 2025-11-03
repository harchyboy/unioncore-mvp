import React from "react";

const DealFlowFunnel: React.FC = () => {
  const funnelData = [
    { stage: "Leads", count: 247, percentage: 100, color: "bg-blue-500" },
    { stage: "Qualified", count: 156, percentage: 63, color: "bg-green-500" },
    { stage: "Viewing", count: 89, percentage: 36, color: "bg-yellow-500" },
    { stage: "Proposal", count: 34, percentage: 14, color: "bg-orange-500" },
    { stage: "Closed", count: 12, percentage: 5, color: "bg-purple-500" },
  ];

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-stone">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate">Deal Flow Funnel</h2>
          <div className="text-sm text-concrete">Last 30 days</div>
        </div>

        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-slate">
                {stage.stage}
              </div>
              <div className="flex-1 relative">
                <div className="h-8 bg-stone rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${stage.color} transition-all duration-500`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-white mix-blend-difference">
                    {stage.count}
                  </span>
                </div>
              </div>
              <div className="w-16 text-sm text-concrete text-right">
                {stage.percentage}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-stone">
          <div className="flex justify-between text-sm">
            <span className="text-concrete">Conversion Rate</span>
            <span className="font-medium text-slate">4.9%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealFlowFunnel;
