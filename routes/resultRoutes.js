const express = require('express');
const resultsRouter = express.Router(); // Use a distinct variable name for results routes
const resultsController = require('../controller/resultController');

// Define results routes
resultsRouter.post('/create', resultsController.createResult);
resultsRouter.get('/:id', resultsController.getResult);
resultsRouter.put('/:id', resultsController.updateResult);
resultsRouter.delete('/:id', resultsController.deleteResult);

module.exports = resultsRouter; // Export the resultsRouter
