const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const dotenv = require("dotenv");
// we need to initialize it:
dotenv.config();

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB)
  .then((response) => {
    console.log(`Connected to the database: ${response.connections[0].name}`);
  })
  .catch((error) => console.error(error));

const Recipe = require("./models/Recipe.model");

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes",(req,res)=>{
    Recipe.create(req.body)
    .then(() =>{
        res.status(201).json({message:"The recipe has been created"})   
    })
    .catch((error) =>{
        console.error(error);
        res
            .status(500)
            .json({
                message:
                    "sorry, there was a problem with the server. Contact Marina"
            });
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes",(req,res)=>{
    Recipe.find(req.query)
        .then((recipes)=>{
            res.json(recipes)
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).json({message:"Sorry, this did not work"})
        })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req,res)=>{
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
        .then((recipe) =>{
        res.json(recipe);    
    })
        .catch((error) =>{
            console.error(error);
            res
                .status(500)
                .json({
                    message:
                        "sorry, there was a problem with the server. Contact Marina"
                });
        })
})
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId",(req,res)=>{
    //we are destructuring the params to get the playerId
    const {recipeId} = req.params;
    const updatedRecipe = req.body;


    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, {new: true})
    .then((recipe)=>{
        res.json({message:"The recipe has been updated", recipe});
    })
    .catch((error) =>{
        console.error(error);
        res
            .status(500)
            .json({
                message:
                    "sorry, there was a problem with the server. Contact Marina"
            });
    })
})
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipeId",(req,res)=>{
    //we are desturcuting the params to get the playerId
    const {recipeId} = req.params;
    
    Recipe.findByIdAndDelete(recipeId)
    .then(()=>{
        res.status(204).json({message:"The recipe has been deleted"});
    })
    .catch((error) =>{
        console.error(error);
        res
            .status(500)
            .json({
                message:
                    "sorry, there was a problem with the server. Contact Marina"
            });
    })
})
// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
