import React, { useState } from "react";
import { Calculator, Plus, Edit, TrendingUp } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface Commercial {
  id: string;
  dealId: string;
  propertyName: string;
  rentPerSqFt: number;
  totalRent: number;
  serviceCharge: number;
  leaseTerm: number;
  rentFreeMonths: number;
  status: "draft" | "negotiating" | "agreed" | "rejected";
  lastUpdated: string;
  updatedBy: string;
}

const Commercials: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const commercials: Commercial[] = [
    {
      id: "comm-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      rentPerSqFt: 65,
      totalRent: 325000,
      serviceCharge: 15000,
      leaseTerm: 10,
      rentFreeMonths: 6,
      status: "negotiating",
      lastUpdated: "2024-11-01",
      updatedBy: "Sarah Chen",
    },
    {
      id: "comm-002",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      rentPerSqFt: 45,
      totalRent: 180000,
      serviceCharge: 8000,
      leaseTerm: 15,
      rentFreeMonths: 3,
      status: "agreed",
      lastUpdated: "2024-10-30",
      updatedBy: "John Smith",
    },
    {
      id: "comm-003",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      rentPerSqFt: 25,
      totalRent: 200000,
      serviceCharge: 5000,
      leaseTerm: 20,
      rentFreeMonths: 12,
      status: "draft",
      lastUpdated: "2024-10-28",
      updatedBy: "Emma Wilson",
    },
  ];

  const columns = [
    {
      key: "propertyName",
      header: "Property",
      render: (value: string, row: Commercial) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">Deal ID: {row.dealId}</div>
        </div>
      ),
    },
    {
      key: "rentPerSqFt",
      header: "Rent/sq ft",
      render: (value: number) => `£${value}`,
      align: "right" as const,
    },
    {
      key: "totalRent",
      header: "Total Rent",
      render: (value: number) => `£${value.toLocaleString()}`,
      align: "right" as const,
    },
    {
      key: "leaseTerm",
      header: "Lease Term",
      render: (value: number) => `${value} years`,
    },
    {
      key: "rentFreeMonths",
      header: "Rent Free",
      render: (value: number) => `${value} months`,
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "agreed"
              ? "bg-green-100 text-green-800"
              : value === "negotiating"
                ? "bg-yellow-100 text-yellow-800"
                : value === "draft"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "updatedBy",
      header: "Updated By",
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
        { value: "negotiating", label: "Negotiating" },
        { value: "agreed", label: "Agreed" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  ];

  const handleRowClick = (commercial: Commercial) => {
    console.log("Edit commercial:", commercial.id);
    // TODO: Open commercial edit modal or navigate to edit page
  };

  const totalValue = commercials.reduce((sum, comm) => sum + comm.totalRent, 0);
  const avgRentPerSqFt =
    commercials.length > 0
      ? commercials.reduce((sum, comm) => sum + comm.rentPerSqFt, 0) /
        commercials.length
      : 0;

  return (
    <div className="p-6">
      <PageHeader
        title="Commercials"
        description="Manage commercial terms, rent negotiations, and financial agreements"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Commercials" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Commercial
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Total Value</p>
              <p className="text-2xl font-bold text-slate">
                £{(totalValue / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">
                Avg Rent/sq ft
              </p>
              <p className="text-2xl font-bold text-slate">
                £{avgRentPerSqFt.toFixed(0)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">
                Active Negotiations
              </p>
              <p className="text-2xl font-bold text-slate">
                {commercials.filter(c => c.status === "negotiating").length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Edit className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search commercial terms..."
        filters={filterOptions}
      />

      {commercials.length === 0 ? (
        <EmptyState
          icon={<Calculator className="w-8 h-8" />}
          title="No commercial terms found"
          description="Start by creating commercial terms for your deals."
          action={{
            label: "Create Commercial Terms",
            onClick: () => console.log("Create commercial terms"),
          }}
        />
      ) : (
        <Table
          data={commercials}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No commercial terms match your current filters"
        />
      )}
    </div>
  );
};

export default Commercials;
