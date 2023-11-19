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
      // Redirect to the student add page if there are no students
      return res.redirect("/students/add");
    }
    res.render("student", { students: studentsData });
  } catch (err) {
    // If an error occurs, check if it's due to a "Student not found" error
    if (err.message === "Student not found") {
      // Redirect to the student add page if a student is not found
      return res.redirect("/students/add");
    }
    // If it's a different error, return a 500 status with the error message
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student by ID and remove it
    await Student.findByIdAndDelete(studentId);

    // Redirect to the students page after deletion
    res.redirect("/students");
  } catch (error) {
    console.error(`Error deleting student: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.render("updateStudent", { student });
  } catch (error) {
    console.error(`Error rendering update student page: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.handleUpdateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
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

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      // Handle the case where the student is not found
      return res.status(404).send("Student not found");
    }

    // Update the student's information
    student.batch = batch;
    student.studentDetails.name = name;
    student.studentDetails.college = college;
    student.studentDetails.Placed = Placed;
    student.courseScores.DSAFinalScores = DSAFinalScores;
    student.courseScores.WebDFinalScores = WebDFinalScores;
    student.courseScores.ReactFinalScores = ReactFinalScores;

    // Update the interview information
    student.interviews[0].company = companyName;
    student.interviews[0].date = date;
    student.interviews[0].results = interviewResult;

    // Save the updated student
    await student.save();

    res.redirect(`/students`);
  } catch (error) {
    console.error(`Error updating student: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
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
// Handle the update of interview result
exports.handleUpdateInterviewResult = async (req, res) => {
  const { studentId, interviewId } = req.params;
  const { result } = req.body;

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      // Handle the case where the student is not found
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the interview within the student's interviews array
    const interviewToUpdate = student.interviews.find(
      (interview) => interview._id.toString() === interviewId
    );

    if (!interviewToUpdate) {
      // Handle the case where the interview is not found
      return res.status(404).json({ error: "Interview not found" });
    }

    // Update the result in the interview
    interviewToUpdate.results = result;

    // Save the updated student
    await student.save();

    res.status(200).json({ message: "Interview result updated successfully" });
  } catch (error) {
    console.error(`Error updating interview result: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
