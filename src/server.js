const express = require('express');
const mongoose = require('mongoose');
const env = require('./config/env');
const app = require('./app');

const PORT = env.PORT || 3000;

mongoose.connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });