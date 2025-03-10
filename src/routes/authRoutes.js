const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateLogin, validateSignup, validate } = require('../utils/validation');

const router = express.Router();

router.post('/signup', validateSignup, validate, register);
router.post('/login', validateLogin, validate, login);

module.exports = router;