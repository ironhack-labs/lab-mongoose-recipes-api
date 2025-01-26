const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    unique: true,
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    trim: true,
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    required: [true, "Level is required"],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"],
    trim: true,
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
