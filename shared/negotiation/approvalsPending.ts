import { z } from "zod";

// Approval request schema
export const ApprovalRequestSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  dealName: z.string(),
  type: z.enum([
    "commercial",
    "legal",
    "financial",
    "technical",
    "environmental",
  ]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["pending", "approved", "rejected", "requires_changes"]),
  title: z.string(),
  description: z.string(),
  requestedBy: z.string(),
  assignedTo: z.string(),
  requestedAt: z.string(),
  dueDate: z.string(),
  approvedAt: z.string().optional(),
  approvedBy: z.string().optional(),
  rejectionReason: z.string().optional(),
  documents: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      uploadedAt: z.string(),
    })
  ),
  comments: z.array(
    z.object({
      id: z.string(),
      author: z.string(),
      content: z.string(),
      createdAt: z.string(),
    })
  ),
});

export const ApprovalRequestListSchema = z.array(ApprovalRequestSchema);

export const CreateApprovalRequestSchema = ApprovalRequestSchema.omit({
  id: true,
  requestedAt: true,
  approvedAt: true,
  approvedBy: true,
  comments: true,
});

export const UpdateApprovalRequestSchema =
  ApprovalRequestSchema.partial().extend({
    id: z.string(),
  });

// Inferred types
export type ApprovalRequest = z.infer<typeof ApprovalRequestSchema>;
export type ApprovalRequestList = z.infer<typeof ApprovalRequestListSchema>;
export type CreateApprovalRequest = z.infer<typeof CreateApprovalRequestSchema>;
export type UpdateApprovalRequest = z.infer<typeof UpdateApprovalRequestSchema>;
