import Reward from '../models/Reward.js';

export async function getRewards(req, res) {
  try {
    const rewards = await Reward.findAll();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rewards', error: err.message });
  }
}

export async function getReward(req, res) {
  try {
    const reward = await Reward.findByPk(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reward', error: err.message });
  }
}

export async function createReward(req, res) {
  const { userId, points, description } = req.body;
  try {
    const reward = await Reward.create({ userId, points, description });
    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({ message: 'Reward creation failed', error: err.message });
  }
}
