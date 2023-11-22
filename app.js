const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model')

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose
    .connect(MONGODB_URI)
    .then((x)=> console.log(`Conneced to Mongo! DbName:${x.connections[0].name}`))
    .catch((error)=>console.log('Error connecting',error))

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
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((newRecipe) => {
        res.status(201).send(newRecipe);
    })
    .catch((error) => {
        console.error(error);
    });
});



//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', (req,res)=>{
    Recipe.find()
    .then((recipes)=>{
        console.log("Found recipes",recipes)
        res.status(201).send(recipes);
    })  
    .catch((error)=>{
        console.log("could not do it", error);
        res.status(500).send({error: 'Failed to get recipes'})
    })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id',(req,res)=>{
    Recipe.findById(req.params.id)
    .then((recipe)=>{
        res.status(200).send(recipe);
    })
    .catch((error)=>{console.log(error)})
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id',(req,res)=>{

    Recipe.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    },{new:true})
    .then((recipe) => {
        res.status(200).send(recipe);
    })
    .catch((error)=>{console.log(error)})
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).send("Deleted");
    })
    .catch((error)=>{console.log(error)})
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