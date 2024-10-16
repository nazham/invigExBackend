
import { Request, Response } from 'express';
import AttendanceRegister from '../models/AttendanceRegister';

export const recordAttendance = async (req: Request, res: Response) => {
  const { studentIndex, subject, examDate } = req.body;

  try {
    const newAttendance = new AttendanceRegister({ studentIndex, subject, examDate });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance recorded', newAttendance });
  } catch (error) {
    res.status(400).json({ message: 'Error recording attendance', error });
  }
};
