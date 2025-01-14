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
app.post("/recipes", async (request, response) => {
    try {
        const newRecipe = await Recipe.create(request.body); //for this we need const app = express()
        response.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (request, response) => {
    try {
        const recipes = await Recipe.find()
        response.json(recipes)
    } catch (error) {
        console.log(error)
        response.status(500).json(error)
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (request, response) => {
    const { id } = request.params
    if (mongoose.isValidObjectId(id)) {
        try {
            const oneRecipe = await Recipe.findById(id)
            response.status(200).json(oneRecipe)
        } catch (error) {
            console.log(error);
            response.status(500).json(error);
        }
    } else {
        response.status(400).json({ message: 'Invalid Id' })
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (request, response) => {

    const { id } = request.params

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        })
        response.status(200).json(updatedRecipe)
    } catch (error) {
        console.log(error);
        response.status(500).json(error)
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (request, response) => {
    const { id } = request.params
    if (mongoose.isValidObjectId(id)) {
        try {
            await Recipe.findByIdAndDelete(id)
            response.status(204).json()
        } catch (error) {
            console.log(error);
            response.status(500).json(error);
        }
    } else {
        response.status(400).json({ message: 'Invalid Id' })
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
