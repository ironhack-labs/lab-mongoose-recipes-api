const express = require("express");
const logger = require("morgan");

const app = express();
require('./db/database-connection')

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const Recipe = require('./models/Recipe.model')



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/api/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe

        .create({ title, instructions, level, ingredients, image, duration, isArchived })
        .then(newRecipe => res.json(newRecipe))
        .catch(err => res.json({ code: 500, errorDEtails: err }))
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/api/recipes', (req, res) => {

    Recipe

        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/api/recipes/:id', (req, res) => {

    const { id } = req.params

    Recipe

        .findById(id)
        .then(recipe => res.json(recipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 6 - Update a Single Recipe    
//  PUT  /recipes/:id route
app.put('/api/recipes/:id', (req, res) => {

    const { id } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findByIdAndUpdate(id, { title, instructions, level, ingredients, image, duration, isArchived })
        .then(updatedRecipe => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/api/recipes/:id', (req, res) => {

    const { id } = req.params

    Recipe
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
