const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const recipeSchema = new Schema({
  title: String,
  instructions: String,
  level: String,
  ingredients: [ String ],
  image: String,
  duration: String,
  isArchived: String,
  created: {type: Date, default: Date.now}
})

module.exports = model("Recipe", recipeSchema);


 

