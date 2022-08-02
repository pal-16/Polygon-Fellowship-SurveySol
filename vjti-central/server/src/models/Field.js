const mongoose = require("mongoose");


const field = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: { type : Array , "default" : [] 
}
  
 
});

const Field = mongoose.model("field", field);

module.exports = Field;
