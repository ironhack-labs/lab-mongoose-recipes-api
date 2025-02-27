// Your code here ...
// models/Recipe.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE A SCHEMA
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true, minlength: 2 },
  password: { type: String, required: true, minlength: 8 }, 
  image: { type: String, default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg" },
});

// CREATE A MODEL
const User = mongoose.model("Recipe", userSchema);

// EXPORT THE MODEL
module.exports = User;