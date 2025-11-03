import React, { useState } from "react";
import {
  ListChecks,
  Plus,
  Calendar,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";
import PageHeader from "../../components/negotiation/PageHeader";
import Table from "../../components/negotiation/Table";
import FilterBar from "../../components/negotiation/FilterBar";
import EmptyState from "../../components/negotiation/EmptyState";
import { Button } from "../../components/ui/button";

interface Task {
  id: string;
  dealId: string;
  propertyName: string;
  title: string;
  type: "legal" | "technical" | "financial" | "administrative" | "marketing";
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "blocked" | "completed" | "cancelled";
  assignedTo: string;
  dueDate: string;
  estimatedHours?: number;
  actualHours?: number;
  completedDate?: string;
  createdAt: string;
}

const Tasks: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const tasks: Task[] = [
    {
      id: "task-001",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Review lease agreement terms",
      type: "legal",
      priority: "high",
      status: "in_progress",
      assignedTo: "Legal Team",
      dueDate: "2024-11-10",
      estimatedHours: 8,
      actualHours: 5,
      createdAt: "2024-10-25",
    },
    {
      id: "task-002",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Coordinate building inspection",
      type: "technical",
      priority: "medium",
      status: "completed",
      assignedTo: "Sarah Chen",
      dueDate: "2024-11-05",
      estimatedHours: 4,
      actualHours: 3,
      completedDate: "2024-11-03",
      createdAt: "2024-10-20",
    },
    {
      id: "task-003",
      dealId: "deal-002",
      propertyName: "Manchester Retail Park",
      title: "Prepare financial projections",
      type: "financial",
      priority: "urgent",
      status: "todo",
      assignedTo: "Finance Team",
      dueDate: "2024-11-08",
      estimatedHours: 12,
      createdAt: "2024-10-30",
    },
    {
      id: "task-004",
      dealId: "deal-003",
      propertyName: "Birmingham Warehouse",
      title: "Update marketing materials",
      type: "marketing",
      priority: "low",
      status: "blocked",
      assignedTo: "Marketing Team",
      dueDate: "2024-11-15",
      estimatedHours: 6,
      createdAt: "2024-10-28",
    },
    {
      id: "task-005",
      dealId: "deal-001",
      propertyName: "Canary Wharf Office Complex",
      title: "Schedule client meeting",
      type: "administrative",
      priority: "medium",
      status: "todo",
      assignedTo: "Emma Wilson",
      dueDate: "2024-11-12",
      estimatedHours: 2,
      createdAt: "2024-11-01",
    },
  ];

  const columns = [
    {
      key: "title",
      header: "Task",
      render: (value: string, row: Task) => (
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
              : value === "technical"
                ? "bg-blue-100 text-blue-800"
                : value === "financial"
                  ? "bg-green-100 text-green-800"
                  : value === "administrative"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-pink-100 text-pink-800"
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
            value === "completed"
              ? "bg-green-100 text-green-800"
              : value === "in_progress"
                ? "bg-blue-100 text-blue-800"
                : value === "blocked"
                  ? "bg-red-100 text-red-800"
                  : value === "cancelled"
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
      key: "assignedTo",
      header: "Assigned To",
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (value: string, row: Task) => {
        const dueDate = new Date(value);
        const today = new Date();
        const isOverdue = dueDate < today && row.status !== "completed";
        const isDueSoon =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 3;

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
      key: "estimatedHours",
      header: "Est. Hours",
      render: (value: number | undefined) => (value ? `${value}h` : "-"),
      align: "center" as const,
    },
    {
      key: "actualHours",
      header: "Actual Hours",
      render: (value: number | undefined) => (value ? `${value}h` : "-"),
      align: "center" as const,
    },
  ];

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "blocked", label: "Blocked" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      key: "type",
      label: "Type",
      type: "select" as const,
      options: [
        { value: "legal", label: "Legal" },
        { value: "technical", label: "Technical" },
        { value: "financial", label: "Financial" },
        { value: "administrative", label: "Administrative" },
        { value: "marketing", label: "Marketing" },
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

  const handleRowClick = (task: Task) => {
    console.log("View task:", task.id);
    // TODO: Navigate to task detail page
  };

  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const overdueTasks = tasks.filter(
    t => t.status !== "completed" && new Date(t.dueDate) < new Date()
  ).length;
  const inProgressTasks = tasks.filter(t => t.status === "in_progress").length;

  return (
    <div className="p-6">
      <PageHeader
        title="Task Management"
        description="Track and manage tasks across all property deals"
        breadcrumbs={[
          { label: "Negotiation", href: "/negotiation" },
          { label: "Task Management" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
            <Button size="sm" className="bg-slate hover:bg-slate/90">
              <Plus className="w-4 h-4 mr-2" />
              New Task
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
                {completedTasks}
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
              <p className="text-sm font-medium text-concrete">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {inProgressTasks}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-stone p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-concrete">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <User className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search tasks..."
        filters={filterOptions}
      />

      {tasks.length === 0 ? (
        <EmptyState
          icon={<ListChecks className="w-8 h-8" />}
          title="No tasks found"
          description="Start by creating your first task to track work progress."
          action={{
            label: "Create First Task",
            onClick: () => console.log("Create task"),
          }}
        />
      ) : (
        <Table
          data={tasks}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          emptyMessage="No tasks match your current filters"
        />
      )}
    </div>
  );
};

export default Tasks;
