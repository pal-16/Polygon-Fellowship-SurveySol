const Survey = require("../models/Survey");

module.exports = {
  
  async createSurvey(req, res) {
    try {
    console.log(req.body);
    console.log("called here")
        const survey = await Survey.create({
          ...req.body
        });

        // await User.findByIdAndUpdate(req.body.userID, {
        //   $push: { surveyCreated: survey }
        // });
        
        return res.status(201).json({
          message: "Survey created"
        });
  
    
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async getSurveys(req, res) {
    try {
      const surveys = await Survey.find();
      return res.status(200).json({ surveys });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

 
  async getSurveyDetail(req, res) {
    try {
  
      const Survey = await Survey.findById(req.params.id)
        .populate("studentID")
        .populate("facultyID")
        .exec();
   
      if (Survey) {
        return res.status(200).json(Survey);
      } else {
        return res.status(404).json({ error: "Invalid Survey ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  
};
