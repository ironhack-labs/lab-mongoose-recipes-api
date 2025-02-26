const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, require: true, minlength: 2 },
  lastName: { type: String, require: true, minlength: 2 },
  password: { type: String, require: true, minlength: 8 },
  image: {
    type: String,
    default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
