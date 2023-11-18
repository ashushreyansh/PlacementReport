const express = require("express");
const studentRouter = express.Router(); // Use a distinct variable name for student routes
const studentController = require("../controller/strudentController");

// Define student routes
studentRouter.get("/", studentController.getStudent);
studentRouter.get("/add", (req, res) => {
  res.render("addStudent");
});
studentRouter.post("/add", studentController.createStudent);
studentRouter.get(
  "/:studentId/interviews",
  studentController.getStudentInterviews
);
studentRouter.get(
  "/:studentId/interviews/create",
  studentController.createInterviewForStudent
);
studentRouter.post(
  "/:studentId/interviews/create",
  studentController.handleCreateInterviewForStudent
);
// Route to delete a student
studentRouter.get("/:studentId/delete", studentController.deleteStudent);

// Route to render the update student view
studentRouter.get("/:studentId/update", studentController.updateStudent);

// Route to handle updating a student
studentRouter.post("/:studentId/update", studentController.handleUpdateStudent);
studentRouter.post(
  "/:studentId/interviews/:interviewId",
  studentController.handleUpdateInterviewResult
);

module.exports = studentRouter; // Export the studentRouter
