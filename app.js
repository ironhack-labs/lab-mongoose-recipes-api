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
    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body

    const newRecipe = {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
    }

    Recipe.create(newRecipe)
        .then( (recipeFromDB) => {
            console.log(recipeFromDB)
            res.status(201).json('A new recipe has been created!')
        })
        .catch( (error) => {
            console.log("Error creating new recipe in the DB...", error);
            res.status(500).json("Error creating a new recipe in the DB...");
        })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    Recipe.find()
        .then((recipes) => {
            console.log("Retrieved recipes:", recipes)

            res.status(200).json(recipes)
        })
        .catch((error) => {
            console.log("Error while retriveving recipes: ", error)

            res.status(500).json({error: "Failed to retrieve recipes"})
        })
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('recipes/:id', (req, res) => {

    const {id} = req.params

    Recipe.findById(id)
        .then( (recipe) => {
            res.status(200).json(recipe)
        })
        .catch( error )
            res.status(500).json({error: "data not retrieved"})
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route


// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;