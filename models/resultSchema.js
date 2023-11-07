const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student"},
    Interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview"},
    result: String,
});

const Result = mongoose.model("result", resultSchema);

module.exports = Result;