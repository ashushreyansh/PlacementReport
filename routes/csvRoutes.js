const express = require('express');
const csvrouter = express.Router();
const csvController = require('../controller/csvController');

// Route to generate and save CSV data
csvrouter.get('/', csvController.generateCSV);

module.exports = csvrouter;
