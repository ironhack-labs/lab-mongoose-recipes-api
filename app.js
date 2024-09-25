const express = require("express");
const mongoose = require('mongoose');
const recipeModel = require('./models/Recipe.model')
const logger = require("morgan");

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
app.post('/recipes', async(req,res)=>{
    try{
        let createdRecipe = await recipeModel.create(req.body)
        res.json(createdRecipe)
    }catch(err){
        console.log(err)
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes', async(req, res)=>{
    try{
        let allRecipes = await recipeModel.find()
        res.json(allRecipes)
    }
    catch(err){
        console.log(err)
    }
})
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipes/:id', async(req,res)=>{
    try{
        let foundRecipe = await recipeModel.findById(req.params.id)
        res.json(foundRecipe)
    }
    catch(err){
        console.log(err)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req,res)=>{
    
        recipeModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
        .then((updatedRecipe)=>{
            res.json(updatedRecipe)
        }).catch((err)=>{
            console.log(err)
        })
    
    
        
    
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
    app.delete('/recipes/:id', (req,res)=>{
        recipeModel.findByIdAndDelete(req.params.id)
        .then((deletedBook)=>{
            res.json(deletedBook)
        }).catch((err)=>{
            console.log(err)
        })
    })


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
