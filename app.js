const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const { restart } = require("nodemon");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) => {
    console.log(`Connected to Mongo! DB name: "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log("Error connecting to mongo", error);
  });

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res, next) => {
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
  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  });
  try {
    res.status(201).json("Documento creado");
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res, next) => {
  try {
    const response = await Recipe.find(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", async (req, res, next) => {
  console.log(req.params);
  try {
    const response = await Recipe.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res, next) => {
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
  try {
    const response = await Recipe.findByIdAndUpdate(
      req.params.id,
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
      { new: true })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", async (req, res, next) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.status(204).json({message: "Receta Borrada"})
    } catch (error) {
        res.status(500).json({message: "Error"})
    }
})

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
