const mongoose = require("mongoose");

const survey = new mongoose.Schema({
  userID: {
    type: String,
  },
  deployedAddress:{
    type:String
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
  rewardtokenaddress:{
    type:String
  }, 
nfttokenaddress:{
  type:String
}, 
amountnft:{
  type:Number
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
  field: {
   type: [
      {
        type: Array,
        ref: "field"
      }
    ],
    default: []
  },
 
});

const Survey = mongoose.model("survey", survey);

module.exports = Survey;
