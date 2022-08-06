const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
  walletID: {
    type: String
  },
  skills: {
    type: String, 
  },
  gender: {
    type: String,
  },
  empstatus:{
    type:String,
  },
  martialstatus:{
    type:String,
  },
  nationality:{
    type:String,
  },
  surveysCreated: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "survey"
      }
    ],
    default: []
  },
  surveysFilled: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "survey"
      }
    ],
    default: []
  }
});

const User = mongoose.model("user", user);

module.exports = User;
