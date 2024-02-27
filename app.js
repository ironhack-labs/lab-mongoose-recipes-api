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
    .then((x) => console.log(`Conected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to MongoDB", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res, next) => {
    // create new recipe using the data from req.body
    Recipe.create({
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator
    })
    .then((createdRecipe) => {
        // Respond with the newly created recipe and a 201 status code
        res.status(201).json(createdRecipe);
    })
    .catch((error) => {
        res.status(500).json({ message: "Error while creating the recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res, next) => {
    // Get all recipes from the database
    Recipe.find()
    .then((allRecipes) => {
        // Respond with all recipes and a 200 status code
        res.status(200).json(allRecipes);
    })
    .catch((error) => {
        res.status(500).json({ message: "Error while getting the recipes" });
    });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res, next) => {
    // Get a single recipe from the database using the query params id 
    Recipe.findById(req.params.id)
  .then((recipe) => {
    // Respond with the recipe and a 200 status code
    res.status(200).json(recipe);
  })
  .catch((error) => {
    res.status(500).json({ message: "Error while getting the recipe" });
  });

});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res, next) => {
    // Update teh recipe using the id from url and the data from req.body
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
.then((updatedRecipe) => {
    // Respond with the updated recipe and a 200 status code
    res.status(200).json(updatedRecipe);
  })
.catch((error) => {
    res.status(500).json({ message: "Error while updating the recipe" });
  });

});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res, next) => {
    // Delete the recipe using the query params id from url
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        // Once deleted, respond with a 204 status code and no content
        res.status(204).send();
    })
    .catch((error) => {
        res.status(500).json({ message: "Error while deleting the recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
