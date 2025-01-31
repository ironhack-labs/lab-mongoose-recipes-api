//IMPORTS

const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const app = express();
const cors = require("cors");

//IMPORT MODELS
const Recipe = require("./models/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(cors("*"));

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
// app.js
//...

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
  })

    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.error("RECIPE NOT FOUND", error);
      res.status(500).json({ error: "No recipe found" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("RECIPES NOT FOUND", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findById(recipeId)
    .then((results) => res.json(results))
    .catch((error) => {
      console.error("RECIPE NOT FOUND", error);
      res.status(404).json({ error: "No recipe found" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.recipeId,
    {
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
    },
    { new: true }
  )
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res) => {
  Recipe.findByIdAndDelete(req.params.recipeId)

    .then((recipe) => {
      res.json({ recipe });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
