const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...

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
  res.status(200).send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    dishType: req.body.dishType,
    creator: req.body.creator,
    image: req.body.image,
    duration: req.body.duration,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

app.post("/users", (req, res) => {
  User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    image: req.body.image,
  })
    .then((createdUser) => {
      res.status(201).send(createdUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .populate("creator")
    .then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Recipe.findById(id)
    .populate("creator")
    .then((recipe) => {
      console.log(recipe);
      res.status(200).send(recipe);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate("favorites")
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Recipe.findByIdAndUpdate(id, data, { new: true })
    .then((updatedRecipe) => {
      res.status(200).send(updatedRecipe);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

app.put("/users/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { $push: { favorites: req.body.recipeId } },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
