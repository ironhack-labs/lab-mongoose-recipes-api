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
const MONGODB_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES FOR RECIPES
// ---------------------------------------------------------------
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  POST  /recipes route
app.post("/recipes", (req, res) => {
  const { title, instructions, level, ingredients, cuisine, dishType, image, duration, creator } =
    req.body;
  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
  })
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .populate("creator")
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .populate("creator")
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { title, instructions, level, ingredients, cuisine, dishType, image, duration, creator } =
    req.body;
  Recipe.findByIdAndUpdate(
    req.params.id,
    { title, instructions, level, ingredients, cuisine, dishType, image, duration, creator },
    { new: true }
  )
    .populate("creator")
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

// ROUTES FOR USERS
// ---------------------------------------------------------------
//POST Create a Single User
app.post("/users", (req, res) => {
  const { email, firstName, lastName, password, image, favorites } = req.body;
  User.create({
    email,
    firstName,
    lastName,
    password,
    image,
    favorites,
  })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// GET Retrieve a Single User
app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("favorites")
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

// GET Retrieve a All User
app.get("/users", (req, res) => {
  User.find()
    .populate("favorites")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

// PUT Update a Single User
app.put("/users/:id", (req, res) => {
  const { email, firstName, lastName, password, image, favoriteRecipeId } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { email, firstName, lastName, password, image, $push: { favorites: favoriteRecipeId } },
    { new: true }
  )
    .populate("favorites")
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred: " + error });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
