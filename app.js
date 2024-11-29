const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) => console.log("Connected to the server"))
  .catch((err) => console.error("Oops! Something went wrong", err));



// ROUTES
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route  
app.post('/Recipes', (req, res) => {
  console.log(req.body)

  Recipe.create(req.body)
  .then((createdRecipe)=>{
    res.json(createdRecipe)
  })

  .catch((err)=>{
    res.status(500).json(err)
  })
});


//  Iteration 4 - Get All Recipes
app.get('/recipes', (req, res) => {
  Recipe.find()
  .then((allRecipes) => {
    res.json(allRecipes)

  .catch((err)=>{
    res.status(500).json(err)
  })
  })
})


//  Iteration 5 - Get a Single Recipe
app.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
  .then((recipe) => {
    res.json(recipe)

  .catch((err)=>{
    res.status(500).json(err)
  })
  })
})


//  Iteration 6 - Update a Single Recipe
app.put('/recipes/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then((updatedRecipe) => {
    res.json(updatedRecipe)

  .catch((err)=>{
    res.status(500).json(err)
  })
  })
})


//  Iteration 7 - Delete a Single Recipe
app.delete('/recipes/:id', (req, res) => {
  Recipe.findByIdAnddelete(req.params.id, req.body)
  .then((deletedRecipe) => {
    res.json(deletedRecipe)

  .catch((err)=>{
    res.status(500).json(err)
  })
  })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
