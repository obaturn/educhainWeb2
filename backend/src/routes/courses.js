import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createCourse, getCourses, getCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourse);

export default router;
