const {model, Schema, now} = require("mongoose")

const recipeSchema = new Schema({
    title: {
        type: String
    },
    instructions: {
        type: String
    },
    level: {
        type: String
    },
    ingredients: {
        type: String
    },
    image: {
        type: String
    },
    duration: {
        type: Number
    },
    isArchived: {
        type: Boolean
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const RecipeModel = model("Recipe", recipeSchema)

module.exports = RecipeModel