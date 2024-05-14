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
      console.log("Entry created ->", response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error("Error while creating entry ->", error);
      res.status(500).json({ error: "Failed to create the entry" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/", (req, res) => {
  Recipe.find({})
    .then((recipe) => res.send(recipe))
    .then((response) => {
      console.log("Entry created ->", response);
      res.status(201).json(response);
    })
    .catch((error) => {
      console.error("Error while creating entry ->", error);
      res.status(500).json({ error: "Failed to create the entry" });
    });
});

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
