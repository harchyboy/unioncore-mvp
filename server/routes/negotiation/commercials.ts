import { Router, Request, Response } from "express";
import {
  CommercialTermsSchema,
  CommercialTermsListSchema,
  CreateCommercialTermsSchema,
  UpdateCommercialTermsSchema,
  type CommercialTerms,
  type CreateCommercialTerms,
  type UpdateCommercialTerms,
} from "../../../shared/negotiation/commercials";

const router = Router();

// Mock data - replace with actual database operations
let commercials: CommercialTerms[] = [
  {
    id: "comm-001",
    dealId: "deal-001",
    propertyId: "prop-001",
    propertyName: "Canary Wharf Office Complex",
    rentPerSqFt: 65,
    totalRent: 325000,
    serviceCharge: 15000,
    businessRates: 12000,
    deposit: 65000,
    leaseTerm: 10,
    rentReviewPeriod: 5,
    rentFreeMonths: 6,
    breakClause: true,
    breakClauseDate: "2029-01-01",
    status: "negotiating",
    lastUpdated: new Date().toISOString(),
    updatedBy: "Sarah Chen",
  },
];

// GET /api/negotiation/commercials
router.get("/", (req: Request, res: Response) => {
  try {
    const validatedCommercials = CommercialTermsListSchema.parse(commercials);
    res.json(validatedCommercials);
  } catch (error) {
    console.error("Error fetching commercials:", error);
    res.status(500).json({ error: "Failed to fetch commercial terms" });
  }
});

// GET /api/negotiation/commercials/:id
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commercial = commercials.find(c => c.id === id);

    if (!commercial) {
      return res.status(404).json({ error: "Commercial terms not found" });
    }

    const validatedCommercial = CommercialTermsSchema.parse(commercial);
    res.json(validatedCommercial);
  } catch (error) {
    console.error("Error fetching commercial:", error);
    res.status(500).json({ error: "Failed to fetch commercial terms" });
  }
});

// POST /api/negotiation/commercials
router.post("/", (req: Request, res: Response) => {
  try {
    const validatedData = CreateCommercialTermsSchema.parse(req.body);

    const newCommercial: CommercialTerms = {
      ...validatedData,
      id: `comm-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      updatedBy: "Current User", // TODO: Get from auth context
    };

    commercials.push(newCommercial);

    const validatedCommercial = CommercialTermsSchema.parse(newCommercial);
    res.status(201).json(validatedCommercial);
  } catch (error) {
    console.error("Error creating commercial:", error);
    res.status(400).json({ error: "Invalid commercial terms data" });
  }
});

// PUT /api/negotiation/commercials/:id
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateCommercialTermsSchema.parse(req.body);

    const commercialIndex = commercials.findIndex(c => c.id === id);
    if (commercialIndex === -1) {
      return res.status(404).json({ error: "Commercial terms not found" });
    }

    const updatedCommercial: CommercialTerms = {
      ...commercials[commercialIndex],
      ...validatedData,
      lastUpdated: new Date().toISOString(),
      updatedBy: "Current User", // TODO: Get from auth context
    };

    commercials[commercialIndex] = updatedCommercial;

    const validatedCommercial = CommercialTermsSchema.parse(updatedCommercial);
    res.json(validatedCommercial);
  } catch (error) {
    console.error("Error updating commercial:", error);
    res.status(400).json({ error: "Invalid commercial terms data" });
  }
});

// DELETE /api/negotiation/commercials/:id
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commercialIndex = commercials.findIndex(c => c.id === id);

    if (commercialIndex === -1) {
      return res.status(404).json({ error: "Commercial terms not found" });
    }

    commercials.splice(commercialIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting commercial:", error);
    res.status(500).json({ error: "Failed to delete commercial terms" });
  }
});

export default router;
