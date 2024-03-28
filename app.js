const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

const app = express();
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo, database name: "${x.connection[0].name}"`)
  )
  .catch((err) => console.log(err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  Recipe.create({})
    .then((createRecipe) => {
      res.status(201).json(createRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Woops, error" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app
  .get("/recipes", (req, res) => {
    Recipe.find().then((allRecipes) => {
      res.status(200).json(allRecipes);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    const foundRecipe = await RecipeModel.findById(recipeId);
    res.status(200).json(foundRecipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const updateRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateRecipe);
  } catch (err) {
    console.log(err);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(204).end();
    console.log(err);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
