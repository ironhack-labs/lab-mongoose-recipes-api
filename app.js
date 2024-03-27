const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const receipeModule = require("./models/Recipe.model");

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

app.post("/recipes", (req, res) => {
  receipeModule
    .create(req.body)
    .then((createdReceipe) => {
      res
        .status(201)
        .json({ createdReceipe, message: "Receipe created successfully " });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "error when new Receipe created", error });
    });
  console.log(err);
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  receipeModule
    .find({})
    .then((allrecipes) => {
      res
        .status(200)
        .json({ allrecipes, message: "get all receipes successfully " });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "error while getting all receipes", error });
      console.log("error while getting all receipes");
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  const { id } = req.params;
  receipeModule
    .findById(id)
    .then((foundedReceipe) => {
      res
        .status(200)
        .json({ foundedReceipe, message: "get receipe by id successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "error while get receipe by id", error });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id ", (req, res) => {
  const { id } = req.params;
  receipeModule
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedReceipe) => {
      res
        .status(200)
        .json({ updatedReceipe, message: "receipe updated successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "error while updateding receipe ", error });
      console.log("error while updateding receipe ");
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  const { id } = req.params;

  receipeModule
    .findOneAndDelete(id)
    .then((deletedReceipe) => {
      res.status(200).json({ message: "receipe deleted success" });
      console.log(deletedReceipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "error when receipe deleted " });
      console.log("error when receipe deleted ");
    });
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
