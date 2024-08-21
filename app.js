const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

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
    console.log("Connected to Mongo! Database name: ", x.connections[0].name)
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
  const {
    title,
    instructions,
    level,
    ingridients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  RecipeModel.create({
    title,
    instructions,
    level,
    ingridients,
    image,
    duration,
    isArchived,
    created,
  })
    .then((createdRecipe) => {
      console.log("Successfully created a recipe");
      res.status(200).json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find({})
    .then((recipes) => {
      console.log("Successfully retrieved all recipes");
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("recipes/:id", (req, res) => {
  const { id } = req.params;
  RecipeModel.findById(id)
    .then((recipe) => {
      console.log("Successfully retrieved a recipe");
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("recipes/:id", (req, res) => {
  const { id } = req.params;
  RecipeModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Successfully edited a recipe");
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("recipe/:id", (req, res) => {
  const { id } = req.params;
  RecipeModel.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      console.log("Successfully deleted recipe");
      res.status(204).json(deletedRecipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
