const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    if (newUser.role === "employee") {
      // Redirect to the student list page for employees
      return res.redirect("/students");
    } else {
      // Redirect to the homepage for regular users
      return res.redirect("/");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "No such account was found" });
      return;
    }
    if (user.role !== "employee") {
      return res.status(403).json({ message: "Access forbidden" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
