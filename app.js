const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

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
app.post("/recipes", (req, res, next) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe)
    .then((recipeFromDb) => {
      res.status(201).json("Created");
    })
    .catch((err) => {
      res.status(500).json("Internal server error");
    });
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((err) => {
      res.status(500).json("Internal server error");
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipes", (req, res, next) => {
  const { recipeId } = req.params;
  Recipe.find(recipeId)
    .then((recipeFromDb) => {
      res.status(200).json("Succes");
    })
    .catch((err) => {
      res.status(500).json("Internal server error");
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  const newDetails = req.body;
  Recipe.findByIdAndUpdate(recipeId, newDetails)
    .then(() => {
      res.status(200).json("updated");
    })
    .catch((err) => {
      res.status(500).json("Internal server error");
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  Recipe.findByIdAndDelete(recipeId)
    .then(() => {
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(500).json("Internal server error");
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
