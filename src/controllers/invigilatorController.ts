import { Request, Response } from "express";
import Invigilator from "../models/Invigilator";
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

// Create a new invigilator
const createInvigilator = async (req: Request, res: Response) => {
  try {
    const newInvigilator = new Invigilator(req.body);
    const savedInvigilator = await newInvigilator.save();
    res.status(201).json(savedInvigilator);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Could not create user due to some invalid fields!',
        error: messages,
      });
    } else if ((error as MongoError).code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email or phone number already exists!',
      });
    }
    res
      .status(500)
      .json({ success: false, message: 'Internal server error', error });
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
