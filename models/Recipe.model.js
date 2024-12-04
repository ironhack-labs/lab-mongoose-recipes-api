const mongoose = require('mongoose')
const { Schema, model } = mongoose

function todayDate() {
	return Date.now()
}

const recipeSchema = new Schema({
	title: { type: String, require: true, unique: true },
	instructions: { type: String, require: true },
	level: { String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
	ingredients: [String],
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg',
	},
	duration: { type: Number, min: 0 },
	isArchived: { type: Boolean, default: false },
	created: { type: Date, default: todayDate },
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe
