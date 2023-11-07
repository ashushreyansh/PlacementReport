const express = require("express");
const app = express();
const Port = 8000;
const Router = require("../PlacementReport/routes/routes");
const mongoose = require("./config/mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./assets"));
app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});
app.use("/", Router);
app.listen(Port, (err) => {
  if (err) {
    console.log(`Error Connecting to server: ${err}`);
    return;
  } else {
    console.log(`connected to port: ${Port}`);
  }
});
