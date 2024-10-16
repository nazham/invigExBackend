import { Router } from 'express';
import { createCentre, deleteCentre, getCentreById, getCentres, updateCentre } from '../controllers/centreController';

const router = Router();


// Get all exams centre
router.get('/', getCentres);

// Get single Centre by ID
router.get('/:id', getCentreById);

// Create new exam centre
router.post('/', createCentre);

// Update Centre
router.put('/:id', updateCentre);

// Delete Centre
router.delete('/:id', deleteCentre);

export default router;
