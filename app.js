const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = 'mongodb://127.0.0.1:27017/express-mongoose-recipes-dev';

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to Mongo', err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next) => {

    const {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    } = req.body;

    // Create a new recipe using the data from req.body
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((newRecipe) => {
        res.status(201).json(newRecipe);
    })
    .catch((error) => {
        res.status(500).json({message: 'Error. Unable to create new recipe.'});
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res, next) => {

    Recipe.find()
        .then((allRecipes) => {
            res.send(200).json(allRecipes);
        })
        .catch((error) => {
            res.status(500).json({message: 'Error. Cannot find recipes.'})
        });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res, next) => {

    const {recipeId} = req.params;

    Recipe.findById()
        .then((findRecipe) => {
            res.send(200).json(findRecipe);
        })
        .catch((error) => {
            res.status(500).json({message: 'Error. Cannot find recipe.'})
        });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res, next) => {

    const {recipeId} = req.params;

    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((updatedRecipe) => {
            res.send(200).json(updatedRecipe);
        })
        .catch((error) => {
            res.status(500).json({message: 'Error. Unable to update recipe.'});
        });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res, next) => {

    const {recipeId} = req.params;

    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).json({message: 'Error. Unable to delete recipe.'});
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