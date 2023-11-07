const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;