const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', register); // Note: function is named "register" in authController, not "signup"
router.post('/login', login);

module.exports = router;