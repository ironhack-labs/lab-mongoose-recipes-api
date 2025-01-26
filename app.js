const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI; 

const mongoose = require("mongoose");

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

const Recipe = require("./models/Recipe.model"); 

// ...

app.use(cors("*"));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res)=>{
    Recipe.create({
        instructions: req.body.instructions,
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((createdRecipe)=>{
        res.status(201).json(createdRecipe);
    }).catch((err) => {
        res.status(500).json(err);
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
    Recipe.find()
    .then(foundRecipes => res.status(200).json(foundRecipes))
    .catch(error => res.status(500).json(err))
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
