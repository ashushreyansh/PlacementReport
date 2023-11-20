const express = require("express");
const app = express();
const Port = process.env.PORT || 3000;
const Router = require("./routes/routes");
const mongoose = require("./config/mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const client = new MongoClient(uri);
// Set up the MongoDB session store
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/your-session-database",
  collection: "sessions",
});
// Catch errors in the MongoDB session store
store.on("error", (error) => {
  console.error("MongoDB session store error:", error);
});

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: store,
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

// app.listen(Port, (err) => {
//   if (err) {
//     console.log(`Error Connecting to server: ${err}`);
//     return;
//   } else {
//     console.log(`connected to port: ${Port}`);
//   }
// });
client.connect(err => {
  if(err){ console.error(err); return false;}
  // connection to mongo is successful, listen for requests
  app.listen(Port, () => {
      console.log("listening for requests");
  })
});