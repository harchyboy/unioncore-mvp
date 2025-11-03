import { z } from "zod";

// Heads of Terms schema
export const HeadsOfTermsSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  tenant: z.string(),
  landlord: z.string(),
  premises: z.string(),
  area: z.number().positive(),
  use: z.string(),
  term: z.number().positive(),
  commencementDate: z.string(),
  rent: z.number().positive(),
  rentReviews: z.string(),
  deposit: z.number().min(0),
  guarantor: z.string().optional(),
  repairs: z.string(),
  insurance: z.string(),
  alienation: z.string(),
  breakClause: z.string().optional(),
  otherProvisions: z.string().optional(),
  status: z.enum(["draft", "under_review", "agreed", "signed"]),
  version: z.number().positive(),
  redlines: z.array(
    z.object({
      id: z.string(),
      section: z.string(),
      originalText: z.string(),
      proposedText: z.string(),
      reason: z.string(),
      status: z.enum(["pending", "accepted", "rejected"]),
      createdBy: z.string(),
      createdAt: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

export const HeadsOfTermsListSchema = z.array(HeadsOfTermsSchema);

export const CreateHeadsOfTermsSchema = HeadsOfTermsSchema.omit({
  id: true,
  version: true,
  redlines: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
});

export const UpdateHeadsOfTermsSchema = HeadsOfTermsSchema.partial().extend({
  id: z.string(),
});

// Redline schema
export const RedlineSchema = z.object({
  id: z.string(),
  hotsId: z.string(),
  section: z.string(),
  originalText: z.string(),
  proposedText: z.string(),
  reason: z.string(),
  status: z.enum(["pending", "accepted", "rejected"]),
  createdBy: z.string(),
  createdAt: z.string(),
});

export const CreateRedlineSchema = RedlineSchema.omit({
  id: true,
  createdAt: true,
});

// Inferred types
export type HeadsOfTerms = z.infer<typeof HeadsOfTermsSchema>;
export type HeadsOfTermsList = z.infer<typeof HeadsOfTermsListSchema>;
export type CreateHeadsOfTerms = z.infer<typeof CreateHeadsOfTermsSchema>;
export type UpdateHeadsOfTerms = z.infer<typeof UpdateHeadsOfTermsSchema>;
export type Redline = z.infer<typeof RedlineSchema>;
export type CreateRedline = z.infer<typeof CreateRedlineSchema>;
