const mongoose = require('mongoose');


// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
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
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    required: true
  },
  ingredients: {
    type: [String], // Array of strings
    required: true
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

// Create the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;