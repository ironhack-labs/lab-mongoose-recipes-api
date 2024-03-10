// IMPORT PACKAGES
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// IMPORT MODELS
const Recipe = require("./models/Recipe.model");

// DECLARE SERVER
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// CONNECTION LINK
const MONGODB_URI = process.env.MONGODB_URI;

// DATABASE CONNECTION
mongoose
.connect(MONGODB_URI)
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`))
.catch((err)=> console.error("Error connecto to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    console.log(req.body);
    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;

    Recipe.create({
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    })
    .then((createdRecipe)=>{
        console.log("Recipe created ->", createdRecipe);
        res.status(201).json(createdRecipe);
    })
    .catch((err)=>{
        //console.log("Error while creating the recipe ->", err);
        res.status(500).json({error: "Failed to create the recipe"});
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
    .then((allRecipes)=>{
        res.status(200).json(allRecipes)
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to retrieve recipes"});
    })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id)
    .then((addedRecipe)=>{
        res.status(200).json(addedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to retrieve recipe"});
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res)=>{
    const {id} = req.params;
    const {title, instructions, level, ingredients, image, duration} = req.body;

    Recipe.findByIdAndUpdate(id, {
        title,
        instructions, 
        level, 
        ingredients, 
        image, 
        duration
    })
    .then((updatedRecipe)=>{
        res.status(200).json(updatedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to update recipe"});
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res)=>{
    const {id} = req.params;

    Recipe.findByIdAndDelete(id)
    .then(deletedRecipe => {
        res.status(204).json(deletedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to delete recipe"})
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
