const express = require("express");
const interviewRouter = express.Router(); // Use a distinct variable name for interview routes
const interviewController = require("../controller/interviewcontroller");

// Define interview routes
interviewRouter.post("/create", interviewController.createInterview);
interviewRouter.get(
  "/students/:studentId/interviews",
  interviewController.getStudentInterviews
);

module.exports = interviewRouter; // Export the interviewRouter
