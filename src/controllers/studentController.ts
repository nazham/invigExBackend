import { Request, Response } from 'express';
import Student from '../models/Student';

export const registerStudent = async (req: Request, res: Response) => {
  const { indexNumber, gender } = req.body;

  try {
    const newStudent = new Student({ indexNumber, gender });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered', newStudent });
  } catch (error) {
    res.status(400).json({ message: 'Error registering student', error });
  }
};

