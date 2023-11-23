// Your code here ...

const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Model = mongoose.model;
//create a schema
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    created: {type: Date, default: Date.now()}
})
//create a model
const User = Model("User", userSchema)
module.exports = User