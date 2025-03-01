const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to get user profile
router.get('/profile', auth, getUserProfile);

// Route to update user profile
router.put('/profile', auth, updateUserProfile);

module.exports = router;