import express from 'express';
import { getMentors, getMentor, createMentor } from '../controllers/mentorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMentors);
router.get('/:id', getMentor);
router.post('/', authenticateToken, createMentor);

export default router;
