import { Router } from "express";
import commercialsRouter from "./commercials.js";
import approvalsRouter from "./approvalsPending.js";
import tasksRouter from "./tasks.js";

const router = Router();

// Mount negotiation sub-routes
router.use("/commercials", commercialsRouter);
router.use("/approvals-pending", approvalsRouter);
router.use("/tasks", tasksRouter);

// Placeholder routes for other negotiation modules
// These would be implemented similarly to the above routes

// GET /api/negotiation/deals-overview
router.get("/deals-overview", (req, res) => {
  res.json({ message: "Deals overview endpoint - to be implemented" });
});

// GET /api/negotiation/hots-redlines
router.get("/hots-redlines", (req, res) => {
  res.json({ message: "HoTs & Redlines endpoint - to be implemented" });
});

// GET /api/negotiation/fitout-milestones
router.get("/fitout-milestones", (req, res) => {
  res.json({ message: "Fit-out & Milestones endpoint - to be implemented" });
});

// GET /api/negotiation/contracts-fees
router.get("/contracts-fees", (req, res) => {
  res.json({ message: "Contracts & Fees endpoint - to be implemented" });
});

// GET /api/negotiation/heads-of-terms
router.get("/heads-of-terms", (req, res) => {
  res.json({ message: "Heads of Terms endpoint - to be implemented" });
});

// GET /api/negotiation/documents
router.get("/documents", (req, res) => {
  res.json({ message: "Document Management endpoint - to be implemented" });
});

// GET /api/negotiation/risk
router.get("/risk", (req, res) => {
  res.json({ message: "Risk Assessment endpoint - to be implemented" });
});

export default router;
