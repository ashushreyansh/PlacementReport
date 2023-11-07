const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    batch: String,
    studentDetails : {
        college: String,
        Placed: String,
    },
    courseScores : {
        DSAFinalScores: Number,
        WebDFinalScores: Number,
        ReactFinalScores: Number, 
    },
    interviews: [
        {
            companyName: String,
            date: Date,
            results: [
                {
                    company: String,
                    result: String,
                },
            ],
        },
    ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;