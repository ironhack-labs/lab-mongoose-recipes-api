const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose"); // Import mongoose
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

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
app.post("/recipes", async (req, res) => {
  try {
    const {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    } = req.body;
    const newRecipe = await Recipe.create({
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    });
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create recipe", error: error.message });
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route

// Iteration 4 - Get All Recipes
// GET /recipes route - Retrieve all recipe documents
app.get("/recipes", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find();

    // Send a success response with the retrieved recipes
    res.status(200).json({ recipes });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to retrieve recipes", error: error.message });
  }
});

// Iteration 5 - Get a Single Recipe
// GET /recipes/:id route - Retrieve a specified recipe document by its _id
app.get("/recipes/:id", async (req, res) => {
  try {
    // Extract recipe id from request parameters
    const { id } = req.params;

    // Fetch the recipe document from the database by its _id
    const recipe = await Recipe.findById(id);

    // If recipe with the specified id is not found, return a 404 response
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Send a success response with the retrieved recipe
    res.status(200).json({ recipe });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to retrieve recipe", error: error.message });
  }
});

// Iteration 6 - Update a Single Recipe
// PUT /recipes/:id route - Update a specified recipe document in the database
app.put("/recipes/:id", async (req, res) => {
  try {
    // Extract recipe id from request parameters
    const { id } = req.params;

    // Extract updated recipe data from request body
    const updatedRecipeData = req.body;

    // Find the recipe document by its _id and update it with the new data
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      updatedRecipeData,
      { new: true }
    );

    // If recipe with the specified id is not found, return a 404 response
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Send a success response with the updated recipe
    res
      .status(200)
      .json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to update recipe", error: error.message });
  }
});

// Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:id route - Delete a specified recipe document by its _id from the database
app.delete("/recipes/:id", async (req, res) => {
  try {
    // Extract recipe id from request parameters
    const { id } = req.params;

    // Find the recipe document by its _id and delete it
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    // If recipe with the specified id is not found, return a 404 response
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Send a success response with a message indicating the recipe has been deleted
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to delete recipe", error: error.message });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
