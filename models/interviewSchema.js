const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: String,
  date: String,
  results: {
    type: String,
    enum: ["On Hold", "Selected", "Pending", "Not Selected", "Did not Attempt"],
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

const Interview = mongoose.model("interview", interviewSchema);

module.exports = Interview;
