// Your code here ...
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "A title is required."],
			unique: true,
		},
		instructions: {
			type: String,
			required: [true, "An instruction is required."],
		},
		level: {
			type: String,
			enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"],
		},
		ingredients: {
			type: [String],
		},
		image: {
			type: String,
			default: "https://images.media-allrecipes.com/images/75131.jpg",
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
			default: Date.now(),
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;