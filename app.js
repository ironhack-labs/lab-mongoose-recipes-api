const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://localhost:27017//express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

const Recipe = require("./models/Recipe.model")

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res, next) => {

    try {
        const newRecipe = await Recipe.create({
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created,
        })
        res.json(newRecipe)
        
    } catch (error) {
        console.log(error)
    }

})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res, next) => {
    try {
       const recipes = await Recipe.find()
        res.json(recipes)
    } catch (error) {
        console.log(error)
        
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res, next) => {
    try {
        await Recipe.findById(req.params.recipeId)
        res.json("Done by id")
    } catch (error) {
        console.log(error)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", async (req, res, next) => {
    try {
        const response = await Recipe.findByIdAndUpdate(req.params.recipeId)
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", async (req, res, next) => {
    try {
        await Recipe.findByIdAndDelete(req.params.recipeId)
        res.json("Deleted")
    } catch (error) {
        console.log(error)
        
    }
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
