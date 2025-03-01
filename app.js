const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const User = require("./models/User.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
async function connectToDatabase () {
    try {
        await mongoose.connect(MONGODB_URI);
        const dbName = mongoose.connection.name;
        console.info(`Connected to Mongo! database name: ${dbName}`);
    } catch (error) {
        console.error("Error connecting to Mongo DB", error);
    }
}

connectToDatabase();

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    try {
        const requestBody = {
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        }
        const newRecipe = await Recipe.create(requestBody);
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Failed to try adding recipe");
        res.status(500).send( {message: error} );
    }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
        const getRecipes = await Recipe.find({});
        res.status(200).json(getRecipes);
    } catch (error) {
        console.error("Failed to get all recipes");
        res.status(500).send(error);
    }
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const getRecipe = await Recipe.findById(recipeId);
        res.status(200).json(getRecipe);
    } catch (error) {
        console.error("Failed to get recipe");
        res.status(500).send(error);
    }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(recipeId)) {
        return res.status(500).send("Specified id is not valid");
    }
    try {
        const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {new: true});
        res.status(200).json(updateRecipe);
    } catch (error) {
        res.status(500).send(error);
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        await Recipe.findByIdAndDelete(recipeId);
        res.sendStatus(204);
    } catch (error) {
        console.error("Failed to get recipe");
        res.status(500).send(error);
    }
})


//  Iteration 9 - Create a single user
//  POST  /users route
app.post("/users", async (req, res) => {
    try {
        const requestBody = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            image: req.body.image,
        }
        const newUser = await User.create(requestBody);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Failed to try adding User");
        res.status(500).send( {message: error} );
    }
});

//  Bonus Iteration 10 - Populate Users in Recipes
//  GET /recipes & /recipes/:id route

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;