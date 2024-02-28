const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, required: true, minLength: 2 },
  password: { type: String, required: true, minLength: 8 },

  image: {
    type: String,
    default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg",
  },
});

const User = mongoose.model("User", user);

module.exports = User;
