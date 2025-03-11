const Role = require('../models/Role');

// Add a new role
exports.addRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error: error.message });
    }
};

// Get all roles
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
};

// Get a role by ID
exports.getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error: error.message });
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRole = await Role.findByIdAndDelete(id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
};