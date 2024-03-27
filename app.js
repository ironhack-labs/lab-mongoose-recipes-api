const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
.then(()=>{
    console.log("database connected")
})
.catch((err)=> console.log("error", err))




//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    console.log("here is the req body", req.body);
    RecipeModel.create(req.body)
      .then((newRecipe) => {
        console.log("new recipe added", newRecipe);
        res.status(201).json({ newRecipe, message: "Your recipe was created!" });
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({message: "error happened during adding a recipe"})
    });
  });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res)=>{
    RecipeModel.find()
    .then((allRecipes)=>{
        res.status(201).json({allRecipes})
    })
    .catch((err)=>{
        res.status(500).json({message: "error happened during calling all recipes"})
    })

})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res)=>{
  RecipeModel.findById(req.params.id)
  .then((oneRecipe)=>{
      res.status(201).json({oneRecipe})
  })
  .catch((err)=>{
      res.status(500).json({message: "error happened during getting a recipe"})
  })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res)=>{
  RecipeModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((oneRecipe)=>{
      res.status(200).json({oneRecipe})
  })
  .catch((err)=>{
      res.status(500).json({message: "error happened during updating a recipe"})
  })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res)=>{
  RecipeModel.findByIdAndDelete(req.params.id)
  .then((oneRecipe)=>{
      res.status(204).json({oneRecipe})
  })
  .catch((err)=>{
      res.status(500).json({message: "error happened during deleting a recipe"})
  })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
