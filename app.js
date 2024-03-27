const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const app = express();
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...
const cheeseOnToast = {
  title: "cheese on Toast",
  instructions: "Burn toast, Melt cheese",
  level: "Easy Peasy",
  ingredients: ["cheese", "bread"],
  image:
    "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-05-Cheese-on-Toast%2FIMG_6699",
  duration: 5,
};

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
  Recipe.create(cheeseOnToast)
    .then((newRecipe) => {
      console.log("new recipe added", newRecipe);
      res.status(201).json({ newRecipe, message: "recipe was created" });
    })
    .catch((error) =>
      res.status(500).json({ message: "error creating recipe", error })
    );
});

// app.post("/recipes", (req, res) => {
//   Recipe.create({
//     title: req.body.title,
//     instructions: req.body.instructions,
//     level: req.body.level,
//     ingredients: req.body.ingredients,
//     image: req.body.image,
//     duration: req.body.duration,
//     isArchived: req.body.isArchived,
//     created: req.body.created,
//   })
//     .then((newRecipe) => {
//       console.log("new recipe added", newRecipe);
//       res.status(201).json({ newRecipe, message: "recipe was created" });
//     })
//     .catch((error) =>
//       res.status(500).json({ message: "error creating recipe", error })
//     );
// });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      console.log("recipes received ->", recipes);
      res.status(200).json(recipes);
    })
    .catch((error) => {
      console.log("Error fetching recipes", error);
      res.status(500).json({ error: "failed to find recipes" });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      console.log("recipe received ->", recipe);
      res.status(200).json(recipe);
    })
    .catch((error) => {
      console.log("Error fetching recipe", error);
      res.status(500).json({ error: "failed to find recipe" });
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;

  Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Updated recipe ->", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log("Error updating recipe", error);
      res.status(500).json({ error: "failed to update recipe" });
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("deleted by id", req.params.id);
      res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "failed to delete recipe" });
    });
});
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
