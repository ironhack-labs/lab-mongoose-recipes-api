const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')

const app = express()

// MIDDLEWARE
app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev'

let connection = async () => {
	try {
		let conn = mongoose.connect(MONGODB_URI)
		let respConnection = await conn
		// console.log('----------------', respConnection.connections[0].name)
	} catch (error) {
		console.log(error)
	}
}
connection()

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
	res.send('<h1>LAB | Express Mongoose Recipes</h1>')
})

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/recipes', async (req, res) => {
	try {
		let createdRecipe = await Recipe.create({
			title: req.body.title,
			instructions: req.body.instructions,
			level: req.body.level,
			ingredients: req.body.ingredients,
			image: req.body.image,
			duration: req.body.duration,
			isArchived: req.body.isArchived,
		})
		res.status(201)
		res.send(createdRecipe)
	} catch (error) {
		res.status(500)
		res.send(error)
	}
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', async (req, res) => {
	try {
		let recipesArray = await Recipe.find({})
		res.status(200).json(recipesArray)
	} catch (error) {
		res.status(500).json({ message: `Impossible to get all recipes!!` })
	}
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', async (req, res) => {
	const recipeId = req.params.id
	try {
		let simpleRecipe = await Recipe.findById(recipeId)

		res.status(200).json(simpleRecipe)
	} catch (error) {
		res.status(500).json({ message: `Impossible to get this recipe!` })
	}
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
	let recipeId = req.params.id

	try {
		let updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
			new: true,
		})
		res.status(200).json(updatedRecipe)
	} catch (error) {
		res.status(500).json({ message: `Impossible to edit a recipe!` })
	}
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
	try {
		let deleteRecipe = await Recipe.findByIdAndDelete(req.params.id)
		res.status(204)
	} catch (error) {
		res.status(500)
	}
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'))

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
