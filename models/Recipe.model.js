const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({

    title:{
    type: String,
    required: true,
    unique: [true, "All Recipe titles need to be unique"]
    },
    
    instructions:{
        type: String,
        required: true
    },

    level:{
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },

    ingredients:{
        type: [String],
    },

    image:{
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    
    duration:{
        type: Number,
        min: 0
    },

    isArchived:{
        type: Boolean,
        default: false
    },

    created:{
        type: Date,
        default: Date.now()
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;