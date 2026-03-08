import Community from '../models/Community.js';

export async function getCommunities(req, res) {
  try {
    const communities = await Community.findAll();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch communities', error: err.message });
  }
}

export async function getCommunity(req, res) {
  try {
    const community = await Community.findByPk(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    res.json(community);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch community', error: err.message });
  }
}

export async function createCommunity(req, res) {
  const { name, description, members } = req.body;
  try {
    const community = await Community.create({ name, description, members });
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: 'Community creation failed', error: err.message });
  }
}
