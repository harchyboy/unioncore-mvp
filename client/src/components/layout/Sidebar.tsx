import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  BarChart3,
  Search,
  Bell,
  Users,
  Building,
  Database,
  AreaChart,
  Calendar,
  Microscope,
  Handshake,
  PieChart,
  Calculator,
  CheckCircle2,
  FileSignature,
  Hammer,
  Banknote,
  FolderOpen,
  ListChecks,
  Shield,
} from "lucide-react";
import { ROUTES, USERS } from "../../lib/constants";
import BadgeNew from "../negotiation/BadgeNew";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string | number;
  shortcut?: string;
  newBadgeFlag?: "fitOutMilestonesNew" | "contractsFeesNew";
}

interface NavigationSection {
  id: string;
  label?: string;
  items: NavigationItem[];
}

const Sidebar: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [currentUser] = useState(USERS.DANI);

  const navigationSections: NavigationSection[] = [
    {
      id: "dashboard",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <BarChart3 className="w-5 h-5" />,
          path: ROUTES.DASHBOARD,
          badge: "Live",
        },
      ],
    },
    {
      id: "global",
      label: "Global",
      items: [
        {
          id: "search",
          label: "Search",
          icon: <Search className="w-5 h-5" />,
          path: ROUTES.SEARCH,
          shortcut: "⌘K",
        },
        {
          id: "notifications",
          label: "Notifications",
          icon: <Bell className="w-5 h-5" />,
          path: ROUTES.NOTIFICATIONS,
          badge: "•",
        },
      ],
    },
    {
      id: "origination",
      label: "Origination",
      items: [
        {
          id: "leads",
          label: "Leads",
          icon: <Users className="w-5 h-5" />,
          path: ROUTES.LEADS,
          badge: 6,
        },
        {
          id: "pipeline",
          label: "Pipeline",
          icon: <Building className="w-5 h-5" />,
          path: ROUTES.PIPELINE,
          badge: 247,
        },
        {
          id: "property-index",
          label: "Property Index",
          icon: <Database className="w-5 h-5" />,
          path: ROUTES.PROPERTY_INDEX,
        },
        {
          id: "space-allocation",
          label: "Space Allocation",
          icon: <AreaChart className="w-5 h-5" />,
          path: ROUTES.SPACE_ALLOCATION,
          badge: "NEW",
        },
        {
          id: "viewing-scheduler",
          label: "Viewing Scheduler",
          icon: <Calendar className="w-5 h-5" />,
          path: ROUTES.VIEWING_SCHEDULER,
          badge: 6,
        },
        {
          id: "research",
          label: "Research & Comps",
          icon: <Microscope className="w-5 h-5" />,
          path: ROUTES.RESEARCH,
        },
        {
          id: "brokers",
          label: "Brokers",
          icon: <Handshake className="w-5 h-5" />,
          path: ROUTES.BROKERS,
          badge: "NEW",
        },
      ],
    },
    {
      id: "negotiation",
      label: "Negotiation",
      items: [
        {
          id: "deals-overview",
          label: "Deals Overview",
          icon: <PieChart className="w-5 h-5" />,
          path: ROUTES.DEALS_OVERVIEW,
        },
        {
          id: "commercials",
          label: "Commercials",
          icon: <Calculator className="w-5 h-5" />,
          path: ROUTES.COMMERCIALS,
        },
        {
          id: "approvals-pending",
          label: "Pending Approvals",
          icon: <CheckCircle2 className="w-5 h-5" />,
          path: ROUTES.APPROVAL_REQUESTS,
        },
        {
          id: "hots-redlines",
          label: "HoTs & Redlines",
          icon: <FileSignature className="w-5 h-5" />,
          path: ROUTES.HOTS_REDLINES,
        },
        {
          id: "fitout-milestones",
          label: "Fit-Out & Milestones",
          icon: <Hammer className="w-5 h-5" />,
          path: ROUTES.FITOUT_MILESTONES,
          newBadgeFlag: "fitOutMilestonesNew",
        },
        {
          id: "contracts-fees",
          label: "Contracts & Fees",
          icon: <Banknote className="w-5 h-5" />,
          path: ROUTES.CONTRACTS_FEES,
          newBadgeFlag: "contractsFeesNew",
        },
        {
          id: "heads-of-terms",
          label: "Heads of Terms",
          icon: <FileSignature className="w-5 h-5" />,
          path: ROUTES.HEADS_OF_TERMS,
        },
        {
          id: "document-management",
          label: "Document Management",
          icon: <FolderOpen className="w-5 h-5" />,
          path: ROUTES.DOCUMENT_MANAGEMENT,
        },
        {
          id: "task-management",
          label: "Task Management",
          icon: <ListChecks className="w-5 h-5" />,
          path: ROUTES.TASK_MANAGEMENT,
        },
        {
          id: "risk-assessment",
          label: "Risk Assessment",
          icon: <Shield className="w-5 h-5" />,
          path: ROUTES.RISK_ASSESSMENT,
        },
      ],
    },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  const getBadgeColor = (badge: string | number) => {
    if (badge === "Live") return "bg-blue-100 text-blue-600";
    if (badge === "NEW") return "bg-green-100 text-green-600";
    if (badge === "•") return "w-2 h-2 bg-red-500 rounded-full";
    if (typeof badge === "number") return "bg-gray-100 text-gray-600";
    return "bg-yellow-100 text-yellow-600";
  };

  return (
    <aside className="w-64 bg-white border-r border-stone flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-stone">
        {/* Role Context */}
        <div className="bg-stone rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate">
                {currentUser.name}
              </p>
              <p className="text-xs text-concrete">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
        {navigationSections.map(section => (
          <div key={section.id}>
            {section.label && (
              <h3 className="text-xs font-semibold text-concrete uppercase tracking-wide mb-3 px-4">
                {section.label}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = location === item.path;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "text-slate bg-stone font-medium"
                        : "text-concrete hover:text-slate hover:bg-stone"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className="flex-1">{item.label}</span>

                    {item.shortcut && (
                      <kbd className="ml-auto text-xs bg-stone px-2 py-1 rounded">
                        {item.shortcut}
                      </kbd>
                    )}

                    {item.newBadgeFlag && !item.shortcut && (
                      <BadgeNew featureFlag={item.newBadgeFlag} />
                    )}

                    {item.badge && !item.shortcut && !item.newBadgeFlag && (
                      <span
                        className={`ml-auto text-xs px-2 py-1 rounded-full ${getBadgeColor(
                          item.badge
                        )}`}
                      >
                        {item.badge === "•" ? "" : item.badge}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
