import { z } from "zod";

// This is a duplicate of hots.ts but with a different name for clarity
// Re-exporting from hots.ts to maintain consistency
export {
  HeadsOfTermsSchema,
  HeadsOfTermsListSchema,
  CreateHeadsOfTermsSchema,
  UpdateHeadsOfTermsSchema,
  RedlineSchema,
  CreateRedlineSchema,
  type HeadsOfTerms,
  type HeadsOfTermsList,
  type CreateHeadsOfTerms,
  type UpdateHeadsOfTerms,
  type Redline,
  type CreateRedline,
} from "./hots";
