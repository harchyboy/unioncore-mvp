import { z } from "zod";

// Commercial terms schema
export const CommercialTermsSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  rentPerSqFt: z.number().positive(),
  totalRent: z.number().positive(),
  serviceCharge: z.number().min(0),
  businessRates: z.number().min(0),
  deposit: z.number().min(0),
  leaseTerm: z.number().positive(),
  rentReviewPeriod: z.number().positive(),
  rentFreeMonths: z.number().min(0),
  breakClause: z.boolean(),
  breakClauseDate: z.string().optional(),
  status: z.enum(["draft", "negotiating", "agreed", "rejected"]),
  lastUpdated: z.string(),
  updatedBy: z.string(),
});

export const CommercialTermsListSchema = z.array(CommercialTermsSchema);

export const CreateCommercialTermsSchema = CommercialTermsSchema.omit({
  id: true,
  lastUpdated: true,
  updatedBy: true,
});

export const UpdateCommercialTermsSchema =
  CommercialTermsSchema.partial().extend({
    id: z.string(),
  });

// Inferred types
export type CommercialTerms = z.infer<typeof CommercialTermsSchema>;
export type CommercialTermsList = z.infer<typeof CommercialTermsListSchema>;
export type CreateCommercialTerms = z.infer<typeof CreateCommercialTermsSchema>;
export type UpdateCommercialTerms = z.infer<typeof UpdateCommercialTermsSchema>;
