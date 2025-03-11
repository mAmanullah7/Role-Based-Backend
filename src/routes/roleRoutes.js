const express = require('express');
const { addRole, updateRole, deleteRole, getRoles, getRoleById } = require('../controllers/roleController');
const roleCheck = require('../middleware/roleCheck');
const auth = require('../middleware/auth');
const { validateRole, validate } = require('../utils/validation');

const router = express.Router();

// Route to add a new role
router.post('/', auth, roleCheck(['admin']), validateRole, validate, addRole);

// Route to edit an existing role
router.put('/:id', auth, roleCheck(['admin']), validateRole, validate, updateRole);

// Route to delete a role
router.delete('/:id', auth, roleCheck(['admin']), deleteRole);

// Route to get all roles
router.get('/', auth, getRoles);

// Route to get a role by ID
router.get('/:id', auth, getRoleById);

module.exports = router;