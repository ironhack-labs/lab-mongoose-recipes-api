
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },

    instructions: {
      type: String,
      required: [true, "Instructions is required"],
    },

    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },

    ingredients: {
      type: [String],
    },

    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg",
    },

    duration: {
      type: Number,
      min: [0, "The recipe should have a duration"]
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    created: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
