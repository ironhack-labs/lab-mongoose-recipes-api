const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const recipeModel = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect("mongodb://localhost:27017/express-mongoose-recipes-dev")
  .then((res) => {
    console.log(`connected to ${res.connections[0].name}`);
  })
  .catch((er) => {
    console.log(`error connecting to DB`, er);
  });
// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.json({ message: "LAB | Express Mongoose Recipes" });
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const recipe = req.body;
    const newRecipe = new recipeModel(recipe);
    await newRecipe.save();
    res.json({ message: "new recipe created" });
  } catch (er) {
    console.error(er);
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await recipeModel.find({});
    res.json(allRecipes);
  } catch (er) {
    console.log(er);
  }
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await recipeModel.findById(recipeId);
    if (recipe) {
      res.json(recipe);
    } else {
      res.json({ message: "recipe not found" });
    }
  } catch (er) {
    console.log(er);
  }
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = req.body;
    const updatedRecipe = await recipeModel.findByIdAndUpdate(recipeId, recipe);
    if (updatedRecipe) {
      res.json({ message: "recipe updated" });
    } else {
      res.json({ message: "recipe not found" });
    }
    await updatedRecipe.save();
  } catch (er) {
    console.error(er);
  }
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await recipeModel.findByIdAndDelete(recipeId);
    if (recipe) {
      res.json({ message: "recipe deleted" });
    } else {
      res.json({ message: "recipe not found" });
    }
  } catch (er) {
    console.log(er);
  }
});
// Start the server
app.listen(3000, () => {
  console.log("connected to port 3000");
});

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
