const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const { createIndexes } = require("./models/Recipe.model");

const app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

app.post('/recipes', (req, res) => {

    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level, 
        ingredients: req.body.ingredients,
        level: req.body.level,
        image: req.body.image,
        duration: req.body.duration,
        sArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((recipe) => {
        res.status(201).json(createdRecipe);
    })
    .catch((err) => {
        res.status(500).json({message: "Error while creating a new recipe"});
    });
});

app.get('/recipes', (req, res) => {
    Recipe.find()
    .then((allRecipes) => {
        res.status(200).json(allRecipes);
    })
    .catch((error) => {
        res.status(500).json({message: "Error while getting all recipes"});
    });
});

app.get('/recipes', (req, res) => {
    Recipe.findId(req.params.id)
    .then((recipe) => {
        res.status(200).json(recipe);
    })
    .catch((error) => {
        res.status(500).json({message: "Error while getting a single recipe"});
    });
});

app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe) => {
        res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
        res.status(500).json({message: "Error while updating a single recipe"});
    });
});

app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send();
    })
    .catch((error) => {
        res.status(500).json({message: "Error while deleting a single recipe"});
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
