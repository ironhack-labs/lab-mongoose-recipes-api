// Your code here ...
const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  instructions: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", " UltraPro Chef"],
  },
  ingredients: { tpye: [String] }, // Ask this
  image: {
    type: String,
    Default: " https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },

  isArchived: { type: Boolean, default: false },
  create: {
    type: Date,
    default: today,
  },
});

module.exports = Recipe;
