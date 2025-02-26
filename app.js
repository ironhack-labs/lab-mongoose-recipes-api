const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model.js");

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
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createRecipe) => {
      console.log("Recipe created: ", createRecipe);
      res.status(201).json(createRecipe);
    })
    .catch((error) => {
      console.log(error, "Error creating recipe");
      res.status(500).json({ error: "Failed to create recipe" + error });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log("Recipes found: ", recipes);
      res.status(200).json(recipes);
    })
    .catch((error) => {
      console.log(error, "Error finding recipes");
      res.status(500).json({ error: "Failed to find recipes" + error });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      console.log("Recipe found: ", recipe);
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.log(error, "Error finding recipe");
      res.status(500).json({ error: "Failed to find recipe" + error });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Recipe updated: ", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log(error, "Error updating recipe");
      res.status(500).json({ error: "Failed to update recipe" + error });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Recipe deleted");
      res.status(204).send();
    })
    .catch((error) => {
      console.log(error, "Error deleting recipe");
      res.status(500).json({ error: "Failed to delete recipe" + error });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
