// Your code here ...
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients: { type: [String], required: true },
    isArchived: { type: Boolean, default: false },
    image: { type: String, default: " https://images.media-allrecipes.com/images/75131.jpg "},
    duration: { type: Number, min: 0 },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
