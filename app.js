const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const RecipeModel = require('./models/Recipe.model');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
	.connect(MONGODB_URI)
	.then((x) =>
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
	)
	.catch((err) => console.error('Error connecting to mongo', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
	res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
	try {
		const newRecipe = await RecipeModel.create(req.body);
		res.status(201).json(newRecipe);
	} catch (error) {
		console.log('Error creating new recipe', error);
		res.status(500).json({ message: 'Error creating new recipe', error });
	}
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
	try {
		const getAllRecipes = await RecipeModel.find();
		res.status(200).json(getAllRecipes);
	} catch (error) {
		console.log('Error getting recipes', error);
		res.status(500).json({ message: 'Error getting recipes', error });
	}
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const getOneRecipe = await RecipeModel.findById(id);
		res.status(200).json(getOneRecipe);
	} catch (error) {
		console.log('error getting recipe', error);
		res.status(500).json({ message: 'Error getting recipe', error });
	}
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const updatedRecipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedRecipe);
	} catch (error) {
		console.log('error updating recipe', error);
		res.status(500);
	}
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
		res.status(204).json(deletedRecipe);
	} catch (error) {
		console.log('error deleting recipe', error);
		res.status(500).json({ message: 'Error deleting recipe', error });
	}
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
