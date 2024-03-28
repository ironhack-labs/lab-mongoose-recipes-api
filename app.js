const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const recipeModel = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ...



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res) => {
    console.log("document is successfully created", req.body),
    recipeModel.create(req.body)
    .then((newRecipe) => {
        console.log("new recipe created", newRecipe);
        res.status(201).json({ newRecipe, message: "Recipe document is successfully created!" });
    })
    .catch((err) => console.log( 
        res.status(500)
        .json({ message: "Error while creating a new recipe!"})));  
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    recipeModel.find()
    .then((allRecipes) => {
        console.log("Found all receipes");
        res.status(200).json(allRecipes);
    })
    .catch((err) => console.log( 
        res.status(500)
        .json({ message: "Error retrieving all recipes"})))
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const { recipeId } = req.params;
    recipeModel.findById(req.params.recipeId)
    .then((recipe) => {
        res.status(200).json(recipe);
    })
    .catch((err) => console.log(
        res.status(500)
        .json({ message: "Sorry recipe not found!"})))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    try {
        const updateRecipe = await recipeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ message: " Single Recipe updated ", updateRecipe });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal Error!"})
    }
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
try {
    const deleteRecipe = await recipeModel.findByIdAndDelete(
        req.params.deleteId
    );
    res.status(204).end();
} catch(err) {
    console.log(err);
    res.status(500).json({ error: err });
}
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
