const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ...



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes'), (req, res) => {
    Recipe.create({
        title:req.body.title,
        instructions:req.body.instructions,
        level:req.body.level,
        ingredients : req.body.ingredients,
        image : req.body.image,
        duration : req.body.duration,
        isArchived: req.body.isArchived,
        created : req.body.created,
    })
    .then((createdReceipe) => {
    	console.log("Receipe created ->", createdReceipe);
    	res.status(201).send(createdReceipe);
  })
  .catch((error) => {
    console.error("Error while creating the receipe ->", error);
    res.status(500).send({ error: "Failed to create the new receipe" });
  });
}


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/receipes", (req, res) => {
    Recipe.find({})
      .then((allRecipes) => {
        console.log("Retrieved receipes ->", receipes);
      
        res.status(200).send(allRecipes);
      })
      .catch((error) => {
        console.error("Error while retrieving receipes ->", error);
        res.status(500).send({ error: "Failed to retrieve receipes" });
      });
  });


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/receipes/:id", (req, res) => {
    Recipe.findById({})
      .then((recipe) => {
       
      
        res.status(200).send(recipe);
      })
      .catch((error) => {
        console.error("Error while retrieving single receipe ->", error);
        res.status(500).send({ error: "Failed to retrieve receipes" });
      });
  });



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    const recipeId = req.params.id;
   
    Book.findByIdAndUpdate(recipeIdId, req.body, { new: true })
      .then((updatedRecipe) => {
        console.log("Updated recipe ->", updatedRecipe);    
      
        res.status(204).send(updatedRecipe);
      })
      .catch((error) => {
        console.error("Error while updating the recipe ->", error);
        res.status(500).send({ error: "Failed to update the recipe" });
      });
  });
  


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
      .then((result) => {
        console.log("Recipe deleted!");
        res.status(204).send(); 
        })
      .catch((error) => {
        console.error("Error while deleting the recipe ->", error);    
          res.status(500).send({error: "Deleting recipe failed"})
        });
  });
  



// Start the server
app.listen(5000, () => console.log('My first app listening on port 5000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
