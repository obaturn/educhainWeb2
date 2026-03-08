import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  let avatarUrl = '';
  if (req.file) {
    avatarUrl = `/api/uploads/${req.file.filename}`;
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'This email is already registered. Please use a different email or try logging in.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store avatarUrl in profile JSON
    const user = await User.create({ name, email, password: hashedPassword, role, profile: { avatarUrl } });
    res.status(201).json({
      message: 'Welcome to EduChain! Your account has been created successfully.',
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl }
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed. Please try again later.', error: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password. Please check your credentials and try again.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid email or password. Please check your credentials and try again.' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const avatarUrl = user.profile?.avatarUrl || '';
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed. Please try again later.', error: err.message });
  }
}
