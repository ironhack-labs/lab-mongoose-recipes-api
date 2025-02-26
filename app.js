const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js")

const app = express();




// MIDDLEWARE

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe)
  .then ((RecipeFromDB) => {
    res.status(201).json(RecipeFromDB)
  })
  .catch((e) => {
    console.log("error has occured when creating pizza", e)
    res.status(500).json({error: "Failed to create a new recipe"})
  });
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
  Recipe.find()
  .then((recipesFromDB) => {
    res.status(200).json(recipesFromDB)
  .catch((e) => {
    res.status(500).json({message: "failed to retrieve recipes"})
  })
  })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req, res, next) => {
  const {recipeId} = req.params;
console.log(recipeId)
  Recipe.findById(recipeId)
  .then((recipe) => {
    res.status(200).json(recipe)
  })
  .catch((e) => {
    res.status(500).json({message: "something went wrong when retrieving specific recipe"})
  })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res, next) => {
  const {recipeId} = req.params;
  const updatedRecipe = req.body;
  
  Recipe.findByIdAndUpdate(recipeId, updatedRecipe, {new: true})
  .then((recipeFromDB) => {
    res.status(200).json(recipeFromDB)
  })
  .catch((e) => {
    res.status(500).json({message: "error when trying to update recipe"})
  })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", (req, res, next) => {
  const {recipeId} = req.params;

  Recipe.findByIdAndDelete(recipeId)
  .then((recipeFromDB) => {
    res.status(204).send()
  })
  .catch((e) => {
    res.status(500).json({message: "something went wrong when deleting item"})
  })
})


// Start the server
app.listen(3010, () => console.log('My first app listening on port 3010!'));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
