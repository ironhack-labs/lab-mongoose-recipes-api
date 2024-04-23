const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

//Models
const Recipe = require("./views/Recipe.model");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((error) => console.error("Error connectin to mongo", error));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

app.post("/recipes", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.log(error, "on creating a new recipe");
    res.status(500).json({ message: "Error while creating a new recipe" });
  }
});

app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting recipes" });
    });
});

app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while getting recipe" });
    });
});

app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  Recipe.findByIdAndUpdate(id, body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
      console.log(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error while updating single recipe" });
    });
});

app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: "Error on deleting a single recipe" });
    });
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
