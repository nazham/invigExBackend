import { Request, Response, NextFunction } from "express";

// Middleware to validate invigilator data
export const validateInvigilator = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, address, examCenterID } = req.body;

  if (!name || !email || !phone || !address || !examCenterID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // You could add additional validation such as regex for email or phone number formatting
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Phone number must be 10 digits" });
  }

  next();
};
