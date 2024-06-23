const {Scheme, model} = require('mongoose')

const recipleSchema = new Scheme({
    title: {
        type: String,
        required: true,,
        unique: true
    },
    instructions: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: [String],
    image: {
        type: String, 
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0,
        .
        isArchived: {
        type: Boolean,
        default: false,
        },
        created: H
        type: Date,
        default:
    
    
    // enum gives specific choices to user
})
// continue above!

const RecipeModel = model ('recipe', recipeSchema);
module.exports = RecipeModel