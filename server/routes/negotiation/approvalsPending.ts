import { Router, Request, Response } from "express";
import {
  ApprovalRequestSchema,
  ApprovalRequestListSchema,
  CreateApprovalRequestSchema,
  UpdateApprovalRequestSchema,
  type ApprovalRequest,
  type CreateApprovalRequest,
  type UpdateApprovalRequest,
} from "../../../shared/negotiation/approvalsPending.js";

const router = Router();

// Mock data - replace with actual database operations
let approvals: ApprovalRequest[] = [
  {
    id: "app-001",
    dealId: "deal-001",
    dealName: "Canary Wharf Office Complex",
    type: "commercial",
    priority: "high",
    status: "pending",
    title: "Commercial Terms Approval",
    description:
      "Review and approve the negotiated commercial terms for the Canary Wharf lease.",
    requestedBy: "Sarah Chen",
    assignedTo: "Max Williams",
    requestedAt: new Date("2024-11-01").toISOString(),
    dueDate: new Date("2024-11-05").toISOString(),
    documents: [],
    comments: [],
  },
];

// GET /api/negotiation/approvals-pending
router.get("/", (req: Request, res: Response) => {
  try {
    const validatedApprovals = ApprovalRequestListSchema.parse(approvals);
    res.json(validatedApprovals);
  } catch (error) {
    console.error("Error fetching approvals:", error);
    res.status(500).json({ error: "Failed to fetch approval requests" });
  }
});

// GET /api/negotiation/approvals-pending/:id
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const approval = approvals.find(a => a.id === id);

    if (!approval) {
      return res.status(404).json({ error: "Approval request not found" });
    }

    const validatedApproval = ApprovalRequestSchema.parse(approval);
    res.json(validatedApproval);
  } catch (error) {
    console.error("Error fetching approval:", error);
    res.status(500).json({ error: "Failed to fetch approval request" });
  }
});

// POST /api/negotiation/approvals-pending
router.post("/", (req: Request, res: Response) => {
  try {
    const validatedData = CreateApprovalRequestSchema.parse(req.body);

    const newApproval: ApprovalRequest = {
      ...validatedData,
      id: `app-${Date.now()}`,
      requestedAt: new Date().toISOString(),
      comments: [],
      documents: [],
    };

    approvals.push(newApproval);

    const validatedApproval = ApprovalRequestSchema.parse(newApproval);
    res.status(201).json(validatedApproval);
  } catch (error) {
    console.error("Error creating approval:", error);
    res.status(400).json({ error: "Invalid approval request data" });
  }
});

// PUT /api/negotiation/approvals-pending/:id
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateApprovalRequestSchema.parse(req.body);

    const approvalIndex = approvals.findIndex(a => a.id === id);
    if (approvalIndex === -1) {
      return res.status(404).json({ error: "Approval request not found" });
    }

    const updatedApproval: ApprovalRequest = {
      ...approvals[approvalIndex],
      ...validatedData,
    };

    // Set approval timestamps based on status
    if (validatedData.status === "approved" && !updatedApproval.approvedAt) {
      updatedApproval.approvedAt = new Date().toISOString();
      updatedApproval.approvedBy = "Current User"; // TODO: Get from auth context
    }

    approvals[approvalIndex] = updatedApproval;

    const validatedApproval = ApprovalRequestSchema.parse(updatedApproval);
    res.json(validatedApproval);
  } catch (error) {
    console.error("Error updating approval:", error);
    res.status(400).json({ error: "Invalid approval request data" });
  }
});

// POST /api/negotiation/approvals-pending/:id/comments
router.post("/:id/comments", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const approvalIndex = approvals.findIndex(a => a.id === id);
    if (approvalIndex === -1) {
      return res.status(404).json({ error: "Approval request not found" });
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      author: "Current User", // TODO: Get from auth context
      content,
      createdAt: new Date().toISOString(),
    };

    approvals[approvalIndex].comments.push(newComment);

    const validatedApproval = ApprovalRequestSchema.parse(
      approvals[approvalIndex]
    );
    res.json(validatedApproval);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// DELETE /api/negotiation/approvals-pending/:id
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const approvalIndex = approvals.findIndex(a => a.id === id);

    if (approvalIndex === -1) {
      return res.status(404).json({ error: "Approval request not found" });
    }

    approvals.splice(approvalIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting approval:", error);
    res.status(500).json({ error: "Failed to delete approval request" });
  }
});

export default router;
