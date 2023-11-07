const express = require('express');
const batchRouter = express.Router(); // Use a distinct variable name for batch routes
const batchController = require('../controller/batchController');

// Define batch routes
batchRouter.post('/create', batchController.createBatch);
batchRouter.get('/:id', batchController.getBatch);
batchRouter.put('/:id', batchController.updateBatch);
batchRouter.delete('/:id', batchController.deleteBatch);

module.exports = batchRouter; // Export the batchRouter
