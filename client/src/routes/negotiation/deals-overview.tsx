import React, { useState } from "react";
import { PieChart, Plus, Filter, Download } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface Deal {
  id: string;
  propertyName: string;
  tenant: string;
  status: "active" | "pending" | "completed" | "stalled";
  value: number;
  stage: string;
  lastActivity: string;
  assignedTo: string;
}

const DealsOverview: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const deals: Deal[] = [
    {
      id: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      tenant: "TechCorp Ltd",
      status: "active",
      value: 2500000,
      stage: "Commercial Terms",
      lastActivity: "2024-11-01",
      assignedTo: "Sarah Chen",
    },
    {
      id: "deal-002",
      propertyName: "Manchester Retail Park",
      tenant: "Fashion Forward",
      status: "pending",
      value: 1800000,
      stage: "Legal Review",
      lastActivity: "2024-10-30",
      assignedTo: "John Smith",
    },
    {
      id: "deal-003",
      propertyName: "Birmingham Warehouse",
      tenant: "Logistics Plus",
      status: "stalled",
      value: 3200000,
      stage: "Heads of Terms",
      lastActivity: "2024-10-25",
      assignedTo: "Emma Wilson",
    },
  ];

  const columns = [
    {
      key: "propertyName",
      header: "Property",
      render: (value: string, row: Deal) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">{row.tenant}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : value === "completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "value",
      header: "Value",
      render: (value: number) => `£${(value / 1000000).toFixed(1)}M`,
      align: "right" as const,
    },
    {
      key: "stage",
      header: "Current Stage",
    },
    {
      key: "assignedTo",
      header: "Assigned To",
    },
    {
      key: "lastActivity",
      header: "Last Activity",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "stalled", label: "Stalled" },
      ],
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      type: "select" as const,
      options: [
        { value: "sarah", label: "Sarah Chen" },
        { value: "john", label: "John Smith" },
        { value: "emma", label: "Emma Wilson" },
      ],
    },
  ];

  const handleRowClick = (deal: Deal) => {
    console.log("Navigate to deal:", deal.id);
    // TODO: Navigate to deal detail page
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Deals Overview"
        description="Monitor and manage all active property deals and negotiations"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Deals Overview" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </>
        }
      />

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search deals, properties, or tenants..."
        filters={filterOptions}
      />

      {deals.length === 0 ? (
        <EmptyState
          icon={<PieChart className="w-8 h-8" />}
          title="No deals found"
          description="Get started by creating your first deal or adjust your search filters."
          action={{
            label: "Create New Deal",
            onClick: () => console.log("Create new deal"),
          }}
        />
      ) : (
        <Table
          data={deals}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No deals match your current filters"
        />
      )}
    </div>
  );
};

export default DealsOverview;
