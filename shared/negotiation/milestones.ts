import { z } from "zod";

// Fit-out milestone schema
export const FitoutMilestoneSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "planning",
    "design",
    "construction",
    "compliance",
    "handover",
  ]),
  status: z.enum([
    "not_started",
    "in_progress",
    "completed",
    "delayed",
    "blocked",
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  startDate: z.string(),
  dueDate: z.string(),
  completedDate: z.string().optional(),
  assignedTo: z.string(),
  estimatedCost: z.number().min(0),
  actualCost: z.number().min(0).optional(),
  dependencies: z.array(z.string()),
  deliverables: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      status: z.enum(["pending", "in_progress", "completed"]),
      dueDate: z.string(),
    })
  ),
  risks: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      impact: z.enum(["low", "medium", "high"]),
      probability: z.enum(["low", "medium", "high"]),
      mitigation: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

export const FitoutMilestoneListSchema = z.array(FitoutMilestoneSchema);

export const CreateFitoutMilestoneSchema = FitoutMilestoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  completedDate: true,
  actualCost: true,
});

export const UpdateFitoutMilestoneSchema =
  FitoutMilestoneSchema.partial().extend({
    id: z.string(),
  });

// Inferred types
export type FitoutMilestone = z.infer<typeof FitoutMilestoneSchema>;
export type FitoutMilestoneList = z.infer<typeof FitoutMilestoneListSchema>;
export type CreateFitoutMilestone = z.infer<typeof CreateFitoutMilestoneSchema>;
export type UpdateFitoutMilestone = z.infer<typeof UpdateFitoutMilestoneSchema>;
