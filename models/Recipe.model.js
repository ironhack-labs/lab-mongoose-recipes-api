// ./models/Recipe.model.js
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const recipeSchema = new Schema({
  title: { type: String, require: true, unique: true },
  instructions: { type: String, require: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

const Recipe = model("Recipe", recipeSchema);

// EXPORT THE MODEL
module.exports = Recipe;
