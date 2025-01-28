// Your code here ...
const mongoose = require("mongoose");
const dayjs = require('../config/dayjs.config');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Title needs at least 3 characters"],
      maxLength: [100, "Title characters must be lower than 100"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],
      trim: true,
      minLength: [3, "Instructions needs at least 3 characters"],
      maxLength: [100, "Instructions characters must be lower than 100"],
    },
    level: {
      type: String,
      enum: ["Coffee", "Tea"],
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
      min: [0, "Minimum value must be 0"],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: dayjs().toDate(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        ret.id = doc.id;
        return ret;
      },
    },
  }
);

const Recipe = mongoose.model("Event", recipeSchema);
module.exports = Recipe;
