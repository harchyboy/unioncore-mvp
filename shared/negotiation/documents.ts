import { z } from "zod";

// Document schema
export const DocumentSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum([
    "lease",
    "heads_of_terms",
    "survey",
    "valuation",
    "planning_permission",
    "building_regulations",
    "environmental_report",
    "legal_report",
    "financial_statement",
    "insurance_certificate",
    "other",
  ]),
  category: z.enum([
    "legal",
    "technical",
    "financial",
    "compliance",
    "marketing",
  ]),
  fileUrl: z.string(),
  fileName: z.string(),
  fileSize: z.number().positive(),
  mimeType: z.string(),
  version: z.number().positive(),
  status: z.enum(["draft", "under_review", "approved", "rejected", "archived"]),
  confidential: z.boolean().default(false),
  tags: z.array(z.string()),
  uploadedBy: z.string(),
  uploadedAt: z.string(),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  expiryDate: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Document access log schema
export const DocumentAccessLogSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  userId: z.string(),
  userName: z.string(),
  action: z.enum(["view", "download", "edit", "delete", "share"]),
  timestamp: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export const DocumentListSchema = z.array(DocumentSchema);
export const DocumentAccessLogListSchema = z.array(DocumentAccessLogSchema);

export const CreateDocumentSchema = DocumentSchema.omit({
  id: true,
  version: true,
  uploadedAt: true,
  reviewedBy: true,
  reviewedAt: true,
  approvedBy: true,
  approvedAt: true,
});

export const UpdateDocumentSchema = DocumentSchema.partial().extend({
  id: z.string(),
});

// Document sharing schema
export const DocumentShareSchema = z.object({
  documentId: z.string(),
  sharedWith: z.array(
    z.object({
      email: z.string().email(),
      permissions: z.enum(["view", "download", "edit"]),
    })
  ),
  expiryDate: z.string().optional(),
  message: z.string().optional(),
});

// Inferred types
export type Document = z.infer<typeof DocumentSchema>;
export type DocumentList = z.infer<typeof DocumentListSchema>;
export type CreateDocument = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocument = z.infer<typeof UpdateDocumentSchema>;
export type DocumentAccessLog = z.infer<typeof DocumentAccessLogSchema>;
export type DocumentAccessLogList = z.infer<typeof DocumentAccessLogListSchema>;
export type DocumentShare = z.infer<typeof DocumentShareSchema>;
