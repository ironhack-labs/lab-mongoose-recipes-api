const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js")

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

app.post("/recipes", (req, res) => {

    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
        .then((newRecipe) => {
            // console.log(newRecipe);
            res.status(201).json(newRecipe);
        })
        .catch((e) => {
            // console.log(e);
            res.status(500).json({ e: "Failed to create a new recipe" });
        })
})



//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
    Recipe.find({})
        .then((recipeList) => {
           // console.log(recipeList)
            res.status(200).json(recipeList);
        })
        .catch((e) => {
            // console.log(e);
            res.status(500).json({ e: "Failed to display the list of all recipes" });
        })

})



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
    Recipe.findById (
      req.params.id
    )
        .then((recipeDetails) => {
            console.log(recipeDetails)
            res.status(200).json(recipeDetails);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ e: "Couldn't display details of this recipe" })
        })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then ((updatedRecipe) => {
        console.log(updatedRecipe);
        res.status(200).json(updatedRecipe);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({ e: "Couldn't update this recipe" });
    });
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then (() => {
        res.status(204).send();
        window.location.replace("/recipes");
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({ e: "Couldn't delete this recipe" });
    });
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
