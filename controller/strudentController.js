const Student = require("../models/studentSchema");

exports.createStudent = async (req, res) => {
  const { name, college, status } = req.body;

  try {
    const newStudent = await Student.create({ name, college, status });
    res.redirect("/students");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getStudent = async (req, res) => {
  try {
    const studentsData = await Student.find();
    if (!studentsData || studentsData.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.render("student", { students: studentsData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, college, status } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, college, status },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
