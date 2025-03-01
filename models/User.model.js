const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    minlength: 2,
    required: true
  },
  lastName: {
    type: String,
    minlength: 2,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  image: {
    type: String,
    default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;