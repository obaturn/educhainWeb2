import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { sequelize } from './models/index.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Serve uploaded images statically
app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Import routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import mentorRoutes from './routes/mentors.js';
import communityRoutes from './routes/community.js';
import rewardRoutes from './routes/rewards.js';
import adminRoutes from './routes/admin.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/admin', adminRoutes);

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
