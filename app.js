const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

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
app.post('/recipes', (req, res) => {
    Recipe
        .create(req.body)
        .then((createRecipe) => {
            console.log("Recipe creat");
            res.status(201).json(createRecipe);
        })
        .catch((error) => {
            console.log("Error while creating the recipes", err.message);
            res.status(500).json({ error: "Internal Server Error, not create recipe" });
        });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe
        .find({})
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            console.log("Error while find the recipes", err.message);
            res.status(500).json({ error: "Failed to retrieve recipes" });
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    Recipe
        .findById(id)
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            console.log("Error while creating the recipes by id", err.message);
            res.status(500).json({ error: "Failed to retrieve recipes id" });
        });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    const recipesId = req.params.id;
    Recipe
        .findByIdAndUpdate(recipesId, req.body, { new: true })
        .then((updateRecipe) => {
            console.log("Update Recipe");
            res.status(200).json(updateRecipe);
        })
        .catch((err) => {
            console.log("Error while updateting the recipes", err.message);
            res.status(500).json({ message: "Error while creating the recipes" });
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res) => {
    const recipesId = req.params.id;
    Recipe
        .findByIdAndDelete(recipesId)
        .then(() => {
            res.status(200).send("Recipe deleted!");
        })
        .catch((error) => {
            console.log("Error deleting a recipe", err.message);
            res.status(500).json({ error: "Failed to retrieve recipes id" });
        });
});

/* USer */

app.post('/users', (req, res) => {
    User
        .create(req.body)
        .then((createUser) => {
            console.log("Users creat");
            res.status(201).json(createUser);
        })
        .catch((error) => {
            console.log("Error while creating the users", err.message);
            res.status(500).json({ error: "Internal Server Error, not create users" });
        });
});

app.get('/users', (req, res) => {
    User
        .find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.log("Error while find the users", err.message);
            res.status(500).json({ error: "Failed to retrieve users" });
        });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
