const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

const Recipe = require("./models/Recipe.model");

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/", (req, res) => {
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

  Recipe.create(
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created
  )
    .then((response) => {
      console.log("Recipe created ->", response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error("Error while creating recipe ->", error);
      res.status(500).json({ error: "Failed to create the recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/", (req, res) => {
  Recipe.find({})
    .then((recipe) => res.send(recipe))
    .then((response) => {
      console.log("Success ->", response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error("Error ->", error);
      res.status(500).json({ error: "Failed to fetch the info" });
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipe) => res.send(recipe))
    .then((response) => {
      console.log("Recipe found ->", response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error("Error ->", error);
      res.status(500).json({ error: "Failed to fetch the recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/:id", (req, res) => {
  const { id } = req.params;
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
  Recipe.findByIdAndUpdate(
    id,
    {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    },
    { new: true }
  )
    .then((response) => {
      console.log("Recipe updated ->", response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error while updating recipe ->", error);
      res.status(500).send({ error: "Failed to update the recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
