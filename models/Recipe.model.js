// Your code here ...
const mongoose = require("mongoose")
const {Schema, model} = mongoose;

// Schema describes and enforces the structure of the Book documents
const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    instructions: {type: String, required: true},
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: {type: [String]},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: Number,
    isArchived: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
})

// Creating the model
const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;