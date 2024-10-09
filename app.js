const mongoose = require('mongoose')

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION -- done here to guarantee the connection works fine

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

const express = require("express");
const logger = require("morgan");

const Recipe = require('./models/Recipe.model')

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/recipes', async (req, res) => {
    try {

        const newRecipe = await Recipe.create({
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        })

        res.status(201).json(newRecipe) // sends the new recipe as an answer
        console.log(newRecipe)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'sth not-good happened while creating a new recipe' })
    }
})



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error aka not 200 (OK) fetching recipes' })
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json(recipe)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error fetching recipe by id' })
    }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
