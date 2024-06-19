const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// Iteration 2 - Require Model
const RecipeModel = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const recipe = await RecipeModel.create(req.body);
    console.log(recipe);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "error creating a recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    console.log(recipes);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "error getting all recipes" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "error getting a recipe by id" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "error updating a recipe by id" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await PetModel.findByIdAndDelete(req.params.id);
    console.log(recipe);
    res.status(204).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "error deleting a recipe by id" });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
