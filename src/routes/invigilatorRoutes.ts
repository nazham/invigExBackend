import { Router } from "express";
import invigilatorController from "../controllers/invigilatorController";
import { validateInvigilator } from "../middlewares/invigilatorMiddleware";

const router = Router();

// Create a new invigilator
router.post("/", validateInvigilator, invigilatorController.createInvigilator);

// Get all invigilators
router.get("/", invigilatorController.getAllInvigilators);

// Get an invigilator by ID
router.get("/:id", invigilatorController.getInvigilatorById);

// Update an invigilator by ID
router.put("/:id", validateInvigilator, invigilatorController.updateInvigilator);

// Delete an invigilator by ID
router.delete("/:id", invigilatorController.deleteInvigilator);

export default router;
