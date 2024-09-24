// Your code here ...

const mongoose = require("mongoose")

const recipesSchema = new mongoose.Schema({
    title: String,
    instructions: String,
    level: String,
    ingredients: [ String ],
    image: String,
    duration: {
        type: Number,
        minValue: 0
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

const recipeModel = mongoose.model('Book', recipesSchema)

module.exports = recipeModel