const express = require('express');
const studentRouter = express.Router(); // Use a distinct variable name for student routes
const studentController = require('../controller/strudentController');

// Define student routes
studentRouter.post('/create', studentController.createStudent);
studentRouter.get('/:id', studentController.getStudent);
studentRouter.put('/:id', studentController.updateStudent);
studentRouter.delete('/:id', studentController.deleteStudent);

module.exports = studentRouter; // Export the studentRouter
