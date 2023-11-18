const express = require("express");
const Router = express.Router();
const batchRouter = require("./batchRoutes");
const interviewRouter = require("./InterviewRoutes");
const resultsRouter = require("./resultRoutes");
const studentRouter = require("./studentRoutes");
const userController = require("../controller/userController");
const passport = require("../config/passportStrategy");
const csvRoutes = require("./csvRoutes");
// Attach the other routers to the main router
Router.get("/failure", (req, res) => {
  res.render("failure");
});
Router.get("/signup", (req, res) => {
  res.render("signup");
});

Router.get("/login", (req, res) => {
  res.render("login");
});

Router.post("/signup", userController.signup);

Router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/students",
    failureRedirect: "/failure",
    failureFlash: true,
  })
);

Router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
Router.use(passport.checkAuthentication);
Router.use("/batches", batchRouter);
Router.use("/interviews", interviewRouter);
Router.use("/results", resultsRouter);
Router.get("/", (req, res) => {
  res.redirect("/students");
});
const isEmployee = (req, res, next) => {
  // Assuming your user object has a 'role' property
  if (req.isAuthenticated() && req.user.role === "employee") {
    return next(); // User is an employee, allow access
  } else if (req.isAuthenticated() && req.user.role === "user") {
    return res.redirect("/failure"); // Redirect users with role "user" to the failure page
  } else {
    res.redirect("/"); // Redirect to home page or show an error message
  }
};

Router.use("/students", isEmployee, studentRouter);
Router.use("/csv", csvRoutes);
module.exports = Router;
