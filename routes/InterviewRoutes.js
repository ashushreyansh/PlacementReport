const express = require('express');
const interviewRouter = express.Router(); // Use a distinct variable name for interview routes
const interviewController = require('../controller/interviewcontroller');

// Define interview routes
interviewRouter.get("/", interviewController.getInterview);
interviewRouter.post("/create", interviewController.createInterview);
interviewRouter.post("/:id/allocate", interviewController.allocateStudent);
interviewRouter.get("/:id/students", interviewController.viewStudents);
interviewRouter.post("/:id/students/:studentId/mark-result", interviewController.markResult);

module.exports = interviewRouter; // Export the interviewRouter
