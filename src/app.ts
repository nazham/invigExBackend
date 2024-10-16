// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import centreRoutes from './routes/centreRoutes';
import centreLogRoutes from './routes/centreLogRoutes';
import subjectRoutes from './routes/subjectRoutes';

dotenv.config();

const app: Express = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exam-centre', centreRoutes);
app.use('/api/centre-log', centreLogRoutes);
app.use('/api/subject', subjectRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;