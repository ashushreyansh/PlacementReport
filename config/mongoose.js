const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/placement_report" );
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
    console.log(`MongoDB refused Connection : ${err}`);
});

module.exports = mongoose;