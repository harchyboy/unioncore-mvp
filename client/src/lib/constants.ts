// Application constants

export const ROUTES = {
  DASHBOARD: "/",
  LEADS: "/leads",
  PIPELINE: "/pipeline",
  PROPERTY_INDEX: "/property-index",
  SPACE_ALLOCATION: "/space-allocation",
  VIEWING_SCHEDULER: "/viewing-scheduler",
  RESEARCH: "/research",
  BROKERS: "/brokers",
  // Negotiation routes
  DEALS_OVERVIEW: "/negotiation/deals-overview",
  COMMERCIALS: "/negotiation/commercials",
  APPROVAL_REQUESTS: "/negotiation/approvals-pending",
  HOTS_REDLINES: "/negotiation/hots-redlines",
  FITOUT_MILESTONES: "/negotiation/fitout-milestones",
  CONTRACTS_FEES: "/negotiation/contracts-fees",
  HEADS_OF_TERMS: "/negotiation/heads-of-terms",
  DOCUMENT_MANAGEMENT: "/negotiation/documents",
  TASK_MANAGEMENT: "/negotiation/tasks",
  RISK_ASSESSMENT: "/negotiation/risk",
  SEARCH: "/search",
  NOTIFICATIONS: "/notifications",
} as const;

export const COLORS = {
  stone: "#F0F0F0",
  slate: "#252525",
  concrete: "#8E8E8E",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
} as const;

export const USERS = {
  DANI: {
    id: "dani",
    name: "Dani",
    role: "Portfolio Navigator",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  MAX: {
    id: "max",
    name: "Max",
    role: "Portfolio Navigator",
    avatar: "https://hartzai.com/wp-content/uploads/2025/10/Max.jpg",
  },
  TOM: {
    id: "tom",
    name: "Tom",
    role: "Portfolio Navigator",
    avatar: "https://hartzai.com/wp-content/uploads/2025/10/Tom.jpg",
  },
} as const;

export const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fa-chart-line",
    path: ROUTES.DASHBOARD,
    badge: "Live",
  },
  {
    id: "global",
    label: "Global",
    children: [
      {
        id: "search",
        label: "Search",
        icon: "fa-search",
        path: ROUTES.SEARCH,
        shortcut: "⌘K",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: "fa-bell",
        path: ROUTES.NOTIFICATIONS,
        badge: "•",
      },
    ],
  },
  {
    id: "origination",
    label: "Origination",
    children: [
      {
        id: "leads",
        label: "Leads",
        icon: "fa-users",
        path: ROUTES.LEADS,
        badge: 6,
      },
      {
        id: "pipeline",
        label: "Pipeline",
        icon: "fa-building",
        path: ROUTES.PIPELINE,
        badge: 247,
      },
      {
        id: "property-index",
        label: "Property Index",
        icon: "fa-database",
        path: ROUTES.PROPERTY_INDEX,
      },
      {
        id: "space-allocation",
        label: "Space Allocation",
        icon: "fa-chart-area",
        path: ROUTES.SPACE_ALLOCATION,
        badge: "NEW",
      },
      {
        id: "viewing-scheduler",
        label: "Viewing Scheduler",
        icon: "fa-calendar-alt",
        path: ROUTES.VIEWING_SCHEDULER,
      },
      {
        id: "research",
        label: "Research",
        icon: "fa-microscope",
        path: ROUTES.RESEARCH,
      },
      {
        id: "brokers",
        label: "Brokers",
        icon: "fa-handshake",
        path: ROUTES.BROKERS,
      },
    ],
  },
  {
    id: "execution",
    label: "Execution",
    children: [
      {
        id: "deals-overview",
        label: "Deals Overview",
        icon: "fa-chart-pie",
        path: ROUTES.DEALS_OVERVIEW,
      },
      {
        id: "commercials",
        label: "Commercials",
        icon: "fa-calculator",
        path: ROUTES.COMMERCIALS,
      },
      {
        id: "approval-requests",
        label: "Approval Requests",
        icon: "fa-clipboard-check",
        path: ROUTES.APPROVAL_REQUESTS,
      },
      {
        id: "hots",
        label: "HOTs",
        icon: "fa-file-signature",
        path: ROUTES.HOTS_REDLINES,
      },
      {
        id: "fitout",
        label: "Fitout",
        icon: "fa-hammer",
        path: ROUTES.FITOUT_MILESTONES,
      },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    children: [
      {
        id: "contracts",
        label: "Contracts",
        icon: "fa-file-contract",
        path: ROUTES.CONTRACTS_FEES,
      },
      {
        id: "heads-of-terms",
        label: "Heads of Terms",
        icon: "fa-scroll",
        path: ROUTES.HEADS_OF_TERMS,
      },
      {
        id: "document-management",
        label: "Document Management",
        icon: "fa-folder-open",
        path: ROUTES.DOCUMENT_MANAGEMENT,
      },
    ],
  },
] as const;
