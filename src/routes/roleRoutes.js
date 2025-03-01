const express = require('express');
const { addRole, editRole, deleteRole, getRoles } = require('../controllers/roleController');
const { roleCheck } = require('../middleware/roleCheck');

const router = express.Router();

// Route to add a new role
router.post('/', roleCheck('admin'), addRole);

// Route to edit an existing role
router.put('/:id', roleCheck('admin'), editRole);

// Route to delete a role
router.delete('/:id', roleCheck('admin'), deleteRole);

// Route to get all roles
router.get('/', getRoles);

module.exports = router;