const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    recipes: {
        type: [Schema.Types.ObjectId],
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User