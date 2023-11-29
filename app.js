const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    const newRecipe = {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created,
    };

    Recipe.create(newRecipe)
        .then((createdRecipe) => {
            res.status(201).json(createdRecipe);
        })
        .catch((error) => {
            console.log("Error creating new recipe: " + error);
            res.status(500).json("Error creating new recipe...");
        });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find()
        .then((recipesArray) => {
            res.status(200).json(recipesArray);
        })
        .catch((error) => {
            console.log("Error getting list of recipes..." + error);
            res.status(500).json("Error getting list of recipes...");
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId)
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            console.log("Error getting recipe..." + error);
            res.status(500).json("Error getting recipe...");
        });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
    const recipeId = req.params.id;

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    const updatedRecipe = {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created,
    };

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new: true })
        .then(() => {
            res.status(200).json("Recipe was updated!");
        })
        .catch((error) => {
            console.log("Error updating recipe..." + error);
            res.status(500).json("Error updating recipe...");
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {
    const recipeId = req.params.id;

    Recipe.findByIdAndDelete(recipeId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            console.log("Error deleting recipe..." + error);
            res.status(500).send();
        });
});

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route
app.post("/users", (req, res, next) => {
    const { name, age, image, recipes } = req.body;

    const newUser = {
        name,
        age,
        image,
        recipes,
    };

    User.create(newUser)
        .then((createdUser) => {
            res.status(201).json(createdUser);
        })
        .catch((error) => {
            console.log("Error creating new user: " + error);
            res.status(500).json("Error creating new user...");
        });
});

//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route
app.get("/users/:id", (req, res, next) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            console.log("Error getting user..." + error);
            res.status(500).json("Error getting user...");
        });
});

//  Bonus: Iteration 11 | Update a Single User
//  PUT /users/:id route
app.put("/users/:id", (req, res, next) => {
    const userId = req.params.id;
    const { name, age, image, recipes } = req.body;

    const updatedUser = {
        name,
        age,
        image,
        recipes,
    };

    User.findByIdAndUpdate(userId, updatedUser, { new: true })
        .then(() => {
            res.status(200).json("User was updated!");
        })
        .catch((error) => {
            console.log("Error updating user..." + error);
            res.status(500).json("Error updating user...");
        });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
