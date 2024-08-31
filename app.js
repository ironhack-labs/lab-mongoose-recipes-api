const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model")
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"
mongoose
    .connect(MONGODB_URI)
    .then((response) => {
        console.log("connected to mongodb, db name:", response.connections[0].name)
    })
    .catch((error) => {
        console.log("error connecting to db, error: ", error);     
    })


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
    console.log(req.body)

    Recipe.create(req.body)
        .then((createdRecipeFromDB) => {
            res.status(201).json(createdRecipeFromDB)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({message: error})
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find({})
        .then((recipesFromDB) => {
            res.json(recipesFromDB)
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then((recipeFromDB) => {
            res.json(recipeFromDB)
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
    const { id } = req.params;
    const updatedRecipe = req.body

    Recipe.findByIdAndUpdate(id, req.body)
        .then((recipeFromDB) => {
            res.json(recipeFromDB)
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {
    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch((error) => {
            res.status(500).json({message: error})
        })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
