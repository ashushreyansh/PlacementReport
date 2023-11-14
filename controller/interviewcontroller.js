const Interview = require("../models/interviewSchema");

exports.createInterview = async (req, res) => {};
exports.getInterview = async (req, res) => {
    try {
        const yourInterviewsArray = await Interview.find();
        res.render("interview.ejs", { interviews: yourInterviewsArray });
    }catch(err){
        res.status(403).json(`error : ${err}`);
    }
  
};
exports.allocateStudent = async (req, res) => {};

exports.viewStudents = async (req, res) => {};

exports.markResult = async (req, res) => {};
