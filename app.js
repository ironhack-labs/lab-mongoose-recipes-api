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
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/api/recipes", (req, res) => {
  const { title, level, ingredients, image, duration, isArchid } = req.body;

  Recipe.create({
    title,
    level,
    ingredients,
    image,
    duration,
    isArchid,
  })
    .then((newRecipe) => res.status(201).json(newRecipe))
    .catch((err) =>
      res.status(500).json({ messsage: "Error creating a new recipe", err })
    );
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/api/recipes/", (req, res) => {
  Recipe.find()
    .then((allRecipes) => res.status(200).json(allRecipes))
    .catch((err) =>
      res.status(500).json({ messsage: "Error getting all recipes", err })
    );
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/api/recipes/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;

  Recipe.findById(recipe_id)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/api/recipes/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;
  const { title, level, ingredients, image, duration, isArchived } = req.body;
  Recipe.findByIdAndUpdate(recipe_id, {
    title,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  })
    .then((updatedRecipe) => res.status(204).json(updatedRecipe))
    .catch((err) =>
      res.status(500).json({ messsage: "Error getting a single recipe", err })
    );
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/api/recipes/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;

  Recipe.findByIdAndDelete(recipe_id)
    .then(() => res.sendStatus(204))
    .catch((err) => res.json({ code: 500, errorDetails: err }));
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
