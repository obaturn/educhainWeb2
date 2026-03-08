import express from 'express';
import { register, login } from '../controllers/authController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup for profile image upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(process.cwd(), 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

router.post('/register', upload.single('avatar'), register);
router.post('/login', login);

export default router;
