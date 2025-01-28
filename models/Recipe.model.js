// Your code here ...
// Import mongoose
const mongoose = require('mongoose');

// Destructure Schema from mongoose
const { Schema, model } = mongoose;

// Define the Recipe schema
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  instructions: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: [String]
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Recipe model
module.exports = model('Recipe', recipeSchema);