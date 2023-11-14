const express = require("express");
const studentRouter = express.Router(); // Use a distinct variable name for student routes
const studentController = require("../controller/strudentController");

// Define student routes
studentRouter.get("/", studentController.getStudent);
studentRouter.get("/add", (req, res) => {
  res.render("addStudent");
});
studentRouter.post("/add", studentController.createStudent);

module.exports = studentRouter; // Export the studentRouter
