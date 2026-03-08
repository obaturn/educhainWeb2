import express from 'express';
import { getRewards, getReward, createReward } from '../controllers/rewardController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRewards);
router.get('/:id', getReward);
router.post('/', authenticateToken, createReward);

export default router;
