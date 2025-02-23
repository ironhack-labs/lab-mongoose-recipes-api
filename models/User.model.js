const mongoose = require("mongoose");
const { defaultConfiguration } = require("../app");

// Your code here ...
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  image: {
    type: String,
    default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
