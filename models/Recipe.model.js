// Your code here ...
// Your code here ...
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    instructions: { type: String, required: true },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "Ultrapro Chef"],
    },
    ingredients: [String],
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: { type: Number, min: 0 },
    isArchived: { type: Boolean, default: false },
    //created: {type: Date} <-- WE DON'T NEED, TIMESTAMPS WILL TAKE CARE OF IT
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;