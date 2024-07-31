const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const recipes = require("./models/Recipe.model");
const Recipe = require("./models/Recipe.model");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-intro-dev")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));
// DATABASE CONNECTION

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
// ROUTES
//  GET  / route - This is just an example route
app.post("/recipies", (req, res) => {
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
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create the book" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve the recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve single recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipes) => {
      res.status(200).json(updatedRecipes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while updating a single recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while deleting a single recipe" });
    });
});

// Start the server
app.listen(5001, () => console.log("My first app listening on port 5001!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
