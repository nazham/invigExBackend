// middleware/validateCentreLog.ts
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Centre from "../models/ExamCentre";
import Subject from "../models/Subject";

// Middleware to validate CentreLog input
export const validateCentreLog = async (req: Request, res: Response, next: NextFunction) => {
  const { examCenterID, centreStatistics } = req.body;

  // Check if examCenterID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(examCenterID)) {
    return res.status(400).json({ error: "Invalid examCenterID format." });
  }

  // Validate if examCenterID exists in the Centre collection
  const centreExists = await Centre.findById(examCenterID);
  if (!centreExists) {
    return res.status(404).json({ error: "Exam centre not found." });
  }

  // Validate each centreStatistics entry
  for (const stat of centreStatistics) {
    const { subjectID, appliedStudentsCount } = stat;

    // Check if subjectID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(subjectID)) {
      return res.status(400).json({ error: `Invalid subjectID format: ${subjectID}` });
    }

    // Validate if subjectID exists in the Subject collection
    const subjectExists = await Subject.findById(subjectID);
    if (!subjectExists) {
      return res.status(404).json({ error: `Subject not found: ${subjectID}` });
    }

    // Ensure appliedStudents is a positive number
    if (!appliedStudentsCount || appliedStudentsCount <= 0) {
      return res.status(400).json({ error: `Invalid appliedStudents count: ${appliedStudentsCount}` });
    }
  }

  // If validation passes, call next() to proceed to the controller
  next();
};
