const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose.connect(MONGODB_URI)
.then((x)=> console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`))
.catch((err) => console.log("Error connecting to Mongo", err))



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req,res)=>{
    console.log(req.body)
    Recipe.create(req.body)
    .then((createdRecipe)=>{
        console.log(createdRecipe)
        res.status(201).json(createdRecipe)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({errorMessage: "Error occured when creating a new recipe"})
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req,res)=>{
    Recipe.find()
    .then((allRecipes)=>{
        res.status(200).json(allRecipes)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({errorMessage: "Error occured when retrieving all recipe data"})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipe/:id", (req,res)=>{
    Recipe.findById(req.params.id)
    .then((oneRecipe)=>{
        console.log(oneRecipe)
        res.status(200).json(oneRecipe)
    })
    .catch((err)=>{
        console.log(er)
        res.status(500).json({errorMessage: "Error occured when retrieving data for a single recipe"})
    })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipe/:id", (req,res)=>{
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((updatedRecipe)=>{
        console.log(updatedRecipe)
        res.status(200).json(updatedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({errorMessage: "Error occured when updating a recipe"})
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipe/:id", (req,res)=>{
    Recipe.findOneAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({errorMessage: "Error occured when deleting a recipe"})
    })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
