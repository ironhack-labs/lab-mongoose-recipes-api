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
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req,res) => {
    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;

    const newRecipe = {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    }

    Recipe.create(newRecipe)
        .then( (createdRecipe) => {
            console.log(createdRecipe)
            res.status(201).json(createdRecipe)
        })
        .catch ( (error) => {
            console.log("Error creating a recipe in the DB...", error);
            res.status(500).json({message: "Error creating a new recipe"});
        });
});



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
        .then( (recipesArr) => {
            res.status(200).json(recipesArr)
        })
        .catch((error) => {
            res.status(500).json({message: "Error getting the list of recipes"});
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req,res) => {

    const {recipeId} = req.params;

    Recipe.findById(recipeId)
    .then ((recipeDetails) => {
        res.status(200).json(recipeDetails)
    })
    .catch((error) => {
        console.log("Error geting recipe details", error);
        res.status(500).json({message: "Error getting recipe details"});
    });
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res) => {
    const {recipeId} = req.params;

    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;

    const updatedRecipe = {
        title, 
        instructions, 
        level, 
        ingredients, 
        image, 
        duration, 
        isArchived, 
        created
    }

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, {new:true})
        .then((updatedRecipe) => {
            res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
            res.status(500).json({message: "Error updating recipe"})
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("recipes/:recipeId", (req, res) => {
    const {recipeId} = req.params;

    Recipe.findByIdAndDelete(recipeId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            console.log("Error deleting the recipe", error);
            res.status(500).json({message:"Error deleting recipe"});
        });
});

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;