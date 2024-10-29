import { Request, Response } from "express";
import Invigilator from "../models/Invigilator";

// Create a new invigilator
const createInvigilator = async (req: Request, res: Response) => {
  try {
    const newInvigilator = new Invigilator(req.body);
    const savedInvigilator = await newInvigilator.save();
    res.status(201).json(savedInvigilator);
  } catch (error) {
    if (error instanceof Error) {
      // Narrow down the error type to `Error` to access properties like `message`
      res.status(400).json({ message: error.message });
    } else {
      // Fallback for unknown error types
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// Get all invigilators
const getAllInvigilators = async (req: Request, res: Response) => {
  try {
    const invigilators = await Invigilator.find().populate("examCenterID", "name");
    res.status(200).json(invigilators);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get a single invigilator by ID
const getInvigilatorById = async (req: Request, res: Response) => {
  try {
    const invigilator = await Invigilator.findById(req.params.id).populate("examCenterID", "name");
    if (!invigilator) {
      return res.status(404).json({ message: "Invigilator not found" });
    }
    res.status(200).json(invigilator);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update an invigilator by ID
const updateInvigilator = async (req: Request, res: Response) => {
  try {
    const updatedInvigilator = await Invigilator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInvigilator) {
      return res.status(404).json({ message: "Invigilator not found" });
    }
    res.status(200).json(updatedInvigilator);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete an invigilator by ID
const deleteInvigilator = async (req: Request, res: Response) => {
  try {
    const deletedInvigilator = await Invigilator.findByIdAndDelete(req.params.id);
    if (!deletedInvigilator) {
      return res.status(404).json({ message: "Invigilator not found" });
    }
    res.status(200).json({ message: "Invigilator deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export default {
  createInvigilator,
  getAllInvigilators,
  getInvigilatorById,
  updateInvigilator,
  deleteInvigilator,
};
