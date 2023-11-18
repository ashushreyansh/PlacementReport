const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  batch: String,
  studentDetails: {
    name: String,
    college: String,
    Placed: String,
  },
  courseScores: {
    DSAFinalScores: Number,
    WebDFinalScores: Number,
    ReactFinalScores: Number,
  },allocatedInterview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
  },
  interviews: [
    {
      company: String,
      date: String,
      results: {
        type: String,
        enum: [
          "On Hold",
          "Selected",
          "Pending",
          "Not Selected",
          "Did not Attempt",
        ],
      },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
