import { z } from "zod";

// Contract schema
export const ContractSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  type: z.enum([
    "lease",
    "license",
    "management_agreement",
    "service_agreement",
  ]),
  title: z.string(),
  parties: z.array(
    z.object({
      name: z.string(),
      role: z.enum(["landlord", "tenant", "guarantor", "agent", "solicitor"]),
      contact: z.string(),
    })
  ),
  keyTerms: z.object({
    commencementDate: z.string(),
    expiryDate: z.string(),
    rentAmount: z.number().positive(),
    deposit: z.number().min(0),
    breakClause: z.boolean(),
    rentReviewDates: z.array(z.string()),
  }),
  status: z.enum([
    "draft",
    "under_review",
    "approved",
    "executed",
    "terminated",
  ]),
  version: z.number().positive(),
  documentUrl: z.string().optional(),
  executedDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

// Fee schema
export const FeeSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  contractId: z.string().optional(),
  type: z.enum([
    "legal",
    "survey",
    "valuation",
    "agent",
    "management",
    "other",
  ]),
  description: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("GBP"),
  vatRate: z.number().min(0).max(1),
  vatAmount: z.number().min(0),
  totalAmount: z.number().positive(),
  payee: z.string(),
  dueDate: z.string(),
  paidDate: z.string().optional(),
  status: z.enum(["pending", "approved", "paid", "overdue", "disputed"]),
  invoiceNumber: z.string().optional(),
  invoiceUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

export const ContractListSchema = z.array(ContractSchema);
export const FeeListSchema = z.array(FeeSchema);

export const CreateContractSchema = ContractSchema.omit({
  id: true,
  version: true,
  executedDate: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
});

export const UpdateContractSchema = ContractSchema.partial().extend({
  id: z.string(),
});

export const CreateFeeSchema = FeeSchema.omit({
  id: true,
  paidDate: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
});

export const UpdateFeeSchema = FeeSchema.partial().extend({
  id: z.string(),
});

// Inferred types
export type Contract = z.infer<typeof ContractSchema>;
export type ContractList = z.infer<typeof ContractListSchema>;
export type CreateContract = z.infer<typeof CreateContractSchema>;
export type UpdateContract = z.infer<typeof UpdateContractSchema>;

export type Fee = z.infer<typeof FeeSchema>;
export type FeeList = z.infer<typeof FeeListSchema>;
export type CreateFee = z.infer<typeof CreateFeeSchema>;
export type UpdateFee = z.infer<typeof UpdateFeeSchema>;
