const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, gender, age } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, gender, age },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users (for admin dashboard)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Assign role to user
exports.assignRoleToUser = async (req, res) => {
    const { userId, roleId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = roleId;
        await user.save();

        const updatedUser = await User.findById(userId).populate('role');

        res.status(200).json({ 
            message: 'Role assigned successfully', 
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role.name
            } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning role', error: error.message });
    }
};