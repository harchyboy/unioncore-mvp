import React, { useState } from "react";
import { FileSignature, Plus, Edit, Eye, MessageSquare } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface HeadsOfTerms {
  id: string;
  dealId: string;
  propertyName: string;
  tenant: string;
  landlord: string;
  status: "draft" | "under_review" | "agreed" | "signed";
  version: number;
  redlineCount: number;
  pendingRedlines: number;
  lastUpdated: string;
  createdBy: string;
}

const HotsRedlines: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const hotsData: HeadsOfTerms[] = [
    {
      id: "hots-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      tenant: "TechCorp Ltd",
      landlord: "Canary Wharf Group",
      status: "under_review",
      version: 3,
      redlineCount: 12,
      pendingRedlines: 5,
      lastUpdated: "2024-11-01",
      createdBy: "Sarah Chen",
    },
    {
      id: "hots-002",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      tenant: "Fashion Forward",
      landlord: "Retail Properties Ltd",
      status: "agreed",
      version: 2,
      redlineCount: 8,
      pendingRedlines: 0,
      lastUpdated: "2024-10-30",
      createdBy: "John Smith",
    },
    {
      id: "hots-003",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      tenant: "Logistics Plus",
      landlord: "Industrial Estates",
      status: "draft",
      version: 1,
      redlineCount: 3,
      pendingRedlines: 3,
      lastUpdated: "2024-10-28",
      createdBy: "Emma Wilson",
    },
  ];

  const columns = [
    {
      key: "propertyName",
      header: "Property",
      render: (value: string, row: HeadsOfTerms) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">
            {row.tenant} ↔ {row.landlord}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "signed"
              ? "bg-green-100 text-green-800"
              : value === "agreed"
                ? "bg-blue-100 text-blue-800"
                : value === "under_review"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {value.replace("_", " ").charAt(0).toUpperCase() +
            value.replace("_", " ").slice(1)}
        </span>
      ),
    },
    {
      key: "version",
      header: "Version",
      render: (value: number) => `v${value}`,
    },
    {
      key: "redlineCount",
      header: "Total Redlines",
      align: "center" as const,
    },
    {
      key: "pendingRedlines",
      header: "Pending",
      render: (value: number) => (
        <div className="flex items-center justify-center">
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              value === 0
                ? "bg-green-100 text-green-800"
                : value <= 3
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        </div>
      ),
      align: "center" as const,
    },
    {
      key: "createdBy",
      header: "Created By",
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "draft", label: "Draft" },
        { value: "under_review", label: "Under Review" },
        { value: "agreed", label: "Agreed" },
        { value: "signed", label: "Signed" },
      ],
    },
  ];

  const handleRowClick = (hots: HeadsOfTerms) => {
    console.log("View HoTs:", hots.id);
    // TODO: Navigate to HoTs detail page
  };

  const totalRedlines = hotsData.reduce(
    (sum, hots) => sum + hots.redlineCount,
    0
  );
  const totalPending = hotsData.reduce(
    (sum, hots) => sum + hots.pendingRedlines,
    0
  );
  const completedHots = hotsData.filter(
    h => h.status === "agreed" || h.status === "signed"
  ).length;

  return (
    <div className="p-6">
      <PageHeader
        title="HoTs & Redlines"
        description="Manage Heads of Terms documents and track redline negotiations"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "HoTs & Redlines" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All Redlines
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New HoTs
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
                Total Redlines
              </p>
              <p className="text-2xl font-bold text-slate">{totalRedlines}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">
                Pending Redlines
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {totalPending}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">
                Completed HoTs
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedHots}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FileSignature className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search HoTs documents..."
        filters={filterOptions}
      />

      {hotsData.length === 0 ? (
        <EmptyState
          icon={<FileSignature className="w-8 h-8" />}
          title="No HoTs documents found"
          description="Start by creating your first Heads of Terms document."
          action={{
            label: "Create HoTs Document",
            onClick: () => console.log("Create HoTs"),
          }}
        />
      ) : (
        <Table
          data={hotsData}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No HoTs documents match your current filters"
        />
      )}
    </div>
  );
};

export default HotsRedlines;
