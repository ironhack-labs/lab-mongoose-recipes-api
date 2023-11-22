const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();
app.use(express.urlencoded());
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const Recipe = require("./models/Recipe.model");

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
app.post("/recipes", (req,res)=>{
    // we validate the recipe that we wanted to create with the Recipe model
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((createdRecipe)=>{
         /* If it's working, then display the createdRecipe in a console.log and with a HTTP 
         status of 201 (success request) :) */
        console.log("Recipe was created", createdRecipe);
        res.status(201).send(createdRecipe);
    })
    .catch((error)=>{
        /* If it's not working, then display a console.log with the error and send a HTTP
        status of 500 (server error) :(   */      
        console.log(error);
        res.status(500).json({error: "Failed to create a recipe"})
    });
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req,res)=>{
    Recipe.find()
    .then((recipes)=>{
        console.log("Retrieved recipes", recipes);
        res.status(200).json(recipes);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({error: "Failed to get recipes"});
    })
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req,res)=>{
    Recipe.findById(req.params.id)
    .then((recipe)=>{
        console.log("Retrieved recipe", recipe);
        res.status(200).json(recipe);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({error: "Failed to get recipe"});
    })
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req,res)=>{
    const recipeId = req.params.id;

    Recipe.findByIdAndUpdate(recipeId, {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    }, {new: true})
    .then((updatedRecipe)=>{
        console.log("Updated Recipe", updatedRecipe);
        res.status(200).json(updatedRecipe);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({error: "Failed to update recipe"});
    })
});


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req,res)=>{
    const recipeId = req.params.id;
    Recipe.findByIdAndDelete(recipeId)
    .then(()=>{
        console.log("Recipe deleted!");
        res.status(204).send({message: "Recipe deleted!"})
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: "Failed to delete the book"});
    })
});


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