const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

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
app.post("/recipes", (req, res, next) => {
    const recipeDetails = req.body;
    Recipe.create(recipeDetails)
        .then((recipeFromDB) => {
            console.log("Recipe successfully created", recipeFromDB);
            res.status(201).json(recipeFromDB);
        })
        .catch((error)=> {
            console.log("Error in creating recipe", error);
            res.status(500).json({error: "Failed to create new recipe"});
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res, next)=> {
    Recipe.find()
    .then(recipesArr => {
        res.json(recipesArr)
    })
    .catch((error) => {
        console.log("Error getting all recipes", error);
        res.status(500).json({error: "You suck"})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", (req, res, next)=> {
   const {recipeId} = req.params;
   Recipe.findById(recipeId)
        .then(singleRecipeData => {
            res.json(singleRecipeData);
        })
        .catch((error) => {
            console.log("Error error error", error);
            res.status(500).json({error: "failed"});
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", (req, res, next)=> {
    const {recipeId} = req.params;
    const newDetails = req.body;
    Recipe.findByIdAndUpdate(recipeId, newDetails, {new:true})
    .then(recipeFromDB => {
        console.log("Sucess, recipe updated", recipeFromDB)
        res.json(recipeFromDB)
    })
    .catch((error) => {
        console.log("lots of errors", error)
        res.status(500).json({error: "hehe sucks to be you"})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res, next)=> {
    const {recipeId} = req.params;
    Recipe.findByIdAndDelete(recipeId)
    .then(recipeFromDB => {
        console.log("Success, deleted", recipeFromDB);
    })
    .catch((error) => {
        console.log("error when deleting", error)
        res.status(500).json({error : "not deleted"})
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
