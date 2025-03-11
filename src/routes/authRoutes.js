const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { validateLogin, validateSignup, validate } = require('../utils/validation');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', validateSignup, validate, register);
router.post('/login', validateLogin, validate, login);
router.get('/profile', auth, getProfile);

module.exports = router;