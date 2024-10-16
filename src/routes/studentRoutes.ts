import { Router } from 'express';
import { registerStudent } from '../controllers/studentController';

const router = Router();
router.post('/register', registerStudent);

export default router;
