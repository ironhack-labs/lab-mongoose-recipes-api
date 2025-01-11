const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model.js");

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
app.post("/create-recipes", async (req, res) => {
  try {
    const createdRecipe = await Recipemodel.create(req.body);
    console.log("Recipe created, good job", createdRecipe);
    res.status(201).json({
      createdRecipe: createdRecipe,
      message: "nice work, recipe was created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/all-recipes", async (req, res) => {
  console.log("Request recieved:", req.method);
  try {
    const allRecipes = await recipeModel.find();
    console.log("here is all the recipes", allRecipes);
    res.status(200).json({ allRecipes });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/one-recipe/:recipeId", async (req, res) => {
  const theRecipeId = req.params.recipeId;
  try {
    const oneRecipe = await RecipeModel.findById(theRecipeId);
    console.log("here is the recipe", oneRecipe);
    res.status(200).json({ oneRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/update/:recipeId", async (req, res) => {
  try {
    const theRecipeId = req.params.recipeId;
    
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      theRecipeId,
      req.body,
      {
        new: true, 
        $inc: { "_v": 1 } 
      }
    );
    
    console.log("Here is the updated Recipe", updatedRecipe);
    res.status(200).json({ updatedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json(error); 
  }
});



//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
