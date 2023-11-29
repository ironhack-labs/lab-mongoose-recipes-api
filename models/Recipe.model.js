// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "Ultra Pro Chef"],
  },
  ingredients: {
    type: [String],
  },
  image: {
    type: String,
  },
  duration: {
    type: Number,
    min: 0,
  },
  isArchived: {
    type: Boolean,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
