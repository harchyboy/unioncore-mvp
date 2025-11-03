import React, { useState } from "react";
import {
  Banknote,
  Plus,
  FileText,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import BadgeNew from "../../components/negotiation/BadgeNew";
import { Button } from "../../components/ui/button";

interface ContractFee {
  id: string;
  dealId: string;
  propertyName: string;
  type: "legal" | "survey" | "valuation" | "agent" | "management" | "other";
  description: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  payee: string;
  dueDate: string;
  status: "pending" | "approved" | "paid" | "overdue" | "disputed";
  invoiceNumber?: string;
}

const ContractsFees: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"contracts" | "fees">("fees");

  // Mock data - replace with actual API call
  const fees: ContractFee[] = [
    {
      id: "fee-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      type: "legal",
      description: "Legal review and documentation",
      amount: 15000,
      vatAmount: 3000,
      totalAmount: 18000,
      payee: "Legal Partners LLP",
      dueDate: "2024-11-15",
      status: "pending",
      invoiceNumber: "INV-2024-001",
    },
    {
      id: "fee-002",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      type: "survey",
      description: "Building condition survey",
      amount: 8500,
      vatAmount: 1700,
      totalAmount: 10200,
      payee: "Survey Experts Ltd",
      dueDate: "2024-11-10",
      status: "paid",
    },
    {
      id: "fee-003",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      type: "valuation",
      description: "Property valuation report",
      amount: 5000,
      vatAmount: 1000,
      totalAmount: 6000,
      payee: "Valuation Services",
      dueDate: "2024-11-05",
      status: "overdue",
      invoiceNumber: "VAL-2024-045",
    },
    {
      id: "fee-004",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      type: "agent",
      description: "Agent commission",
      amount: 25000,
      vatAmount: 5000,
      totalAmount: 30000,
      payee: "Commercial Agents Ltd",
      dueDate: "2024-12-01",
      status: "approved",
    },
  ];

  const columns = [
    {
      key: "description",
      header: "Description",
      render: (value: string, row: ContractFee) => (
        <div>
          <div className="font-medium text-slate">{value}</div>
          <div className="text-xs text-concrete">{row.propertyName}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "legal"
              ? "bg-purple-100 text-purple-800"
              : value === "survey"
                ? "bg-blue-100 text-blue-800"
                : value === "valuation"
                  ? "bg-green-100 text-green-800"
                  : value === "agent"
                    ? "bg-orange-100 text-orange-800"
                    : value === "management"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      render: (value: number) => `£${value.toLocaleString()}`,
      align: "right" as const,
    },
    {
      key: "payee",
      header: "Payee",
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === "paid"
              ? "bg-green-100 text-green-800"
              : value === "approved"
                ? "bg-blue-100 text-blue-800"
                : value === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : value === "overdue"
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string, row: ContractFee) => {
        const dueDate = new Date(value);
        const today = new Date();
        const isOverdue = dueDate < today && row.status !== "paid";
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
      key: "invoiceNumber",
      header: "Invoice #",
      render: (value: string) => value || "-",
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
        { value: "paid", label: "Paid" },
        { value: "overdue", label: "Overdue" },
        { value: "disputed", label: "Disputed" },
      ],
    },
    {
      key: "type",
      label: "Type",
      type: "select" as const,
      options: [
        { value: "legal", label: "Legal" },
        { value: "survey", label: "Survey" },
        { value: "valuation", label: "Valuation" },
        { value: "agent", label: "Agent" },
        { value: "management", label: "Management" },
        { value: "other", label: "Other" },
      ],
    },
  ];

  const handleRowClick = (fee: ContractFee) => {
    console.log("View fee:", fee.id);
    // TODO: Navigate to fee detail page
  };

  const totalFees = fees.reduce((sum, fee) => sum + fee.totalAmount, 0);
  const pendingFees = fees.filter(f => f.status === "pending").length;
  const overdueFees = fees.filter(f => f.status === "overdue").length;

  return (
    <div className="p-6">
      <PageHeader
        title={
          <div className="flex items-center space-x-3">
            <span>Contracts & Fees</span>
            <BadgeNew featureFlag="contractsFeesNew" />
          </div>
        }
        description="Manage contracts, track fees, and monitor payment schedules"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Contracts & Fees" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Report
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Fee
            </Button>
          </>
        }
      />

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("fees")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "fees"
              ? "bg-slate text-white"
              : "text-concrete hover:text-slate hover:bg-stone"
          }`}
        >
          Fees & Payments
        </button>
        <button
          onClick={() => setActiveTab("contracts")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === "contracts"
              ? "bg-slate text-white"
              : "text-concrete hover:text-slate hover:bg-stone"
          }`}
        >
          Contracts
        </button>
      </div>

      {activeTab === "fees" && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg border border-stone p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-concrete">
                    Total Fees
                  </p>
                  <p className="text-2xl font-bold text-slate">
                    £{(totalFees / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Banknote className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-stone p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-concrete">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingFees}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-stone p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-concrete">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">
                    {overdueFees}
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <FilterBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search fees and payments..."
            filters={filterOptions}
          />

          {fees.length === 0 ? (
            <EmptyState
              icon={<Banknote className="w-8 h-8" />}
              title="No fees found"
              description="Start by adding fees and payment schedules for your deals."
              action={{
                label: "Add First Fee",
                onClick: () => console.log("Add fee"),
              }}
            />
          ) : (
            <Table
              data={fees}
              columns={columns}
              loading={loading}
              onRowClick={handleRowClick}
              emptyMessage="No fees match your current filters"
            />
          )}
        </>
      )}

      {activeTab === "contracts" && (
        <div className="bg-white rounded-lg border border-stone p-12 text-center">
          <FileText className="w-16 h-16 text-concrete mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate mb-2">
            Contracts Management
          </h3>
          <p className="text-concrete mb-6">
            Contract management functionality coming soon.
          </p>
          <Button className="bg-slate hover:bg-slate/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Contract
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContractsFees;
