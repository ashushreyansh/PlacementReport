const express = require("express");
const mainRouter = express.Router(); // Use a distinct variable name for the main router
const batchRouter = require("./batchRoutes");
const interviewRouter = require("./InterviewRoutes");
const resultsRouter = require("./resultRoutes");
const studentRouter = require("./studentRoutes");

// Attach the other routers to the main router
mainRouter.use("/batches", batchRouter);
mainRouter.use("/interviews", interviewRouter);
mainRouter.use("/results", resultsRouter);
mainRouter.use("/students", studentRouter);

module.exports = mainRouter; // Export the mainRouter
