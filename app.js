const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const app = express();

const dotenv = require("dotenv")
//we just have to initialize it:
dotenv.config();



// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION




mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));
// ROUTES
//  GET  / route - This is just an example route
const Recipe = require("./models/Recipe.model")
app.get('/recipes', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req,res) => {
    Recipe.create(req.body)
    .then((recipe) => {
        res.json(recipe);
    })
    .catch((error) => {
        console.error(error);
        res 
        .status(201)
        .json({
            message:
            "Sorry, there was a problem with the server"
        })
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req,res) => {
    
    Recipe.find()
    .then((allRecipes) => {
        res.json(allRecipes);
    })
    .catch((error) => {
        console.error(error);
        res 
        .status(500)
        .json({
            message:
            "Sorry, there was a problem with the server"
        })
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req,res) => {
   

    Recipe.findById(req.params.id)
    .then((recipe) => {
        res.status(200).json(recipe);
    })
    .catch((error) => {
        console.error(error);
        res 
        .status(500)
        .json({
            message:
            "Sorry, there was a problem with the server"
        })
    })
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req,res) => {
   

    Recipe.findByIdAndUpdate(req.params.id,req.body, {new:true})
    .then((updateRecipe) => {
        res.status(200).json(updateRecipe);
    })
    .catch((error) => {
        console.error(error);
        res 
        .status(500)
        .json({
            message:
            "Sorry, there was a problem with the server"
        })
    })
});






//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req,res) => {
   

    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch((error) => {
        console.error(error);
        res 
        .status(500)
        .json({
            message:
            "Sorry, there was a problem with the server"
        })
    })
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
