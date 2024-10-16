import { Router } from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController";

const router = Router();

router.post("/", createSubject); // Create a new subject
router.get("/", getAllSubjects); // Get all subjects
router.get("/:id", getSubjectById); // Get a subject by ID
router.put("/:id", updateSubject); // Update a subject by ID
router.delete("/:id", deleteSubject); // Delete a subject by ID

export default router;
