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
app.post('/recipes', (req, res, next) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;
    Recipe.create({
      title, instructions, level, ingredients, image, duration, isArchived, created
    })
    .then((recipeFromDB) => {
      res.status(201).json(recipeFromDB);
    })
    .catch((e) => {
      res.status(500).json({ message: "Error while creating a new recipe "});
    });
});




//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
  .then((AllRecipesFromDB) => {
    res.status(200).json(AllRecipesFromDB);
  })
  .catch((e) => {
    res.status(500).json({ message: 'Error while getting all recipes'});
  });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params
  Recipe.findById(id)
  .then((recipeFromDB) => {
    res.status(200).json(recipeFromDB);
  })
  .catch((e) => {
    res.status(500).json({message: 'Error creating a new recipe'});
  });
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;
  Recipe.findByIdAndUpdate(
    id,{ title, instructions, level, ingredients, image, duration, isArchived, created },
    { new: true}
  )
  .then((updateRecipe) => {
    res.status(200).json(updatedRecipe);
  })
  .catch((e) => {
    res.status(500).json({ message: 'Error while updating a recipe'});
  });
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
  .then(() => {
    res.status(204).send();
  })
  .catch((e) => {
    res.status(500).json({message: "Error while deleting a single recipe"})
  });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
