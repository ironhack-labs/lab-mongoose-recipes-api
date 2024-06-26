const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const Recipe = require("./models/Recipe.model");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
// app.get("/", (req, res) => {
//   res.send("<h1>LAB | Express Mongoose Recipes</h1>");
// });
app.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.log(error);
  }
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res, next) => {
  const { title, level, ingredients, image, duration, isArchived, created } =
    req.body;
  const recipeToCreate = {
    title,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };
  const createdRecipe = await Recipe.create(recipeToCreate);
  res.status(201).json(createdRecipe);
  try {
  } catch (error) {
    res.sendStatus(500);
  }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req,res,next) =>{
    Recipe.find()
    .then ((allrecipes)=>{
        res.status(200).json(allRecipes);
    })
    .catch(error) ={
        res.sendStatus(500);
    }
})
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req,res,next) =>{
    const {recipeId} = req.params;
    const oneRecipe=await Recipe.findOne ({_id:recipeId})
    res.json(oneRecipe);
    try{

   } catch(error) {
    res.sendStatus(500);
   }
})
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res, next) => {
    try{
        const { title, level, ingredients, image, duration, isArchived, created } =
        req.body;
      const recipeToUpdate = {
        title,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created,
      };
      const updatedRecipe = await Recipe.findOneAndUpdate(recipeToUpdate);
      res.status(201).json (updatedRecipe);
      } catch (error) {
        res.sendStatus(500);
      }
    });


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId", async (req, res, next) => {
	try {
		const { recipeId } = req.params
		await Recipe.findOneAndDelete({ _id: recipeId })
		res.sendStatus(204)
	} catch (error) {
		res.sendStatus(500);
	}
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
