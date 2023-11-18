const Student = require("../models/studentSchema");
const Interview = require("../models/interviewSchema");

module.exports.createStudent = async function (req, res) {
  const {
    batch,
    name,
    college,
    Placed,
    DSAFinalScores,
    WebDFinalScores,
    ReactFinalScores,
    companyName,
    date,
    interviewResult,
  } = req.body;

  try {
    const newStudent = await Student.create({
      batch,
      studentDetails: { name, college, Placed },
      courseScores: {
        DSAFinalScores,
        WebDFinalScores,
        ReactFinalScores,
      },
      interviews: [
        {
          companyName,
          date,
          results: interviewResult,
        },
      ],
    });

    await newStudent.save();
    return res.redirect("/students");
  } catch (error) {
    console.log(`Error in creating student: ${error}`);
    return res.redirect("back");
  }
};

exports.getStudent = async (req, res) => {
  try {
    const studentsData = await Student.find().populate("allocatedInterview");
    if (!studentsData || studentsData.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.render("student", { students: studentsData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getStudentInterviews = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch the student by ID with their associated interviews and populate interview details
    const student = await Student.findById(studentId).populate({
      path: "interviews",
      model: "Interview", // Make sure to use the correct model name
    });

    // Render the view with the student and interviews data
    res.render("interview", { student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createInterviewForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Retrieve the student information from the database
    const student = await Student.findById(studentId).populate("interviews");

    if (!student) {
      // Handle the case where the student is not found
      return res.status(404).send("Student not found");
    }

    // Render the view with the student data
    res.render("createInterviewForStudent", { student, studentId });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: err.message });
  }
};
exports.handleCreateInterviewForStudent = async (req, res) => {
  const { studentId } = req.params;
  const { company, date, result } = req.body;

  try {
    // Create a new interview
    const newInterview = await Interview.create({
      company,
      date,
      results: result,
    });

    // Retrieve the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      // Handle the case where the student is not found
      return res.status(404).send("Student not found");
    }

    // Add the new interview to the student's interviews array
    student.interviews.push({
      company: newInterview.company,
      date: newInterview.date,
      results: newInterview.results,
    });

    // Save the updated student
    await student.save();

    res.redirect(`/students/${studentId}/interviews`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
