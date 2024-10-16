import { Request, Response } from "express";
import Subject from "../models/Subject";

// Create Subject
export const createSubject = async (req: Request, res: Response) => {
  try {
    const subject = new Subject(req.body);
    const savedSubject = await subject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(400).json({ message: 'Error saving subject', error });
  }
};

// Read all Subjects
export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ message: 'Error retreiving subjects', error });
  }
};

// Read Subject by ID
export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(400).json({ message: 'Error finding subject', error });
  }
};

// Update Subject
export const updateSubject = async (req: Request, res: Response) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating subject', error });
  }
};

// Delete Subject
export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting subject', error });
  }
};
