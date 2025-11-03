import { lazy } from "react";

// Lazy load all negotiation route components
export const DealsOverview = lazy(() => import("./deals-overview"));
export const Commercials = lazy(() => import("./commercials"));
export const ApprovalsPending = lazy(() => import("./approvals-pending"));
export const HotsRedlines = lazy(() => import("./hots-redlines"));
export const FitoutMilestones = lazy(() => import("./fitout-milestones"));
export const ContractsFees = lazy(() => import("./contracts-fees"));
export const HeadsOfTerms = lazy(() => import("./heads-of-terms"));
export const Documents = lazy(() => import("./documents"));
export const Tasks = lazy(() => import("./tasks"));
export const Risk = lazy(() => import("./risk"));

// Route definitions for the negotiation module
export const negotiationRoutes = [
  {
    path: "/negotiation/deals-overview",
    component: DealsOverview,
    name: "Deals Overview",
  },
  {
    path: "/negotiation/commercials",
    component: Commercials,
    name: "Commercials",
  },
  {
    path: "/negotiation/approvals-pending",
    component: ApprovalsPending,
    name: "Pending Approvals",
  },
  {
    path: "/negotiation/hots-redlines",
    component: HotsRedlines,
    name: "HoTs & Redlines",
  },
  {
    path: "/negotiation/fitout-milestones",
    component: FitoutMilestones,
    name: "Fit-Out & Milestones",
  },
  {
    path: "/negotiation/contracts-fees",
    component: ContractsFees,
    name: "Contracts & Fees",
  },
  {
    path: "/negotiation/heads-of-terms",
    component: HeadsOfTerms,
    name: "Heads of Terms",
  },
  {
    path: "/negotiation/documents",
    component: Documents,
    name: "Document Management",
  },
  {
    path: "/negotiation/tasks",
    component: Tasks,
    name: "Task Management",
  },
  {
    path: "/negotiation/risk",
    component: Risk,
    name: "Risk Assessment",
  },
];
