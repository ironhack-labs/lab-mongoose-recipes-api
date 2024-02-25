const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: { type: String, required: true, minlength: 8 },
  image: {
    type: String,
    default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg",
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.model("User", userSchema);

// EXPORT THE MODEL
module.exports = User;
