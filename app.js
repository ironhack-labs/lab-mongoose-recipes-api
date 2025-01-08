const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-rec:";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((error) => console.error("Error connecting to mongo", error));

const Recipe = require("./models/Recipe.model.js");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
        res.status(201).json(createdRecipe)
    })
    .catch((error) => {
        res.status(500).json({ message: `Error durante la creación de una nueva receta, error: ${error}`})
    })

});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
        const Recipes = await Recipe.find()
        res.status(200).json(Recipes)
    } catch (error) {
        res.status(500).json({ message: `Error al devolver la información de las recetas, error: ${error}`})
    }
})

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
