const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = "./modules/Recipe.model";

const app = express();

//mongoose
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log("Connected to Mongo! Database name: ", x.connections[0].name)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      console.log("Recipe created ->", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Failed to create recipe." });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log(recipes);
      res.status(400).json(recipes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error while getting recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      console.log(recipe);
      res.status(400).json(recipe);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error while getting recipe by ID" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Updated recipe: ", updatedRecipe);
      res.status(204).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "failed to update recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => res.status(204))
    .catch((err) =>
      res.status(500).json({ message: "Deleting recipe failed" })
    );
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
