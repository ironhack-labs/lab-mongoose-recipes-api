const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: [true, 'Title is unique']
    },
    instructions: {
        type: String,
        required: [true, 'Title is required'],
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
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        minValue: [0, 'Duration should start at 0 value']
    },
    isArchived: {
        type: Boolean,
        default: [false, 'Default value should be false']
    },
    created: {
        type: Date,
        default: Date.now       

    }


});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;