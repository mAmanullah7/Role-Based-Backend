import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Route to get user profile
router.get('/profile', authenticate, getUserProfile);

// Route to update user profile
router.put('/profile', authenticate, updateUserProfile);

export default router;