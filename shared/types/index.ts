// Shared TypeScript types for UnionCore MVP

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  size: number;
  occupancy: number;
  revenue: number;
  status: "available" | "occupied" | "maintenance";
  images?: string[];
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "qualified" | "viewing" | "proposal" | "closed";
  source: string;
  requirements: {
    size: number;
    budget: number;
    location: string;
    moveInDate: string;
  };
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  leadId: string;
  propertyId: string;
  status: "negotiation" | "approval" | "contract" | "completed";
  value: number;
  commission: number;
  brokerId: string;
  startDate: string;
  endDate: string;
  terms: string;
}

export interface KPIData {
  totalProperties: number;
  occupancyRate: number;
  totalRevenue: number;
  activeLeads: number;
  conversionRate: number;
  averageDealSize: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface SearchResult {
  id: string;
  type: "property" | "lead" | "deal" | "document";
  title: string;
  subtitle: string;
  url: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
