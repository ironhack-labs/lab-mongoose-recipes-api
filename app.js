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
const Recipe = require("./models/User.model.js"); // Recipe schema

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
app.post("/recipes", (req, res, next) => {
  // console.log(req.body)
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
  const newRecipe = {
    title: title,
    instructions: instructions,
    level: level,
    ingredients: ingredients,
    image: image,
    duration: duration,
    isArchived: isArchived,
    created: created,
  };

  Recipe.create(newRecipe)
    .then((recipe) => res.status(201).json(recipe))
    .catch((err) => res.status(500).send(err));
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
  Recipe.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
  console.log(req.params);

  const { id } = req.params;

  Recipe.findOne({ _id: id })
    .then((details) => {
      res.status(200).json(details);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error getting details" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
  const { id } = req.params;

  const update = {
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  };
  Recipe.findByIdAndUpdate({ _id: id }, update, {new: true})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {
    const { id } = req.params;
    Recipe.deleteOne({_id: id})
        .then((result) => {
            res.status(204).json(result)
        }).catch((err) => {
            res.status(500).json({ message: "Error deleting" });
        });
})




// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
