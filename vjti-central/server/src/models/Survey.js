const mongoose = require("mongoose");

const survey = new mongoose.Schema({
  userID: {
    type: String,
  //  unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reward: {
    type: Number,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  field: {
   type: [
      {
        type: Array,
        ref: "field"
      }
    ],
    default: []
  },
  status:{
    type:String
  }
 
});

const Survey = mongoose.model("survey", survey);

module.exports = Survey;
