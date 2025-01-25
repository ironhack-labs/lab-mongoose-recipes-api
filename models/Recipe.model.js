// Your code here ...
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({ // Schema es un objeto que define la estructura de los eventos
    title: {
        type: String,
        required: [true, 'Event title is required'],  // Si no se pone un título, salta un error 
        unique: true,    
    },

    instructions: {
        type: String,
        required: [true, 'Recipe instruction are required'],
    },

    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },

    ingredients: {
        type: [ String ],
    },

    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg",
    },

    duration: {
        type: Number,
        min: 0,
    },

    isArchived: {
        type: Boolean,
        default: false,
    },

    created: {
        type: Date,
        default: Date.now,
    }
});


const Recipe = mongoose.model('Recipe', eventSchema); // Model crea un objeto que se corresponde con modelo definido anteriormente
module.exports = Recipe; 