const express = require("express");
const logger = require("morgan");
const router = require('express').Router();

// Import mongoose
const mongoose = require("mongoose");

// Import models
const recipe = require("./models/Recipe.model");

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
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  
router.get('/recipes', async (req, res) => {
    /* res.send("<h1>LAB | Express Mongoose Recipes</h1>"); */
    try{
        const allRecipes = await Recipe.find();
        res.status(200).json(allRecipes);
    }
    catch (error) {
        console.log(error);
    }
});

/* const recipeRoute = require('./routes/recipe.route');
app.use('/recipes', recipeRoute); */



//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

router.post("/recipes", async (req, rest) => {
    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;
    const newRecipe =  await Recipe.create({title, instructions, level, ingredients, image, duration, isArchived, created})
    .then((createdRecipe) => {
        res.status(201).json(createdRecipe);
    })
    .catch((error) => {
        rest.status(500).json({mesage: "error while creating this recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
router.get("/recipes", async (req, res) => {
    try{
        const allRecipes = await Recipe.find();
    res.status(200).json(allRecipes);
    }
    catch (error) {
        console.log(error);
    }
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
router.get("/recipes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
    }
});



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
