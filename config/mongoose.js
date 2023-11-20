const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ashushreyansh:C6ePRAlsHmMQmkgX@cluster0.t6vd3t5.mongodb.net/placement_report";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB server");
});
db.on("error", (err) => {
  console.log(`MongoDB refused Connection : ${err}`);
});

module.exports = mongoose;
