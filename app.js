const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model.js");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://didonatodani:SSEcTftuZU7OTVEi@cluster0.p4jp5.mongodb.net/lab_mongo_db";

mongoose
  .connect(MONGO_URI)
  .then((res) =>
    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    )
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
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;

  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.error("There's been an error creating the recipe", err);
      res.status(500).json({ error: "failed to create recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "there's been an error requesting info" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      console.log("retrieved recipe", recipe);
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "there's been an error finding one recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({
        message: "there's been an error finding and updating a recipe",
      });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndDelete(recipeId)
    .then((recipe) => {
        res.status(200).json(recipe);
    })
    .catch((err) => {
        res.status(500).json({
          message: "there's been an error deleting a recipe",
        });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;