import React, { useState } from "react";
import { CheckCircle2, Plus, Clock, AlertTriangle, User } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface ApprovalRequest {
  id: string;
  dealId: string;
  dealName: string;
  type: "commercial" | "legal" | "financial" | "technical" | "environmental";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "rejected" | "requires_changes";
  title: string;
  requestedBy: string;
  assignedTo: string;
  requestedAt: string;
  dueDate: string;
}

const ApprovalsPending: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const approvals: ApprovalRequest[] = [
    {
      id: "app-001",
      dealId: "deal-001",
      dealName: "Canary Wharf Office Complex",
      type: "commercial",
      priority: "high",
      status: "pending",
      title: "Commercial Terms Approval",
      requestedBy: "Sarah Chen",
      assignedTo: "Max Williams",
      requestedAt: "2024-11-01",
      dueDate: "2024-11-05",
    },
    {
      id: "app-002",
      dealId: "deal-002",
      dealName: "Manchester Retail Park",
      type: "legal",
      priority: "urgent",
      status: "pending",
      title: "Legal Documentation Review",
      requestedBy: "John Smith",
      assignedTo: "Legal Team",
      requestedAt: "2024-10-30",
      dueDate: "2024-11-03",
    },
    {
      id: "app-003",
      dealId: "deal-003",
      dealName: "Birmingham Warehouse",
      type: "environmental",
      priority: "medium",
      status: "requires_changes",
      title: "Environmental Impact Assessment",
      requestedBy: "Emma Wilson",
      assignedTo: "Environmental Consultant",
      requestedAt: "2024-10-28",
      dueDate: "2024-11-10",
    },
  ];

  const columns = [
    {
      key: "title",
      header: "Request",
      render: (value: string, row: ApprovalRequest) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">{row.dealName}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "commercial"
              ? "bg-blue-100 text-blue-800"
              : value === "legal"
                ? "bg-purple-100 text-purple-800"
                : value === "financial"
                  ? "bg-green-100 text-green-800"
                  : value === "technical"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "urgent"
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
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "approved"
              ? "bg-green-100 text-green-800"
              : value === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : value === "requires_changes"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
          }`}
        >
          {value.replace("_", " ").charAt(0).toUpperCase() +
            value.replace("_", " ").slice(1)}
        </span>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string) => {
        const dueDate = new Date(value);
        const today = new Date();
        const isOverdue = dueDate < today;
        const isDueSoon =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 2;

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
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "requires_changes", label: "Requires Changes" },
      ],
    },
    {
      key: "type",
      label: "Type",
      type: "select" as const,
      options: [
        { value: "commercial", label: "Commercial" },
        { value: "legal", label: "Legal" },
        { value: "financial", label: "Financial" },
        { value: "technical", label: "Technical" },
        { value: "environmental", label: "Environmental" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select" as const,
      options: [
        { value: "urgent", label: "Urgent" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
      ],
    },
  ];

  const handleRowClick = (approval: ApprovalRequest) => {
    console.log("View approval:", approval.id);
    // TODO: Navigate to approval detail page
  };

  const pendingCount = approvals.filter(a => a.status === "pending").length;
  const overdueCount = approvals.filter(
    a => a.status === "pending" && new Date(a.dueDate) < new Date()
  ).length;
  const urgentCount = approvals.filter(
    a => a.status === "pending" && a.priority === "urgent"
  ).length;

  return (
    <div className="p-6">
      <PageHeader
        title="Pending Approvals"
        description="Review and manage approval requests across all deals"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Pending Approvals" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Assign Bulk
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Request
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
                Pending Approvals
              </p>
              <p className="text-2xl font-bold text-slate">{pendingCount}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Urgent</p>
              <p className="text-2xl font-bold text-orange-600">
                {urgentCount}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search approval requests..."
        filters={filterOptions}
      />

      {approvals.length === 0 ? (
        <EmptyState
          icon={<CheckCircle2 className="w-8 h-8" />}
          title="No approval requests found"
          description="All caught up! No pending approvals at the moment."
          action={{
            label: "Create New Request",
            onClick: () => console.log("Create approval request"),
          }}
        />
      ) : (
        <Table
          data={approvals}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No approval requests match your current filters"
        />
      )}
    </div>
  );
};

export default ApprovalsPending;
