const User = require("../models/User");
const auth = require("../utilities/auth");


//Register User
exports.registerUser = async (req, res) => {
  try {
    console.log("ergthysrd'");
    console.log(req.body);
    const newUser = await User.create({
      ...req.body,

    });
  console.log("done");
    res.status(201).json({
      status: "success",
      data: {
        userID: newUser._id,
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
