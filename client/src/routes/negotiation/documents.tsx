import React, { useState } from "react";
import { FolderOpen, Plus, Upload, Download, Eye, Lock } from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface Document {
  id: string;
  dealId: string;
  propertyName: string;
  name: string;
  type:
    | "lease"
    | "heads_of_terms"
    | "survey"
    | "valuation"
    | "planning_permission"
    | "legal_report"
    | "other";
  category: "legal" | "technical" | "financial" | "compliance" | "marketing";
  fileSize: number;
  version: number;
  status: "draft" | "under_review" | "approved" | "rejected" | "archived";
  confidential: boolean;
  uploadedBy: string;
  uploadedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

const Documents: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const documents: Document[] = [
    {
      id: "doc-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      name: "Building Survey Report.pdf",
      type: "survey",
      category: "technical",
      fileSize: 2048000, // 2MB
      version: 1,
      status: "approved",
      confidential: false,
      uploadedBy: "Sarah Chen",
      uploadedAt: "2024-10-15",
      reviewedBy: "Technical Team",
      reviewedAt: "2024-10-20",
    },
    {
      id: "doc-002",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      name: "Legal Due Diligence Report.pdf",
      type: "legal_report",
      category: "legal",
      fileSize: 1536000, // 1.5MB
      version: 2,
      status: "under_review",
      confidential: true,
      uploadedBy: "Legal Team",
      uploadedAt: "2024-10-25",
    },
    {
      id: "doc-003",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      name: "Property Valuation.pdf",
      type: "valuation",
      category: "financial",
      fileSize: 512000, // 512KB
      version: 1,
      status: "approved",
      confidential: false,
      uploadedBy: "John Smith",
      uploadedAt: "2024-10-30",
      reviewedBy: "Finance Team",
      reviewedAt: "2024-11-01",
    },
    {
      id: "doc-004",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      name: "Planning Permission Application.pdf",
      type: "planning_permission",
      category: "compliance",
      fileSize: 3072000, // 3MB
      version: 1,
      status: "draft",
      confidential: false,
      uploadedBy: "Emma Wilson",
      uploadedAt: "2024-10-28",
    },
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const columns = [
    {
      key: "name",
      header: "Document",
      render: (value: string, row: Document) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <FolderOpen className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="font-medium text-slate flex items-center space-x-2">
              <span>{value}</span>
              {row.confidential && <Lock className="w-3 h-3 text-red-500" />}
            </div>
            <div className="text-xs text-concrete">{row.propertyName}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "lease"
              ? "bg-green-100 text-green-800"
              : value === "heads_of_terms"
                ? "bg-blue-100 text-blue-800"
                : value === "survey"
                  ? "bg-purple-100 text-purple-800"
                  : value === "valuation"
                    ? "bg-orange-100 text-orange-800"
                    : value === "planning_permission"
                      ? "bg-yellow-100 text-yellow-800"
                      : value === "legal_report"
                        ? "bg-red-100 text-red-800"
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
      key: "category",
      header: "Category",
      render: (value: string) => (
        <span className="text-sm text-slate capitalize">{value}</span>
      ),
    },
    {
      key: "fileSize",
      header: "Size",
      render: (value: number) => formatFileSize(value),
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "approved"
              ? "bg-green-100 text-green-800"
              : value === "under_review"
                ? "bg-yellow-100 text-yellow-800"
                : value === "draft"
                  ? "bg-gray-100 text-gray-800"
                  : value === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
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
      key: "uploadedBy",
      header: "Uploaded By",
    },
    {
      key: "uploadedAt",
      header: "Upload Date",
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
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "archived", label: "Archived" },
      ],
    },
    {
      key: "type",
      label: "Type",
      type: "select" as const,
      options: [
        { value: "lease", label: "Lease" },
        { value: "heads_of_terms", label: "Heads of Terms" },
        { value: "survey", label: "Survey" },
        { value: "valuation", label: "Valuation" },
        { value: "planning_permission", label: "Planning Permission" },
        { value: "legal_report", label: "Legal Report" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { value: "legal", label: "Legal" },
        { value: "technical", label: "Technical" },
        { value: "financial", label: "Financial" },
        { value: "compliance", label: "Compliance" },
        { value: "marketing", label: "Marketing" },
      ],
    },
  ];

  const handleRowClick = (document: Document) => {
    console.log("View document:", document.id);
    // TODO: Open document viewer or download
  };

  const totalDocuments = documents.length;
  const approvedDocuments = documents.filter(
    d => d.status === "approved"
  ).length;
  const confidentialDocuments = documents.filter(d => d.confidential).length;

  return (
    <div className="p-6">
      <PageHeader
        title="Document Management"
        description="Organize, review, and manage all deal-related documents"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Document Management" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Bulk Download
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
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
                Total Documents
              </p>
              <p className="text-2xl font-bold text-slate">{totalDocuments}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {approvedDocuments}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Confidential</p>
              <p className="text-2xl font-bold text-red-600">
                {confidentialDocuments}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search documents..."
        filters={filterOptions}
      />

      {documents.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="w-8 h-8" />}
          title="No documents found"
          description="Start by uploading your first document."
          action={{
            label: "Upload Document",
            onClick: () => console.log("Upload document"),
          }}
        />
      ) : (
        <Table
          data={documents}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No documents match your current filters"
        />
      )}
    </div>
  );
};

export default Documents;
