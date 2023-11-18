const express = require("express");
const app = express();
const Port = 8000;
const Router = require("../PlacementReport/routes/routes");
const mongoose = require("./config/mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require('express-flash');

// Use express-session middleware
app.use(
  session({
    secret: "secret_key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 60 * 60 * 1000 },
  }),
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));
app.use("/", Router);

app.listen(Port, (err) => {
  if (err) {
    console.log(`Error Connecting to server: ${err}`);
    return;
  } else {
    console.log(`connected to port: ${Port}`);
  }
});
