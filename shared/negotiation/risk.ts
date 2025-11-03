import { z } from "zod";

// Risk assessment schema
export const RiskAssessmentSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum([
    "financial",
    "legal",
    "environmental",
    "technical",
    "market",
    "operational",
    "regulatory",
    "reputational",
  ]),
  impact: z.enum(["very_low", "low", "medium", "high", "very_high"]),
  probability: z.enum(["very_low", "low", "medium", "high", "very_high"]),
  riskScore: z.number().min(1).max(25), // impact * probability (1-5 scale)
  status: z.enum([
    "identified",
    "assessed",
    "mitigated",
    "accepted",
    "transferred",
    "avoided",
  ]),
  owner: z.string(),
  identifiedBy: z.string(),
  identifiedAt: z.string(),
  reviewDate: z.string(),
  mitigationStrategy: z.string().optional(),
  mitigationActions: z.array(
    z.object({
      id: z.string(),
      action: z.string(),
      assignedTo: z.string(),
      dueDate: z.string(),
      status: z.enum(["pending", "in_progress", "completed"]),
      completedAt: z.string().optional(),
    })
  ),
  residualImpact: z
    .enum(["very_low", "low", "medium", "high", "very_high"])
    .optional(),
  residualProbability: z
    .enum(["very_low", "low", "medium", "high", "very_high"])
    .optional(),
  residualRiskScore: z.number().min(1).max(25).optional(),
  contingencyPlan: z.string().optional(),
  estimatedCost: z.number().min(0).optional(),
  actualCost: z.number().min(0).optional(),
  tags: z.array(z.string()),
  attachments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      uploadedAt: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

// Risk register schema
export const RiskRegisterSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  name: z.string(),
  description: z.string(),
  risks: z.array(RiskAssessmentSchema),
  overallRiskRating: z.enum(["low", "medium", "high", "critical"]),
  lastReviewDate: z.string(),
  nextReviewDate: z.string(),
  reviewedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

export const RiskAssessmentListSchema = z.array(RiskAssessmentSchema);
export const RiskRegisterListSchema = z.array(RiskRegisterSchema);

export const CreateRiskAssessmentSchema = RiskAssessmentSchema.omit({
  id: true,
  riskScore: true,
  identifiedAt: true,
  residualRiskScore: true,
  actualCost: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
});

export const UpdateRiskAssessmentSchema = RiskAssessmentSchema.partial().extend(
  {
    id: z.string(),
  }
);

export const CreateRiskRegisterSchema = RiskRegisterSchema.omit({
  id: true,
  risks: true,
  overallRiskRating: true,
  lastReviewDate: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
});

// Risk matrix helper
export const RiskMatrixSchema = z.object({
  impact: z.enum(["very_low", "low", "medium", "high", "very_high"]),
  probability: z.enum(["very_low", "low", "medium", "high", "very_high"]),
});

// Inferred types
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
export type RiskAssessmentList = z.infer<typeof RiskAssessmentListSchema>;
export type CreateRiskAssessment = z.infer<typeof CreateRiskAssessmentSchema>;
export type UpdateRiskAssessment = z.infer<typeof UpdateRiskAssessmentSchema>;
export type RiskRegister = z.infer<typeof RiskRegisterSchema>;
export type RiskRegisterList = z.infer<typeof RiskRegisterListSchema>;
export type CreateRiskRegister = z.infer<typeof CreateRiskRegisterSchema>;
export type RiskMatrix = z.infer<typeof RiskMatrixSchema>;
