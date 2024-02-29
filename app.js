const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
// GET / route - This is just an example route
app.get('/', (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// Iteration 3 - Create a Recipe route
// POST /recipes route
app.post('/recipes', (req, res) => {
  Recipe.create({
    title: req.body.title,
    level: req.body.level,
    ingredients: req.body.ingredients, // Fixed typo 'ingredionts' to 'ingredients'
    cuisine: req.body.cuisine,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while creating a new recipe" });
    });
});

// Iteration 4 - Get All Recipes
// GET /recipes route
app.get('/recipes', (req, res) => { // Corrected route path from '/recipe' to '/recipes'
  Recipe.find()
    .then((allRecipes) => res.status(200).json(allRecipes))
    .catch((error) => res.status(500).json({ message: "Error while getting all recipes" }));
});

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id route
app.get('/recipes/:id', (req, res) => { // Corrected route path from '/recipe/:id' to '/recipes/:id'
  Recipe.findById(req.params.id) // Corrected req.param.id to req.params.id
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => res.status(500).json({ message: "Error while getting single recipe" }));
});

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id route
app.put('/recipes/:id', (req, res) => { // Corrected route path from '/recipe/:id' to '/recipes/:id'
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Corrected req.param.id to req.params.id
    .then((updatedRecipe) => res.status(200).json(updatedRecipe))
    .catch((error) => res.status(500).json({ message: "Error while updating single recipe" }));
});

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id route
app.delete('/recipes/:id', (req, res) => { // Corrected route path from '/recipe/:id' to '/recipes/:id'
  Recipe.findByIdAndDelete(req.params.id) // Corrected req.param.id to req.params.id
    .then(() => res.status(200).send())
    .catch((error) => res.status(500).json({ message: "Error while deleting single recipe" }));
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

// ❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
