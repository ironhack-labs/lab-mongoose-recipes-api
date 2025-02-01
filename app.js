const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("./models/Recipe.model");

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION 
mongoose
  .connect(MONGODB_URI)
  .then((response) => console.log(`Connected to Mongo! Database name: "${response.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    Recipe.create(req.body)
    .then(newRecipe => res.status(201).json(newRecipe))
    .catch(err => res.status(500).json({message: `Error occurred while creating recipe: ${err}`}))
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
    .then(allRecipes => res.status(200).json(allRecipes))
    .catch(err => res.status(500).json({message: `Error occurred while getting all the recipes: ${err}`}))
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id)
    .then(selectedRecipe => res.status(200).json(selectedRecipe))
    .catch(err => res.status(500).json({message: `Error occurred while getting the selected recipe: ${err}`}))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedRecipe => res.status(200).json(updatedRecipe))
    .catch(err => res.status(500).json({message: `Error occurred while updating the selected recipe: ${err}`}))
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(500).json({message: `Error occurred while deleting the selected recipe: ${err}`}))
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
