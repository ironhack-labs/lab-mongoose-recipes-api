const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

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
app.post("/recipes", async (request, response) => {
  try {
    const createdRecipe = await Recipe.create({ ...request.body });
    response.status(201).json(createdRecipe);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (request, response) => {
  try {
    const recipes = await Recipe.find({});
    response.status(200).json(recipes);
  } catch (error) {
    response.status(500).json({ message: "Something went wrong" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const recipe = await Recipe.findById({ _id: id });
    response.status(200).json(recipe);
  } catch (error) {
    response.status(500).json({ message: "Something went wrong" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      { _id: id },
      request.body,
      { new: true }
    );
    response.status(200).json({ updatedRecipe });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const recipe = await Recipe.findByIdAndDelete({ _id: id });
    response.json({ message: "Record deleted successfully" });
  } catch (error) {
    response.json(error);
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
