
import { Request, Response } from 'express';
import Centre from '../models/ExamCentre';

export const createCentre = async (req: Request, res: Response) => {
  const { schoolName, examName, totalRooms, totalHalls, roomCapacity, hallCapacity } = req.body;

  try {
    const newCentre = new Centre({ schoolName, examName, totalRooms, totalHalls, roomCapacity, hallCapacity });
    await newCentre.save();
    res.status(201).json({ message: 'Exam centre saved', newCentre });
  } catch (error) {
    res.status(400).json({ message: 'Error saving exam centre', error });
  }
};

export const getCentres = async (req: Request, res: Response): Promise<Response> => {
  try {
    const centres = await Centre.find();
    return res.status(200).json(centres);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving centres', error });
  }
};

// Get Single Exam Centre by ID
export const getCentreById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const centre = await Centre.findById(req.params.id);
    if (!centre) {
      return res.status(404).json({ message: 'Exam centre not found' });
    }
    return res.status(200).json(centre);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving exam centre', error });
  }
};

// Update Exam Centre by ID
export const updateCentre = async (req: Request, res: Response): Promise<Response> => {
  const { schoolName, examName, totalRooms, totalHalls, roomCapacity, hallCapacity } = req.body;

  try {
    const centre = await Centre.findByIdAndUpdate(
      req.params.id,
      { schoolName, examName, totalRooms, totalHalls, roomCapacity, hallCapacity },
      { new: true, runValidators: true }
    );
    
    if (!centre) {
      return res.status(404).json({ message: 'Exam centre not found' });
    }
    
    return res.status(200).json({ message: 'Exam centre updated', centre });
  } catch (error) {
    return res.status(400).json({ message: 'Error updating exam centre', error });
  }
};

// Delete Exam Centre by ID
export const deleteCentre = async (req: Request, res: Response): Promise<Response> => {
  try {
    const centre = await Centre.findByIdAndDelete(req.params.id);

    if (!centre) {
      return res.status(404).json({ message: 'Exam centre not found' });
    }

    return res.status(200).json({ message: 'Exam centre deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting exam centre', error });
  }
};