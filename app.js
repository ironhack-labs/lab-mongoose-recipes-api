const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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

const Recipe = require("./models/Recipe.model")

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    Recipe.create({
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    }).then((createdRecipe) => {
        res.status(201).json(createdRecipe);
    }).catch((error) => {
        res.status(500).json({ message: "Error with creating a new Recipe: " + error })
    })
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find()
        .then((allRecipes) => {
            res.status(200).json(allRecipes);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error while getting recipes: " + error })
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipe:id", (req, res) => {
    Recipe.find(req.params.id)
        .then((recipe) => {
            res.status(200).json(recipe);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error while getting recipe: " + error })
        })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipe:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedRecipe) => {
            res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
            res.status(500).json({ message: "Error while updating recipe: " + error })
        })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipe:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send()
        })
        .catch((error) => {
            res.status(500).json({ message: "Error while deleting recipe: " + error })
        })
})


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