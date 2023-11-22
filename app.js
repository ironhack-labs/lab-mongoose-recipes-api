const express = require("express");
const logger = require("morgan");
// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded()); // We need to add this in order for it to accept urls of any form without failing or having issues

// Iteration 3 - Set up a mongoose connection in the app.js file:
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

// Iteration 3 | Create a Recipe
//  POST  /recipes route
app.post("/recipes", (req, res)=>{
    // We validate the book that we wanted to create with the Book model
    Recipe.create({
        title: req.body.title,
        instruction: req.body.instruction,
        level: req.body.level,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator
    })
    .then((createdRecipe) =>{
        // If it's working, then display the createBook in a console.log and with a HTTP status of 201 (sucess requested)
        res.status(201).json(createdRecipe);        
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({error: 'Failed to create a Recipe'});
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res)=>{
    Recipe.find() // 
    .then((allRecipes)=>{
        res.status(200).json(allRecipes);
    })
    .catch((error)=>{
        res.status(500).json({error: 'Failed to get all recipes'});
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res)=>{
    Recipe.findById(req.params.id)
    .then((recipe)=>{
        res.status(200).json(recipe);
})
.catch((error)=>{
    res.status(500).json({message: "Error while getting a single recipe"});
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res)=>{
    /* const recipeId = req.params.recipeId; */

    Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedRecipe)=>{
        res.status(200).json(updatedRecipe);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({message: 'Failed to update a single recipe'});
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res)=>{
    
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
        console.log("Recipe deleted!");
        res.status(204).send()
})
.catch((error)=>{
    console.log(error);
    res.status(500).json({message: "Failed to delete a single recipe"});
    })
});

 /* Não há instruções no Lab para os bônus abaixo */

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My app listening on port 3000!'));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;