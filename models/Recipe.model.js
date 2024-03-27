const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: String,
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
  duration: { type: Number, default: 0 },
  isAchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
