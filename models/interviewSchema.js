const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    comapny: String,
    date: Date,
});

const Interview = mongoose.model("interview", interviewSchema);

module.exports = Interview;