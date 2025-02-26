const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/Recipe.model");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...

const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

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
app.post("/recipes", (req, res) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe)
    .then((recipeFromDB) => {
      res.status(201).json(recipeFromDB);
    })
    .catch((error) => {
      console.log("\n\n Error creating a new pizza in the DB...\n", error);
      res.status(500).json({ error: "Failed to create a new pizza" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(201).json(allRecipes);
    })
    .catch((error) => {
      console.log("\n\n Error getting a new pizza in the DB...\n", error);
      res.status(500).json({ error: "Failed to get a new pizza" });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipeFromDB) => {
      res.json(recipeFromDB);
    })
    .catch((error) => {
      console.log("Error getting recipe details from DB...");
      console.log(error);
      res.status(500).json({ error: "Failed to get recipe details" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
  const { id } = req.params;

  const newDetails = req.body;

  Pizza.findByIdAndUpdate(id, newDetails, { new: true })
    .then((pizzaFromDB) => {
      res.json(pizzaFromDB);
    })
    .catch((error) => {
      console.error("Error updating recipe...");
      console.error(error);
      res.status(500).json({ error: "Failed to update a recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.error("Error deleting recipe...");
      console.error(error);
      res.status(500).json({ error: "Failed to delete a recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
