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
app.post('/recipes',(req, res)=>{
    const {title, instructions, level, ingredients, image, duration, isArchived, created } = req.body
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
        .then((respose)=>{
            console.log("Cretaed new Recipe")
            res.status(201).json(respose)
        })
        .catch((err)=>{
            console.log("Error"+err)
            res.status(500).json({message : "Error creating a recipe in the DB..."});
        })
})


//  Iteration 4 - Get All Recipes
app.get('/recipes',(req,res)=>{
    Recipe.find()
    .then((respose)=>{
        console.log("List of Recipes",respose)
        res.status(201).json(respose)
    })
    .catch((err)=>{
        console.log("Error"+err)
        res.status(500).json({message : "Error in fetching recipes in the DB..."});
    })
})


//  Iteration 5 - Get a Single Recipe
app.get("recipes/:id", (req,res)=>{
    Recipe.findById(req.param.id)
        .then((recipe)=>{
            res.status(200).json(recipe);
        })
        .catch((err)=>{
            res.status(500).json({message : "Error in fetching recipe in the DB..."});
        })
})


//  Iteration 6 - Update a Single Recipe
app.put('/recipes/:id' ,(req,res)=>{
    const {id} = req.params;
    const {title, instructions, level, ingredients, image, duration, isArchived, created } = req.body
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
    Recipe.findByIdAndUpdate(id,newRecipe,{new : true})
    .then((updatedRecipe)=>{
        res.status(200).json(updatedRecipe);
    })
    .catch((err)=>{
        res.status(500).json({message : "Error in updating recipe in the DB..."});
    })
})


//  Iteration 7 - Delete a Single Recipe
app.delete('/recipes/:id', (req,res) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
    .then(()=>{
        res.status(204).json()
    })
    .catch((err)=>{
        res.status(500).json({message : "Error in deleting recipe in the DB..."});
    })
})


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