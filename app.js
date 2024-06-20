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

// app.js
//...
const mongoose = require("mongoose");

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
app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = await RecipeModel(req.body);
    console.log("Recipe created, noice!", newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log("Error GETting", error);
    res.status(500).json({ errorMessage: error });
  }
}),
  //  Iteration 4 - Get All Recipes
  //  GET  /recipes route
  app.get("/recipes", async (req, res) => {
    try {
      const allRecipes = await RecipeModel.find();
      console.log("Here are all the recipes!", allRecipes);
      res.status(200).json(allRecipes);
    } catch (error) {
      console.log("Error GETing recipes!", error);
    }
  });

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log("Error PUTting", error);
  }
});

app.get("/recipes/:id", async (req, res) => {
  try {
    const oneRecipe = await RecipeModel.findById(req.params.id);
    console.log("Heres the one recipe", oneRecipe);
    res.status(200).json(oneRecipe);
  } catch (error) {
    console.log("Error GETing recipe :id!", error);
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const deleteRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
    console.log("Heres the one recipe", deleteRecipe);
    res.status(204).json(deleteRecipe);
  } catch (error) {
    console.log("Error DELETing recipe :id!", error);
  }
});

// Start the server
app.listen(5005, () => console.log("My first app listening on port 5005!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
