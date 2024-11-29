const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js");

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
app.post('/recipes', async (req, res, next) => {

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    try {
        const newRecipe = await Recipe.create({
            title,
            instructions,
            level,
            ingredients,
            image,
            duration,
            isArchived,
            created,
        });
        console.log(newRecipe);
        res.status(201).json({ message: `The recipe ${newRecipe.title} has been created successfully!` });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while creating a new recipe"})
      }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {

    try {
        const response = await Recipe.find();
        res.status(200).json(response)
        console.log(response);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Error while getting all recipes"})

    }


});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Recipe.findById(id);
        res.status(200).json(response);

      } catch (error) {
        res.status(500).json({message: "Error while getting a single recipe"})
      }

});



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    const updatedRecipe = { title, instructions, level, ingredients, image, duration, isArchived, created };

    try {
        const recipeResponse = await Recipe.findByIdAndUpdate(id, updatedRecipe, {
          new: true,
        });
    
        res.status(200).json({ recipeResponse });
      } catch (error) {
        res.status(500).json({message: "Error updating recipe"})
      }



});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', async (req, res) => {

  const { id } = req.params;

  
  try {

    const recipeToDelete = await Recipe.findById(id);

    
    if (!recipeToDelete) {
      return res.status(404).json({ message: "Recipe not found" }); //Why does this not get triggered?
    }
    
    const recipeResponse = await Recipe.findByIdAndDelete(id);

    res.status(200).json({ message: `The recipe ${recipeToDelete.title} has been successfully deleted.` });
  } catch (error) {
    res.status(500).json({message: "Error deleting recipe"})
  }


});



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
