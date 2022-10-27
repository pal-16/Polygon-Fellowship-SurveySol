const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
  walletID: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  occupation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
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
