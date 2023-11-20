const express = require("express");
const app = express();
const Port = process.env.PORT || 3000;
const Router = require("./routes/routes");
const mongoose = require("./config/mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");


// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    // cookie: maxAge(60 * 60 * 1000),
  })
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
