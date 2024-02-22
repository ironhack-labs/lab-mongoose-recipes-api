// Your code here ...
const {model, Schema} = require("mongoose");

const recipeSchema = new Schema ((
    title: {type: String, required: true, unique: true},
instructions: {type: String, required: true},
level : {type: String, enum: ["Easy Peasy", "Amateur"]}
))


const Recipe = model("Recipe", recipechema)

export