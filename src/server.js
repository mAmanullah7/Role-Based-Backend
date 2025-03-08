const express = require('express');
const mongoose = require('mongoose');
const env = require('./config/env');
const app = require('./app');

const PORT = env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        
        // Only start the server if not in a serverless environment
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Export the app for serverless environments
module.exports = app;