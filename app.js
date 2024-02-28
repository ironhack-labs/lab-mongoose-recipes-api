const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect("mongodb://localhost:27017/express-mongoose-recipes-dev")
  .then((res) => {
    console.log(`connected to ${res.connections[0].name}`);
  })
  .catch((er) => {
    console.log(`error connecting to DB`, er);
  });
// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.json({ message: "LAB | Express Mongoose Recipes" });
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => {
  console.log("connected to port 3000");
});

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
