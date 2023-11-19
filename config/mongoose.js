const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/placement_report" );
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
    console.log(`MongoDB refused Connection : ${err}`);
});

module.exports = mongoose;