const express = require("express");
const logger = require("morgan");
const app = express();

const Recipe = require("./models/Recipe.model");

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
app.post("/recipes", async (req, res) => {
  try {
    const createRecipe = await Recipe.create(req.body);
    res.status(201).json(createRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res) => {
  try {
    const allrecipes = await Recipe.find();
    res.status(200).json(allrecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error while getting a single recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      message: "Recipe was updated successfully! -> ",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);

    res.json({ message: "Recipe was delete succesfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
