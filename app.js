const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

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
.then((x) => console.log(`connected to Mongo! database name: "${x.connections[0].name}"`))
.catch((err) => console.error("Error connecting to mongo", err))

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


const RecipeModel = require("./models/Recipe.model");
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes",(req,res) => {
    RecipeModel.create(req.body)
    .then((newRecipe) => {
        res.status(201).json({newRecipe, message: "Your recipe was created"})
    }).catch((err) => {
        res.status(500).json({message: "Error creating a new Recipe"})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    RecipeModel.find({})
      .then((recipes) => {
        console.log("recipes retrieved", recipes);
        res.status(200).json(recipes);
      })
      .catch((err) => {
        console.log("error while fetching recipes", err);
        res.status(500).json({ err: "failed to retrieve recipes" });
      });
  });

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    const { id } = req.params;
    RecipeModel.findById(id)
      .then((foundRecipe) => {
        res.status(200).json(foundRecipe);
        console.log("By the Id", foundRecipe);
      })
      .catch((err) => {
        res.status(500).json({ message: "error getting recipe by id", err });
        console.log(err);
      });
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    const { id } = req.params;
    RecipeModel.findByIdAndUpdate(id, req.body, { new: true })
      .then((updateRecipe) => {
        res.status(200).json(updateRecipe);
        console.log(updateRecipe);
      })
      .catch((err) => {
        res.status(500).json({ message: "error updating recipe", err });
        console.log("error updating recipe", err);
      });
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
    const { id } = req.params;
    RecipeModel.findByIdAndDelete(id)
      .then((recipeDelete) => {
        res.status(204).send();
        console.log(recipeDelete);
      })
      .catch((err) => {
        res.status(500).json({ message: "error deleting student", err });
        console.log("error deleting student", err);
      });
  });

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
