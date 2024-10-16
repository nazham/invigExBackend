import { Router } from 'express';
import { recordAttendance } from '../controllers/attendanceController';

const router = Router();
router.post('/attendance', recordAttendance);

export default router;
