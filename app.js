const express = require("express");
const logger = require("morgan");
const RecipeModel = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`))
  .catch((err) => console.log("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await RecipeModel.create(req.body);
    console.log("Created recipe:", newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create recipe." });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    console.log("Found recipes:", recipes);
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to load recipes." });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  RecipeModel.findById(id)
    .then((x) => res.status(200).json(x))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error while getting recipe." });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const id = req.params.id;
  RecipeModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((recipe) => {
      console.log("Updated recipe:", recipe);
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.log(err);
      res.send(500).json({ message: "Failed to update the recipe." });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await RecipeModel.findByIdAndDelete(id);
    console.log("Recipe deleted.");
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete the recipe." });
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;

// {
//   "title": "My new Recipe",
//   "instructions": "Its very easy. Just put everything in a pot and cook it for 10 minutes.",
//   "level": "Easy Peasy",
//   "ingredients": [
//     "water",
//     "salt",
//     "onion",
//     "carrot"
//   ],
//   "image": "https://images.media-allrecipes.com/images/75131.jpg",
//   "duration": 13
// }
