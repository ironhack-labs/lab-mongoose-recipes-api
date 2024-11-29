// Your code here ...
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    level: { type: String, required: true, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']    },
    ingredients: { type: [String] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    isARchived: { type: Boolean, default: false},
    created: { type: Date, default: Date.now }
    });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;