import React, { useState } from "react";
import {
  Hammer,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import BadgeNew from "../../components/negotiation/BadgeNew";
import { Button } from "../../components/ui/button";

interface FitoutMilestone {
  id: string;
  dealId: string;
  propertyName: string;
  title: string;
  category: "planning" | "design" | "construction" | "compliance" | "handover";
  status: "not_started" | "in_progress" | "completed" | "delayed" | "blocked";
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;
  assignedTo: string;
  estimatedCost: number;
  actualCost?: number;
  completionPercentage: number;
}

const FitoutMilestones: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const milestones: FitoutMilestone[] = [
    {
      id: "milestone-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Planning Permission Approval",
      category: "planning",
      status: "completed",
      priority: "high",
      dueDate: "2024-10-15",
      assignedTo: "Planning Team",
      estimatedCost: 25000,
      actualCost: 23500,
      completionPercentage: 100,
    },
    {
      id: "milestone-002",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Interior Design Finalization",
      category: "design",
      status: "in_progress",
      priority: "medium",
      dueDate: "2024-11-20",
      assignedTo: "Design Studio",
      estimatedCost: 45000,
      completionPercentage: 65,
    },
    {
      id: "milestone-003",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      title: "Fire Safety Compliance",
      category: "compliance",
      status: "delayed",
      priority: "critical",
      dueDate: "2024-11-01",
      assignedTo: "Safety Consultant",
      estimatedCost: 15000,
      completionPercentage: 30,
    },
    {
      id: "milestone-004",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      title: "HVAC System Installation",
      category: "construction",
      status: "not_started",
      priority: "high",
      dueDate: "2024-12-15",
      assignedTo: "HVAC Contractor",
      estimatedCost: 85000,
      completionPercentage: 0,
    },
  ];

  const columns = [
    {
      key: "title",
      header: "Milestone",
      render: (value: string, row: FitoutMilestone) => (
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
            value === "planning"
              ? "bg-blue-100 text-blue-800"
              : value === "design"
                ? "bg-purple-100 text-purple-800"
                : value === "construction"
                  ? "bg-orange-100 text-orange-800"
                  : value === "compliance"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "completed"
              ? "bg-green-100 text-green-800"
              : value === "in_progress"
                ? "bg-blue-100 text-blue-800"
                : value === "delayed"
                  ? "bg-red-100 text-red-800"
                  : value === "blocked"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value.replace("_", " ").charAt(0).toUpperCase() +
            value.replace("_", " ").slice(1)}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "critical"
              ? "bg-red-100 text-red-800"
              : value === "high"
                ? "bg-orange-100 text-orange-800"
                : value === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "completionPercentage",
      header: "Progress",
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                value === 100
                  ? "bg-green-500"
                  : value >= 75
                    ? "bg-blue-500"
                    : value >= 50
                      ? "bg-yellow-500"
                      : value >= 25
                        ? "bg-orange-500"
                        : "bg-red-500"
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-xs text-concrete">{value}%</span>
        </div>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string, row: FitoutMilestone) => {
        const dueDate = new Date(value);
        const today = new Date();
        const isOverdue = dueDate < today && row.status !== "completed";
        const isDueSoon =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 7;

        return (
          <div
            className={`${isOverdue ? "text-red-600" : isDueSoon ? "text-orange-600" : ""}`}
          >
            {dueDate.toLocaleDateString()}
            {isOverdue && <div className="text-xs">Overdue</div>}
            {isDueSoon && !isOverdue && <div className="text-xs">Due soon</div>}
          </div>
        );
      },
    },
    {
      key: "estimatedCost",
      header: "Est. Cost",
      render: (value: number) => `£${value.toLocaleString()}`,
      align: "right" as const,
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "not_started", label: "Not Started" },
        { value: "in_progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
        { value: "delayed", label: "Delayed" },
        { value: "blocked", label: "Blocked" },
      ],
    },
    {
      key: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { value: "planning", label: "Planning" },
        { value: "design", label: "Design" },
        { value: "construction", label: "Construction" },
        { value: "compliance", label: "Compliance" },
        { value: "handover", label: "Handover" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select" as const,
      options: [
        { value: "critical", label: "Critical" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
  ];

  const handleRowClick = (milestone: FitoutMilestone) => {
    console.log("View milestone:", milestone.id);
    // TODO: Navigate to milestone detail page
  };

  const completedCount = milestones.filter(
    m => m.status === "completed"
  ).length;
  const delayedCount = milestones.filter(m => m.status === "delayed").length;
  const totalEstimatedCost = milestones.reduce(
    (sum, m) => sum + m.estimatedCost,
    0
  );

  return (
    <div className="p-6">
      <PageHeader
        title={
          <div className="flex items-center space-x-3">
            <span>Fit-Out & Milestones</span>
            <BadgeNew featureFlag="fitOutMilestonesNew" />
          </div>
        }
        description="Track fit-out progress, milestones, and project deliverables"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Fit-Out & Milestones" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Timeline View
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Milestone
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {completedCount}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Delayed</p>
              <p className="text-2xl font-bold text-red-600">{delayedCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Total Budget</p>
              <p className="text-2xl font-bold text-slate">
                £{(totalEstimatedCost / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Hammer className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search milestones..."
        filters={filterOptions}
      />

      {milestones.length === 0 ? (
        <EmptyState
          icon={<Hammer className="w-8 h-8" />}
          title="No milestones found"
          description="Start tracking your fit-out progress by creating milestones."
          action={{
            label: "Create First Milestone",
            onClick: () => console.log("Create milestone"),
          }}
        />
      ) : (
        <Table
          data={milestones}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No milestones match your current filters"
        />
      )}
    </div>
  );
};

export default FitoutMilestones;
