const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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
app.post('/recipes', async(req, res, next) => {
    try {
        const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body
        const newRecipe = await Recipe.create(req.body);

        res.status(201).json(newRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async(req, res, next) => {
    try {
        const allRecipes = await Recipe.find()

        res.status(200).json(allRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async(req, res, next) => {
    try {
       const  { recipeId } = req.params.id
       

       const singleRecipe = await Recipe.findById(recipeId)

       res.status(200).json(singleRecipe)

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', async(req, res, next) =>{
    try {

     const  { recipeId } = req.params.id

     const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
        title, instructions, level, ingredients, image, duration, isArchived, created,
     },
    {new: true});

    res.status(200).json(updatedRecipe);

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:Id', async(req, res, next) => {
    try {
        
     const {recipeId} = req.params.id

     await Recipe.findOneAndDelete(recipeId);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
