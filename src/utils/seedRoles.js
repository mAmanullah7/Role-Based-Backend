const mongoose = require('mongoose');
const Role = require('../models/Role');
const env = require('../config/env');

mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected for seeding');
        
        // Check if roles already exist
        const adminExists = await Role.findOne({ name: 'admin' });
        const userExists = await Role.findOne({ name: 'user' });
        
        if (!adminExists) {
            await new Role({
                name: 'admin',
                permissions: ['manage_roles', 'manage_users', 'view_dashboard']
            }).save();
            console.log('Admin role created');
        }
        
        if (!userExists) {
            await new Role({
                name: 'user',
                permissions: ['view_dashboard']
            }).save();
            console.log('User role created');
        }
        
        console.log('Seeding completed');
        process.exit();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });