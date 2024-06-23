const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model")
//add age express


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
app.post("/recipes", async (req, res) => {
    try {
        const newRecipe = {}; // You should create or get the new recipe here
        console.log('recipe created!', newRecipe);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        res.status(5005).json({ errorMessage: error.message });
    }
});



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async(req,res) => {
    console.log('here are all the recicpes', allRecipes);
    res.status(200).json(allRecipes)
} catch (error) {
    console.log(error)
}
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async(req,res) => {
try {
    const oneRecipe = await RecipeModel.findById(req.params.id)
    console.log("error", error)
    res.status(200),json(oneRecipe)
} catch (error) {
    console.log(error)
}
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async(req,res) => {
    try {
        const updateRecipe = await RecipeModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log('reciple updated', upDatedRecipe)
    } catch (error) {
        console.log.(error)
    }

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async(req,res) => {
    try {
        await RecipeModel.findByIdAndDelete(req.params.recipeId)
        res.status(200).json([message: 'succesfully deleted recipe']);
    } catch (error) {
        console.log(error)
    }
})


// Start the server
app.listen(5005, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
