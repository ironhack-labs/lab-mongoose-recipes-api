const express = require('express')
const logger = require('morgan')

const app = express()
// MIDDLEWARE
app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())

// Iteration 1 - Connect to MongoDB
const mongoose = require('mongoose')
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev'
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error('Error connecting to mongo', err))
// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>')
})

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
const Recipes = require('./models/Recipe.model')
app.post('/recipes', (req, res) => {
  Recipes.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((recetacreada) => {
      res.status(201).json(recetacreada)
    })
    .catch((error) => {
      res.status(500).json({ message: 'error al crear una nueva receta' })
    })
})

//  Iteration 4 - Get All Recipes
app.get('/recipes', async (req, res) => {
  try {
    const response = await Recipes.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'error al al coger las recetas' })
  }
})
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
  try {
    const response = await Recipes.findById(req.params.id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'error al al coger las recetas' })
  }
})
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
  try {
    const response = await Recipes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'error al al coger las recetas' })
  }
})
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
  try {
    const response = await Recipes.findByIdAndDelete(req.params.id)
    res.status(204).json({ message: 'receta borrada' })
  } catch (error) {
    res.status(500).json({ message: 'error al al coger las recetas' })
  }
})
// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'))

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
