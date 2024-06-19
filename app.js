const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");
const dbAddress = process.env.DB_URL || "mongodb://localhost:27017/recipesDB";
mongoose
  .connect(dbAddress)
  .then((responseFromDB) => console.log(`Connected to Mongo! Database name: "${responseFromDB.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
   
    try {
        const createRecipe = await  RecipeModel.create({
            title: req.body.title,
            instruction: req.body.instruction,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
        })
        res.status(201).json(createRecipe);
    } catch (error) {
        res.status(500).json(err)
    }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async(req, res) => {
    try {
        const getAllRecipes = await RecipeModel.find();
        res.status(200).json(getAllRecipes);
    } catch (err) {
        res.status(500).json(err);
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    try {
        const oneRecipe = await RecipeModel.findById(req.params.id);
        res.status(200).json(oneRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.patch("/recipes/:id", async (req, res) => {
    try {
        const updateRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(updateRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.id);
        res.status(204).json(deletedRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
