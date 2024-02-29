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
const Recipe = require("./models/Recipe.model.js"); // Recipe schema
const User = require("./models/User.model.js"); // User schema
app.use(express.json());

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
    creator,
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
    creator: creator,
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
    .populate("creator")
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
    .populate("creator")
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
  Recipe.findByIdAndUpdate({ _id: id }, update, { new: true })
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
  Recipe.deleteOne({ _id: id })
    .then((result) => {
      res.status(204).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting" });
    });
});

// create new user
app.post("/users", (req, res, next) => {
  const newUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    image: req.body.image,
  };

  User.create(newUser)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

app.get("/users", (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/users/:id", (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update user
app.put("/users/:id", (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { favorites: "65df3fc819bc61894aacf414" } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
