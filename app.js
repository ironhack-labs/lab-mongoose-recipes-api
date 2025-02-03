const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const RecipeModel = require("./models/Recipe.model");

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
app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await RecipeModel.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    res.status(201).json(createdRecipe);
  } catch (err) {
    console.error("Error while creating a new recipe", err);
    res.status(500).json({ message: "Error while creating a new recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
    console.log(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error while updating a recipe by id", err);
    res.status(500).json({ message: "Error while updating a recipe by id" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe successfully deleted" });
  } catch (error) {
    console.error("Error while deleting a recipe by id", err);
    res.status(500).json({ message: "Error while deleting a recipe by id" });
  }
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
