import express from 'express';
import { getCommunities, getCommunity, createCommunity } from '../controllers/communityController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCommunities);
router.get('/:id', getCommunity);
router.post('/', authenticateToken, createCommunity);

export default router;
