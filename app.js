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
    console.log(`connected to mongo database ${x.connections[0].name}`)
  )
  .catch((err) => {
    console.log(err);
  });

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
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

  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  })
    .then((recipe) => {
      res.status(201).json(recipe);
      console.log("recipe created: ", recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
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
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
