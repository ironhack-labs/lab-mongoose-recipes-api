require("dotenv").config();
require("./config/dbConnect.js");
const express = require("express");
const logger = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();

const Receipe = require("./models/Recipe.model.js");
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
app.post("/receipes", async (req, res, next) => {
  const { title, instructions, level, ingredients, duration, created } =
    req.body;
  const receipeToCreate = {
    title,
    instructions,
    level,
    ingredients,
    duration,
  };
  const createdReceipe = await Receipe.create(receipeToCreate);

  res.status(201).json(createdReceipe);
  try {
  } catch (error) {
    console.log(error);
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/receipes", async (req, res) => {
  try {
    const allReceipes = await Receipe.find({});
    res.status(200).json(allReceipes);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/receipes/:id", async (req, res) => {
  const { id } = req.params;
  const eachReceipe = await Receipe.findOne({ _id: id });
  res.json(eachReceipe);
  try {
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/receipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, instructions, level, duration } = req.body;
    const receipeToUpdate = { title, instructions, level, duration };

    const update = await Receipe.findOneAndUpdate(
      { _id: id },
      receipeToUpdate,
      { new: true }
    );
    res.status(202).json(update);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/receipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Receipe.findOneAndDelete({ _id: id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
// Start the server
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
