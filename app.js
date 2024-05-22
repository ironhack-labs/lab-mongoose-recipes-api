const express = require("express");
const logger = require("morgan");

const Recipe = require("./models/Recipe.model");


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");
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
            console.log("Recipe succesfully created!", recipeFromDB);
            res.status(201).json(recipeFromDB);
        })
        .catch((error) => {
            console.log("Error creating the new recipe", error);
            res.status(500).json({error: "Failed to create the new recipe"});
        })

})



//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res, next) => {
    Recipe.find()
    .then( recipesArray => {
        res.json(recipesArray)
    })
    .catch((error) => {
        console.log("Error getting all the recipes from the DB", error);
        res.status(500).json({error: "Failed to get all the recipes"});
    });
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", (req, res, next) => {

    const {recipeId} = req.params;

    Recipe.findById(recipeId)
        .then(singleRecipeData => {
            res.json(singleRecipeData);
        })
        .catch((error) => {
            console.log("Error getting that recipe info", error);
            res.status(500).json({error: "Failed to get that recipe"});
        })

})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", (req, res, next) => {

    const {recipeId} = req.params;
    const newDetails = req.body;

    Recipe.findByIdAndUpdate(recipeId, newDetails, { new: true})
     .then(recipeFromDB => {
        console.log("Succes, recipe updated", recipeFromDB);
        res.json(recipeFromDB)
     })
     .catch((error) => {
        console.log("Error updating recipe info", error);
        res.status(500).json({error: "Failed to update recipe"});
     })

})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

    app.delete("/recipes/:recipeId", (req, res, next) => {

        const {recipeId} = req.params;

        Recipe.findByIdAndDelete(recipeId)
            .then(recipeFromDB => {
                console.log("Succes, recipe deleted", recipeFromDB);
                res.json(recipeFromDB)
            })
            .catch((error) => {
                console.log("Error deleting recipe", error);
                res.status(500).json({error: "Failed to delete recipe"});
             })

    })




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
