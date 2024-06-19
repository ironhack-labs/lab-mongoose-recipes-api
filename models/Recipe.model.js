const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	instructions: {
		type: String,
		required: true,
	},
	level: {
		type: String,
		enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
	},
	ingredients: [String],
	image: {
		type: String,
		default: 'https://images.media-allrecipes.com/images/75131.jpg',
	},
	duration: {
		type: Number,
		min: 0,
	},
	isArchived: {
		type: Boolean,
		default: false,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
//creates the model and needs the name of the collection (Pets in MongoDB)
const RecipeModel = mongoose.model('Pets', recipeSchema);
module.exports = RecipeModel;
