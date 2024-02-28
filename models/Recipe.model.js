const moongose = require("mongoose");
const {Schema, model} = moongose;
const url = "https://images.media-allrecipes.com/images/75131.jpg"

const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true}, // string, required field
    instructions : {type: String, required: true},
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]}, // String
    ingredients : [String],
    image :{type: String, default: url},
    duration: {type: Number, min: 0},
    isArchived: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
})
module.exports = model("Recipe", recipeSchema)