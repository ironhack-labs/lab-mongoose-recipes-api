const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

// Iteration 3 - Create a Recipe route
app.post("/recipes", (req, res) => {
  const { title, instructions, level, ingredients, image, duration, isArchived } = req.body;

  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while creating a new recipe" });
    });
});

// Iteration 4 - Get All Recipes
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting all recipes" });
    });
});

// Iteration 5 - Get a Single Recipe
app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting a single recipe" });
    });
});

// Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const { title, instructions, level, ingredients, image, duration, isArchived } = req.body;

  Recipe.findByIdAndUpdate(
    id,
    {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
    },
    { new: true }
  )
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while updating the recipe" });
    });
});

// Iteration 7 - Delete a Single Recipe
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(204).send(); // 204 No Content
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while deleting the recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;