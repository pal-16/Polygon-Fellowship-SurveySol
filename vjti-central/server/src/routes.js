const UserController = require("./controllers/UserController");
const SurveyController = require("./controllers/SurveyController");

const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");

 
module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Connected");
  });

  //User Routes
  app.post(
    "/api/user/register",
    UserController.registerUser
  );

  app.post(
    "/api/survey/create",
    SurveyController.createSurvey
  );
  app.get(
    "/api/surveys",
    SurveyController.getSurveys
  );

  
};
