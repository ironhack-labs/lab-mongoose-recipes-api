const express = require("express");
const logger = require("morgan");

const app = express();
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
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
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isAchived: req.body.isAchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      console.log("Recipe created ->", createdRecipe);
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.log("Error while creating the recipe ->", error);
      res.status(500).json({ error: "Failed to create the recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log("Found recipes ->", recipes);
      res.status(200).json(recipes);
    })
    .catch((error) => {
      console.log("Error while finding recipes ->", error);
      res.status(500).json({ error: "Failed finding recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then((foundRecipe) => {
      console.log("Found recipe with id ->", foundRecipe);
      res.status(200).json(foundRecipe);
    })
    .catch((error) => {
      console.log("Error while finding recipe by id ->", error);
      res.status(500).json({ error: "Failed finding recipe by id" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Updated recipe ->", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log("Error while updating this recipe ->", error);
      res.status(500).json({ error: "Failed updating this recipe" });
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((deletedResult) => {
      console.log("Recipe deleted successfully !");
      res.status(204).send();
    })
    .catch((error) => {
      console.log("Error while deleting this recipe ->", error);
      res.status(500).json({ error: "Deleting recipe failed" });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
