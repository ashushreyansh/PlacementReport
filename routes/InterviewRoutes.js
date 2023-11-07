const express = require('express');
const interviewRouter = express.Router(); // Use a distinct variable name for interview routes
const interviewController = require('../controller/interviewcontroller');

// Define interview routes
interviewRouter.post('/create', interviewController.createInterview);
interviewRouter.get('/:id', interviewController.getInterview);
interviewRouter.put('/:id', interviewController.updateInterview);
interviewRouter.delete('/:id', interviewController.deleteInterview);

module.exports = interviewRouter; // Export the interviewRouter
