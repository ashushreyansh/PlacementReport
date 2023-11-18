const Student = require("../models/studentSchema");
const fs = require("fs");
const fastcsv = require("fast-csv");

exports.generateCSV = async (req, res) => {
  try {
    console.log("generating csv..");
    const students = await Student.find().populate("interviews");

    const csvData = [];

    students.forEach((student) => {
      student.interviews.forEach((interview) => {
        csvData.push({
          studentId: student._id,
          studentName: student.studentDetails.name,
          studentCollege: student.studentDetails.college,
          studentStatus: student.studentDetails.Placed,
          dsaFinalScore: student.courseScores.DSAFinalScores,
          webDFinalScore: student.courseScores.WebDFinalScores,
          reactFinalScore: student.courseScores.ReactFinalScores,
          interviewDate: interview.date,
          interviewCompany: interview.companyName,
          interviewResult: interview.results,
        });
      });
    });

    // Set headers for the response to force download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");

    // Create a CSV stream and write the data directly to the response
    const csvStream = fastcsv.format({ headers: true });

    // Log when the CSV stream is opened
    csvStream
      .on("data", () => {})
      .on("end", () => {
        console.log("CSV stream ended");
      })
      .on("error", (err) => {
        console.error("CSV stream error:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });

    // Pipe the CSV stream directly to the response
    csvStream.pipe(res);

    // Log when writing each row of data
    csvData.forEach((data) => {
      console.log("Writing CSV row:", data);
      csvStream.write(data);
    });

    // End the CSV stream
    csvStream.end(() => {
      console.log("CSV stream fully processed");
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
