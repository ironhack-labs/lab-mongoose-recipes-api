const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require ("./models/Recipe.model")
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
app.post('/recipes', async (req, res) => {
  const { title, instructions, level, ingredients, image, duration } = req.body;
  // Basic validation to check required fields
  if (!title || !instructions) {
      return res.status(400).json({ error: 'Title and instructions are required.' });
  }
  // Optionally check other fields based on business logic, for example:
  if (level && !['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'].includes(level)) {
      return res.status(400).json({ error: 'Invalid level provided.' });
  }
  try {
      const newRecipe = await Recipe.create({
          title,
          instructions,
          level,
          ingredients,
          image,
          duration
      });
      res.status(201).json(newRecipe);
  } catch (error) {
      console.error('Error creating recipe:', error);
      // MongoDB will throw errors for violations like unique constraints
      if (error.code === 11000) {
          return res.status(400).json({ error: 'A recipe with the same title already exists.' });
      }
      // Handle validation errors specifically
      if (error.name === 'ValidationError') {
          let errors = {};
          for (field in error.errors) {
              errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ error: 'Validation error', fields: errors });
      }
      res.status(500).json({ error: 'Server error' });
  }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes',async (req, res) => {
  const payload = req.body 
console.log(payload)
try {
  const recipes = await Recipe.find()
  res.status(200).json(recipes)
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', async (req, res) => {
  try {
      const recipe = await Recipe.findById(req.params.recipeId);
      if (!recipe) {
          return res.status(404).send("Recipe not found");
      }
      res.status(200).json(recipe);
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
});



//  Iteration 6 - Update a Single Recipe
// PUT /recipes/:recipeId route - Update a single recipe
app.put('/recipes/:recipeId', async (req, res) => {
  try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
          req.params.recipeId,
          req.body,
          { new: true, runValidators: true }
      );
      if (!updatedRecipe) {
          return res.status(404).json({ message: "Recipe not found. Please check the ID and try again." });
      }
      res.status(200).json({
          message: "Recipe updated successfully.",
          recipe: updatedRecipe
      });
  } catch (error) {
      console.error('Error updating recipe:', error);
      // Handle specific errors based on the type of error thrown
      if (error.kind === 'ObjectId' && error.path === '_id') {
          return res.status(400).json({ error: 'Invalid recipe ID format. Please use a valid recipe ID.' });
      }
      if (error.name === 'ValidationError') {
          let errors = {};
          for (let field in error.errors) {
              errors[field] = error.errors[field].message;
          }
          return res.status(400).json({ error: 'Validation failed for one or more fields.', details: errors });
      }
      res.status(500).json({ error: 'Server error while updating the recipe. Please try again later.' });
  }
});



//  Iteration 7 - Delete a Single Recipe
// DELETE /recipes/:recipeId route - Delete a single recipe
app.delete('/recipes/:recipeId', async (req, res) => {
  try {
      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
      if (!deletedRecipe) {
          return res.status(404).json({ message: "Recipe not found. Please check the ID and try again." });
      }
      res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle possible errors with specific messages
      if (error.kind === 'ObjectId' && error.path === '_id') {
          return res.status(400).json({ error: 'Invalid recipe ID format. Please use a valid recipe ID.' });
      }
      res.status(500).json({ error: 'Server error while deleting the recipe. Please try again later.' });
  }
});





// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
