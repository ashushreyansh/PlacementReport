const Interview = require("../models/interviewSchema");

exports.getStudentInterviews = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch the interviews for the specific student based on the studentId
    const interviews = await Interview.find({ studentId: studentId });

    res.render("interview", { interviews, studentId }); // Render a new view with the interviews
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createInterview = async (req, res) => {
  // Extract necessary data from the request body
  const { company, date } = req.body;

  try {
    // Create a new interview in the database
    const newInterview = await Interview.create({ company, date });

    // Redirect to the interviews page or perform other actions as needed
    res.redirect("/interviews");
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: err.message });
  }
};
