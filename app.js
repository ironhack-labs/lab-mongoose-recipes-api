const express = require("express");
const logger = require("morgan");
const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
require('./db/db-conectionl')

const RecipeModel = require('./models/Recipe.model')


// ROUTES
//  GET  / route - This is just an example route



//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/app/recipes', (req, res)=>{
    const {title, instructions, level, ingredients, image, duration, isArchieve, created} = req.body
    
    RecipeModel
    .create({title, instructions, level, ingredients, image, duration, isArchieve, created})
    .then(newRecipe => res.sendStatus(201))
    .catch((err)=> res.json({code: 500, errorDeatails: err}))
    
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/app/recipes', (req, res) => {
    RecipeModel
        .find()
        .then(allRecipe => res.json(allRecipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))
     
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/app/recipes/:recipeId', (req, res) => {

    const { recipeId} = req.params
    RecipeModel
        .findById(recipeId)
        .then(oneRecipe => res.json(oneRecipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))
     
});



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/api/recipes/:recipeId', (req, res) => {

    const { recipeId } = req.params
    const {title, instructions, level, ingredients, image, duration, isArchieve, created} = req.body


    RecipeModel
        .findByIdAndUpdate(recipeId, {title, instructions, level, ingredients, image, duration, isArchieve, created})
        .then(updatedRecipe => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/app/recipes/:recipeId', (req, res) => {

    const { recipeId} = req.params
    RecipeModel
        .findByIdAndDelete(recipeId)
        .then(() => res.json(oneRecipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))
     
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
