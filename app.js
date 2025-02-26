const express = require("express");
const logger = require("morgan");

const app = express();

const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model")

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js

// ...
const MONGODB_URL = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URL)
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    Recipe
        .create(req.body)
        .then((createdRecipe) => {
            console.log("Recipe created ->", createdRecipe);
            res.status(201).json(createdRecipe);
        })
        .catch((error) => {
            console.error("Error while creating the recipe ->", error);
            res.status(500).json({ message: "Failed to create the recipe" });
        });
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find({})
        .then((recipes) => {
            console.log("Retrieved recipes ->", recipes);
            res.status(200).json(recipes);
        })
        .catch((error) => {
            console.error("Error while retrieving recipes ->", error);
            res.status(500).json({ message: "Failed to retrieve recipes" });
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            console.log("Retrieved recipe ->", recipe);
            res.status(200).json(recipe);
        })
        .catch((error) => {
            console.error("Error while retrieving recipe ->", error);
            res.status(500).json({ message: "Failed to retrieve a single recipe" });
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
            console.error("Error while updating the recipe ->", error.message);
            res.status(500).json({ message: "Failed to update the recipe", error });
        });
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log("Recipe deleted!");
            res.status(204).send();
        })
        .catch((error) => {
            console.log(req.params.id)
            console.error("Error while deleting the recipe ->", error.message);
            res.status(500).json({ message: "Deleting recipe failed", error })
        });
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
