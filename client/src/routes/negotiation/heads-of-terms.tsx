import React, { useState } from "react";
import { FileSignature, Plus, Download, Edit, Eye } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface HeadsOfTermsDocument {
  id: string;
  dealId: string;
  propertyName: string;
  tenant: string;
  landlord: string;
  premises: string;
  area: number;
  term: number;
  rent: number;
  status: "draft" | "under_review" | "agreed" | "signed";
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const HeadsOfTerms: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const hotsDocuments: HeadsOfTermsDocument[] = [
    {
      id: "hots-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      tenant: "TechCorp Ltd",
      landlord: "Canary Wharf Group",
      premises: "Floors 15-17, Building A",
      area: 5000,
      term: 10,
      rent: 325000,
      status: "under_review",
      version: 3,
      createdAt: "2024-10-15",
      updatedAt: "2024-11-01",
      createdBy: "Sarah Chen",
    },
    {
      id: "hots-002",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      tenant: "Fashion Forward",
      landlord: "Retail Properties Ltd",
      premises: "Unit 12, Ground Floor",
      area: 4000,
      term: 15,
      rent: 180000,
      status: "agreed",
      version: 2,
      createdAt: "2024-10-20",
      updatedAt: "2024-10-30",
      createdBy: "John Smith",
    },
    {
      id: "hots-003",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      tenant: "Logistics Plus",
      landlord: "Industrial Estates",
      premises: "Warehouse Block C",
      area: 8000,
      term: 20,
      rent: 200000,
      status: "draft",
      version: 1,
      createdAt: "2024-10-25",
      updatedAt: "2024-10-28",
      createdBy: "Emma Wilson",
    },
  ];

  const columns = [
    {
      key: "propertyName",
      header: "Property",
      render: (value: string, row: HeadsOfTermsDocument) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">{row.premises}</div>
        </div>
      ),
    },
    {
      key: "tenant",
      header: "Parties",
      render: (value: string, row: HeadsOfTermsDocument) => (
        <div>
          <div className="text-sm text-slate">{value}</div>
          <div className="text-xs text-concrete">↕</div>
          <div className="text-sm text-slate">{row.landlord}</div>
        </div>
      ),
    },
    {
      key: "area",
      header: "Area",
      render: (value: number) => `${value.toLocaleString()} sq ft`,
    },
    {
      key: "term",
      header: "Term",
      render: (value: number) => `${value} years`,
    },
    {
      key: "rent",
      header: "Annual Rent",
      render: (value: number) => `£${value.toLocaleString()}`,
      align: "right" as const,
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
      key: "updatedAt",
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

  const handleRowClick = (hots: HeadsOfTermsDocument) => {
    console.log("View HoTs:", hots.id);
    // TODO: Navigate to HoTs detail page
  };

  const totalValue = hotsDocuments.reduce((sum, hots) => sum + hots.rent, 0);
  const signedCount = hotsDocuments.filter(h => h.status === "signed").length;
  const draftCount = hotsDocuments.filter(h => h.status === "draft").length;

  return (
    <div className="p-6">
      <PageHeader
        title="Heads of Terms"
        description="Create, manage, and track Heads of Terms documents for property deals"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Heads of Terms" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
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
              <p className="text-sm font-medium text-concrete">Total Value</p>
              <p className="text-2xl font-bold text-slate">
                £{(totalValue / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FileSignature className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Signed</p>
              <p className="text-2xl font-bold text-green-600">{signedCount}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">In Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{draftCount}</p>
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
        searchPlaceholder="Search HoTs documents..."
        filters={filterOptions}
      />

      {hotsDocuments.length === 0 ? (
        <EmptyState
          icon={<FileSignature className="w-8 h-8" />}
          title="No Heads of Terms found"
          description="Start by creating your first Heads of Terms document."
          action={{
            label: "Create HoTs Document",
            onClick: () => console.log("Create HoTs"),
          }}
        />
      ) : (
        <Table
          data={hotsDocuments}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No HoTs documents match your current filters"
        />
      )}
    </div>
  );
};

export default HeadsOfTerms;
