// src/index.js
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import centreRoutes from './routes/centreRoutes';
import centreLogRoutes from './routes/centreLogRoutes';
import subjectRoutes from './routes/subjectRoutes';
import invigilatorRoutes from "./routes/invigilatorRoutes";
import cors from 'cors';
import logger from "./middlewares/logger";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Logger middleware
app.use(logger);

// Define routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exam-centre', centreRoutes);
app.use('/api/centre-log', centreLogRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/invigilator', invigilatorRoutes);

// Add this error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;

