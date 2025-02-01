// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title name is required"],
      trim: true,
      unique:true
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],

    },
    level: {
      type: String,
      required: [true, "Level is required"],
      trim: true,
      enum: ["Easy Peasy", "Amateur Chef", "Ultrapro Chef"]
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      required: [true, "Number is required"],
      min: [0],
      trim: true,

    },
    isArchived: {
      type: Boolean,
      required: [true, "is archived is required"],
      default: false,
      trim: true,
    },
    created: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
      trim: true,
    },
    }
    );

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
