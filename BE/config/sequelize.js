// sequelize.js

const { Sequelize } = require('sequelize');
const config = require('../config'); // Import the configuration

// Determine the current environment
const env = process.env.NODE_ENV || 'development';

// Initialize Sequelize with the appropriate configuration for the current environment
const sequelize = new Sequelize(config[env]);

module.exports = sequelize;
