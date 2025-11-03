import React, { useState } from "react";
import { Shield, Plus, AlertTriangle, TrendingUp, Target } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface RiskAssessment {
  id: string;
  dealId: string;
  propertyName: string;
  title: string;
  category:
    | "financial"
    | "legal"
    | "environmental"
    | "technical"
    | "market"
    | "operational"
    | "regulatory"
    | "reputational";
  impact: "very_low" | "low" | "medium" | "high" | "very_high";
  probability: "very_low" | "low" | "medium" | "high" | "very_high";
  riskScore: number;
  status:
    | "identified"
    | "assessed"
    | "mitigated"
    | "accepted"
    | "transferred"
    | "avoided";
  owner: string;
  identifiedAt: string;
  reviewDate: string;
  mitigationStrategy?: string;
}

const Risk: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const risks: RiskAssessment[] = [
    {
      id: "risk-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Market downturn affecting rental yields",
      category: "market",
      impact: "high",
      probability: "medium",
      riskScore: 15, // 4 * 3 = 12, but using 15 for demo
      status: "mitigated",
      owner: "Risk Manager",
      identifiedAt: "2024-10-15",
      reviewDate: "2024-12-15",
      mitigationStrategy: "Diversify tenant mix and secure long-term leases",
    },
    {
      id: "risk-002",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Environmental compliance issues",
      category: "environmental",
      impact: "very_high",
      probability: "low",
      riskScore: 10, // 5 * 2 = 10
      status: "assessed",
      owner: "Environmental Consultant",
      identifiedAt: "2024-10-20",
      reviewDate: "2024-11-20",
    },
    {
      id: "risk-003",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      title: "Tenant default on lease payments",
      category: "financial",
      impact: "high",
      probability: "high",
      riskScore: 20, // 4 * 4 = 16, but using 20 for demo
      status: "identified",
      owner: "Finance Team",
      identifiedAt: "2024-10-25",
      reviewDate: "2024-11-25",
    },
    {
      id: "risk-004",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      title: "Planning permission delays",
      category: "regulatory",
      impact: "medium",
      probability: "high",
      riskScore: 12, // 3 * 4 = 12
      status: "accepted",
      owner: "Planning Team",
      identifiedAt: "2024-10-28",
      reviewDate: "2024-12-28",
    },
  ];

  const getRiskLevel = (score: number): { level: string; color: string } => {
    if (score >= 20)
      return { level: "Critical", color: "bg-red-100 text-red-800" };
    if (score >= 15)
      return { level: "High", color: "bg-orange-100 text-orange-800" };
    if (score >= 10)
      return { level: "Medium", color: "bg-yellow-100 text-yellow-800" };
    if (score >= 5)
      return { level: "Low", color: "bg-green-100 text-green-800" };
    return { level: "Very Low", color: "bg-gray-100 text-gray-800" };
  };

  const columns = [
    {
      key: "title",
      header: "Risk",
      render: (value: string, row: RiskAssessment) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">{row.propertyName}</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "financial"
              ? "bg-green-100 text-green-800"
              : value === "legal"
                ? "bg-purple-100 text-purple-800"
                : value === "environmental"
                  ? "bg-blue-100 text-blue-800"
                  : value === "technical"
                    ? "bg-orange-100 text-orange-800"
                    : value === "market"
                      ? "bg-pink-100 text-pink-800"
                      : value === "operational"
                        ? "bg-yellow-100 text-yellow-800"
                        : value === "regulatory"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "impact",
      header: "Impact",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "very_high"
              ? "bg-red-100 text-red-800"
              : value === "high"
                ? "bg-orange-100 text-orange-800"
                : value === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : value === "low"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {value
            .replace("_", " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      ),
    },
    {
      key: "probability",
      header: "Probability",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "very_high"
              ? "bg-red-100 text-red-800"
              : value === "high"
                ? "bg-orange-100 text-orange-800"
                : value === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : value === "low"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {value
            .replace("_", " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      ),
    },
    {
      key: "riskScore",
      header: "Risk Level",
      render: (value: number) => {
        const { level, color } = getRiskLevel(value);
        return (
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${color}`}
            >
              {level}
            </span>
            <span className="text-xs text-concrete">({value})</span>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "mitigated"
              ? "bg-green-100 text-green-800"
              : value === "assessed"
                ? "bg-blue-100 text-blue-800"
                : value === "accepted"
                  ? "bg-yellow-100 text-yellow-800"
                  : value === "transferred"
                    ? "bg-purple-100 text-purple-800"
                    : value === "avoided"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-orange-100 text-orange-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "owner",
      header: "Owner",
    },
    {
      key: "reviewDate",
      header: "Review Date",
      render: (value: string) => {
        const reviewDate = new Date(value);
        const today = new Date();
        const isDueSoon =
          (reviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <=
          30;

        return (
          <div className={isDueSoon ? "text-orange-600" : ""}>
            {reviewDate.toLocaleDateString()}
            {isDueSoon && <div className="text-xs">Due soon</div>}
          </div>
        );
      },
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "identified", label: "Identified" },
        { value: "assessed", label: "Assessed" },
        { value: "mitigated", label: "Mitigated" },
        { value: "accepted", label: "Accepted" },
        { value: "transferred", label: "Transferred" },
        { value: "avoided", label: "Avoided" },
      ],
    },
    {
      key: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { value: "financial", label: "Financial" },
        { value: "legal", label: "Legal" },
        { value: "environmental", label: "Environmental" },
        { value: "technical", label: "Technical" },
        { value: "market", label: "Market" },
        { value: "operational", label: "Operational" },
        { value: "regulatory", label: "Regulatory" },
        { value: "reputational", label: "Reputational" },
      ],
    },
  ];

  const handleRowClick = (risk: RiskAssessment) => {
    console.log("View risk:", risk.id);
    // TODO: Navigate to risk detail page
  };

  const criticalRisks = risks.filter(r => r.riskScore >= 20).length;
  const highRisks = risks.filter(
    r => r.riskScore >= 15 && r.riskScore < 20
  ).length;
  const mitigatedRisks = risks.filter(r => r.status === "mitigated").length;

  return (
    <div className="p-6">
      <PageHeader
        title="Risk Assessment"
        description="Identify, assess, and manage risks across all property deals"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Risk Assessment" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Risk Matrix
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Risk
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">
                Critical Risks
              </p>
              <p className="text-2xl font-bold text-red-600">{criticalRisks}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">High Risks</p>
              <p className="text-2xl font-bold text-orange-600">{highRisks}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Mitigated</p>
              <p className="text-2xl font-bold text-green-600">
                {mitigatedRisks}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search risks..."
        filters={filterOptions}
      />

      {risks.length === 0 ? (
        <EmptyState
          icon={<Shield className="w-8 h-8" />}
          title="No risks identified"
          description="Start by identifying and assessing potential risks for your deals."
          action={{
            label: "Add First Risk",
            onClick: () => console.log("Add risk"),
          }}
        />
      ) : (
        <Table
          data={risks}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No risks match your current filters"
        />
      )}
    </div>
  );
};

export default Risk;
