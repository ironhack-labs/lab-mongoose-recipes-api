const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");

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

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res) => {
  const {
    name,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArhived,
    date,
  } = req.body;

  const newRecipe = {
    name,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArhived,
    date,
  };

  try {
    const createdRecipe = await Recipe.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const {
    name,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArhived,
    date,
  } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArhived,
        date,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.status(204);
  } catch (error) {
    res.status(500).json(serverErrorMsg);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
