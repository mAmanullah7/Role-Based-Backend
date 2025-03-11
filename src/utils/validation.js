const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
];

const validateLogin = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateRole = [
    body('name').notEmpty().withMessage('Role name is required'),
    body('permissions').isArray().withMessage('Permissions must be an array'),
];

const validateRoleAssignment = [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('roleId').notEmpty().withMessage('Role ID is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    validateRole,
    validateRoleAssignment,
    validate,
};