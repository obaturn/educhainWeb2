import express from 'express';
import { getAllUsers, getAllCourses, deleteUser } from '../controllers/adminController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', authenticateToken, authorizeRoles('admin'), getAllUsers);
router.get('/courses', authenticateToken, authorizeRoles('admin'), getAllCourses);
router.delete('/users/:id', authenticateToken, authorizeRoles('admin'), deleteUser);

export default router;
