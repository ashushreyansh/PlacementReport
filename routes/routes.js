const express = require("express");
const Router = express.Router(); // Use a distinct variable name for the main router
const batchRouter = require("./batchRoutes");
const interviewRouter = require("./InterviewRoutes");
const resultsRouter = require("./resultRoutes");
const studentRouter = require("./studentRoutes");
const userController = require("../controller/userController");

// Attach the other routers to the main router
Router.get("/signup", (req, res) => {
  res.render("signup");
});
Router.get("/login", (req, res) => {
  res.render("login");
});
Router.post("/signup", userController.signup);
Router.post("/login", userController.login);
Router.use("/batches", batchRouter);
Router.use("/interviews", interviewRouter);
Router.use("/results", resultsRouter);
Router.get("/", (req, res) => {
  res.redirect("/students");
});
Router.use("/students", studentRouter);
Router.use("/students/add", studentRouter);

module.exports = Router; // Export the mainRouter
