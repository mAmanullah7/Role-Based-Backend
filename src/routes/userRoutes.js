const express = require('express');
const { getUserProfile, updateUserProfile, getAllUsers, assignRoleToUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Route to get user profile
router.get('/profile', auth, getUserProfile);

// Route to update user profile
router.put('/profile', auth, updateUserProfile);

// Route to get all users (admin only)
router.get('/', auth, roleCheck(['admin']), getAllUsers);

// Route to assign role to user (admin only)
router.post('/assign-role', auth, roleCheck(['admin']), assignRoleToUser);

module.exports = router;