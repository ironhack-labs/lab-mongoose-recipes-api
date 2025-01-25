const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// definimos el esquema de la cólección
const recipeSchema = new Schema(
{
    title: {
        type: String,
        required : [ true, "title is required"],
        trim: true,
        unique:true,
    },

    instructions: {
        type: String,
        required: [ true, "instructions is required"],
    },

    level: {

        type: String,
        required: [ true, "level is required"],
        trim: true,
        enum: ["Easy Peasy", "Chef Amateur", "Chef UltraPro"],
    },

    ingredients: {
        type: [String],
        required: [ true,"ingredients is required"],
        trim: true,
    },

    image: {
        type: String,
        required: [true,"image is reqwuired"],
        trim: true,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },

    duration: {
        type: Number,
        required: [true, "Number is required"]
    },

    isArchived:{
        type: Boolean,
        required: [true,"is archived is required"],
        default: False,
    },

    created:{
        type: date,
        required: [true, "data required"],
        default: date.now,
        trim: true,

    }}


)


const Recipe = mongoose.model("Recipe", recipeSchema);


module.exports = Recipe;