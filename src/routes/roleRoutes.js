const express = require('express');
const { addRole, updateRole, deleteRole, getRoles } = require('../controllers/roleController');
const roleCheck = require('../middleware/roleCheck');
const auth = require('../middleware/auth');

const router = express.Router();

// Route to add a new role
router.post('/', auth, roleCheck(['admin']), addRole);

// Route to edit an existing role
router.put('/:id', auth, roleCheck(['admin']), updateRole);

// Route to delete a role
router.delete('/:id', auth, roleCheck(['admin']), deleteRole);

// Route to get all roles
router.get('/', auth, getRoles);

module.exports = router;