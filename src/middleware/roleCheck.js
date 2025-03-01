const Role = require('../models/Role');

const roleCheck = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming user role is attached to req.user by auth middleware

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

module.exports = roleCheck;