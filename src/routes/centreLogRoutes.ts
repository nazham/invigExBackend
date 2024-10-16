import { Router } from 'express';
import { createCentreLog, deleteCentreLog, getCentreLogById, getAllCentreLogs, updateCentreLog } from '../controllers/centreLogController';
import { validateCentreLog } from '../middlewares/validateCentreLog';

const router = Router();


// Get all exams centre
router.get('/', getAllCentreLogs);

// Get single Centre by ID
router.get('/:id', getCentreLogById);

// Create new exam centre
router.post('/', validateCentreLog, createCentreLog);

// Update Centre
router.put('/:id', updateCentreLog);

// Delete Centre
router.delete('/:id', deleteCentreLog);

export default router;
