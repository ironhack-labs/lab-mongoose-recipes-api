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
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("./recipe", (req, res) => {
  const {
    title,
    instruction,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;

  RecipeModel.create({
    title,
    instruction,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  })
    .then((recipe) => {
      console.log("Recipe is created", recipe);
      res.status(201).json(recipe);
    })
    .catch((err) => {
      console.log("Error creating a recipe", err);
      res.status(500).json(err);
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  RecipeModel.find({})
    .then((recipes) => {
      res.status(201).json(recipes);
    })
    .catch((err) => {
      console.log("Error getting all recipe:", err);
      res.status(500).json(err);
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("./recipe", (req, res) => {
  const { id } = req.params;
  RecipeModel.find(id)
    .then((recipes) => {
      res.status(201).json(recipes);
    })
    .catch((err) => {
      console.log("Error getting a single recipe:", err);
      res.status(500).json(err);
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    instruction,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  RecipeModel.findByIdAndUpdate(
    id,
    {
      title,
      instruction,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    },
    { new: true }
  )
    .then((recipes) => {
      res.status(201).json(recipes);
    })
    .catch((err) => {
      console.log("Error updating a recipe:", err);
      res.status(500).json(err);
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("./recipe/:id", (req, res) => {
  const { id } = req.params;

  RecipeModel.findByIdAndDelete(id)
    .then((recipes) => {
      res.status(201).json(recipes);
    })
    .catch((err) => {
      console.log("Error deleting a recipe:", err);
      res.status(500).json(err);
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
