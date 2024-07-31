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
app.post("/recipes", (req, res) => {
  try {
    const newRecipe = Recipe.create({ ...req.body });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while fetching recipes.");
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;

  Recipe.findById(id)
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((error) => {
      console.error(error);
      res.status(404).send("Recipe not found.");
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const updatedRecipe = { ...req.body };
  Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true })
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((error) => {
      console.error(error);
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json({ message: "oki" });
    })
    .catch((error) => {
      console.error(error);
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
