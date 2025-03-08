const mongoose = require('mongoose');
const User = require('../models/User');
const Role = require('../models/Role');
const env = require('../config/env');
const { encryptPassword } = require('./encryption');

const adminEmail = 'admin@example.com';
const adminPassword = 'Admin@123';

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
        
        // Check which database we're connected to
        console.log('Connected to database:', mongoose.connection.db.databaseName);
        
        // Step 1: Create roles
        const roles = [
            { name: 'admin', permissions: ['manage_users', 'manage_roles', 'view_dashboard'] },
            { name: 'manager', permissions: ['manage_users', 'view_dashboard'] },
            { name: 'user', permissions: ['view_dashboard'] }
        ];
        
        console.log('Creating roles...');
        
        for (const roleData of roles) {
            const existingRole = await Role.findOne({ name: roleData.name });
            if (!existingRole) {
                const role = new Role(roleData);
                await role.save();
                console.log(`Role '${roleData.name}' created successfully`);
            } else {
                console.log(`Role '${roleData.name}' already exists`);
            }
        }
        
        // Step 2: Create admin user
        console.log('Creating admin user...');
        
        const adminRole = await Role.findOne({ name: 'admin' });
        if (!adminRole) {
            throw new Error('Admin role not found even after seeding');
        }
        
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await encryptPassword(adminPassword);
            
            const adminUser = new User({
                name: 'Administrator',
                email: adminEmail,
                password: hashedPassword,
                gender: 'other',
                age: 30,
                role: adminRole._id
            });
            
            await adminUser.save();
            console.log('Admin user created successfully');
            console.log('Email:', adminEmail);
            console.log('Password:', adminPassword);
        } else {
            console.log('Admin user already exists');
        }
        
        // List all roles and users for verification
        const allRoles = await Role.find({});
        console.log('All roles:', allRoles);
        
        const allUsers = await User.find({}).populate('role');
        console.log('All users:', allUsers.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role.name
        })));
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

seedDatabase();