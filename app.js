const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose")

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose
.connect(MONGODB_URI)
.then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch((err) => console.error("Error connecting to mongo", err))

const recipeModel = require('./models/Recipe.model')

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {


    recipeModel.create(req.body)
    .then((createdRecipe) => {
        console.log(app.status(201))
        res.json(createdRecipe)
    })
    .catch((err) => {
        console.log(app.status(500))
    })
})



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    
    recipeModel.find()
    .then((allRecipes) => {
        console.log(app.status(200))
        res.json(allRecipes)
    })
    .catch((err) => {
        console.log(app.status(500), err)
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    
        recipeModel.findById(req.params.id)
        .then((foundRecipe) => {
            console.log(app.status(200))
            res.json(foundRecipe)
        })
        .catch((err) => {
            console.log(app.status(500), err)
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {

    recipeModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe) => {
        console.log(app.status(200))
        res.json(updatedRecipe)
    })
    .catch((err) => {
        console.log(err, app.status(500))
    })
}) 

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {

    recipeModel.findByIdAndDelete(req.params.id)
    .then((oneRecipe) => {
        console.log(app.status(204))
        res.json(oneRecipe)
    })
    .catch((err) => {
        console.log(err, app.status(500))
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
