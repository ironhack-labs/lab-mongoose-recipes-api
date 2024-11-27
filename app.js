const express = require("express");
const logger = require("morgan");

const app = express();

const Recipe = require("./models/Recipe.model");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const errorMiddleware = (req, res, error) => {
    console.log("THIS IS THE ERROR ", error);

    res.status(500).send("Internal Server Error!, check the console");
}

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
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

app.post("/recipes", async (req, res, next) => {
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

  const recipe = {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };

  try {
    const response = await Recipe.create(recipe); // Pass the recipe object
    res.status(201).json(response);
  } catch (error) {
    next(error)
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res, next) => {
  try {
    const response = await Recipe.find();
    res.json(response);
  } catch (error) {
    next(error)
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Recipe.findById(id);
    res.json(response);
  } catch (error) {
    next(error)
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", async (req, res, next) => {
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

  const updateRecipe = {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };
  try {
    const response = await Recipe.findByIdAndUpdate(id, updateRecipe, {
      new: true,
    });
    res.json(response);
  } catch (error) {
    next(error)
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await Recipe.findByIdAndDelete(id);
    res.json(response);
  } catch (error) {
    next(error)
  }
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
