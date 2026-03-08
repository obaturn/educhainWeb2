import Mentor from '../models/Mentor.js';

export async function getMentors(req, res) {
  try {
    const mentors = await Mentor.findAll();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch mentors', error: err.message });
  }
}

export async function getMentor(req, res) {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch mentor', error: err.message });
  }
}

export async function createMentor(req, res) {
  const { userId, bio, expertise } = req.body;
  try {
    const mentor = await Mentor.create({ userId, bio, expertise });
    res.status(201).json(mentor);
  } catch (err) {
    res.status(500).json({ message: 'Mentor creation failed', error: err.message });
  }
}
