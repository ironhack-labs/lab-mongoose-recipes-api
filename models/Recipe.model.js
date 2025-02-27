// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const recipeSchema = new Schema({
    title: {type: String, required:true , unique: true},
    level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
    ingredients: { type: [String] },
    cuisine: {type: String, required: true}, // Añadido
    dishType: { type: String, enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"] }, // Añadido
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
    duration: { type: Number, min: 0 },
    creator: { type: mongoose.ObjectId, ref: "User" }, // Añadido
    created: { type: Date, default: Date.now }
  });

// CREATE MODEL
const Recipe = mongoose.model("Recipe", recipeSchema);
 
 
// EXPORT THE MODEL
module.exports = Recipe;