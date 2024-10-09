
const mongoose = require("mongoose")

const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
.then((x)=>console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(error=>console.log(error))

const Recipe = require("./models/Recipe.model")

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res)=>{
    Recipe.create({...req.body})
    res.send(`The recipe: ${req.body.title} has been added.`)
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res)=>{
    Recipe.find()
    .then(response=>res.json(response))
    .catch(error=>console.log(error))
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', (req, res)=>{
    Recipe.findById(req.params.recipeId)
    .then(response=>res.json(response))
    .catch(error=>console.log(error))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId', (req, res)=>{
    Recipe.findByIdAndUpdate(req.params.recipeId, {...req.body})
    .then(response=>res.json(response))
    .catch(error=>console.log(error))
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', (req, res)=>{
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(response=>console.log(`La receta ${response.title} ha sido eliminada.`))
    .catch(error=>console.log(error))
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
