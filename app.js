const express = require("express");
const logger = require("morgan");

const app = express();

//database

require('./db/database-connection')

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// import Model
const Recipe = require('./models/Recipe.model')



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


app.post('/recipes', (req, res) => {

    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .create({ title, instructions, level, ingredients, image, duration, isArchived })
        .then(newRecipe => res.sendStatus(201))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.json(allRecipes))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', (req, res) => {

    const { recipe_id } = req.params

    Recipe
        .findById(recipe_id)
        .then(recipe => res.json(recipe))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', (req, res) => {

    const { recipe_id } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived } = req.body

    Recipe
        .findByIdAndUpdate(recipe_id, { title, instructions, level, ingredients, image, duration, isArchived })
        .then(updatedRecipe => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id ', (req, res) => {

    const { recipe_id } = req.params

    Recipe
        .findByIdAndDelete(recipe_id)
        .then(() => res.sendStatus(204))
        .catch(err => res.json({ code: 500, errorDetails: err }))
})




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
