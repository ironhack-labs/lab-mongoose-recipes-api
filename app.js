const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

const Recipe = require("./models/Recipe.model")
const User = require("./models/User.model")

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to MongoDB "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app
.post("/recipies", (req, res)=>{
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
.then((createdRecipe)=>{
    console.log("Recipe created!", createdRecipe);
    res.status(201).json(createdRecipe);
})
.catch((error)=>{
    res.status(500).json({message: "Failed to create your recipe"});
});
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app
.get("/recipes", (req, res)=>{
    Recipe.find()
.then((allRecipes)=>{
    console.log("Retrieved recipes", allRecipes);
    res.status(200).json(allRecipes);
})
.catch((error)=>{
    res.status(500).json({message: "Failed to fetch recipes"});
});   
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app
.get("/recipes/:id", (req, res)=>{
    Recipe.findById(req.params.id)
.then((recipe)=>{
    console.log("Recipe found!", recipeId);
    res.status(200).json(recipe);
})
.catch((error)=>{
    res.status(500).json({message: "Failed to fetch that recipe"});
});
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app
.put("/recipes/:id", (req, res)=>{
    const recipeId = req.params.recipeId;
    Recipe.findByIdAndUpdate(recipeId, {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    }, {new: true})
.then((updatedRecipe)=>{
    console.log("Recipe updated!", updatedRecipe);
    res.status(200).json(updatedRecipe);
})
.catch((error)=>{
    res.status(500).json({message: "Failed to update this recipe"});
});
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app
.delete("/recipes/:id", (req, res)=>{
    const recipeId = req.params.recipeId;
    Recipe.findByIdAndDelete(recipeId)
.then(()=>{
    console.log("Recipe deleted");
    res.status(204).send({message: "Recipe deleted!"});
})
.catch((error)=>{
    console.log(error);
    res.status(500).json({message: "Failed to delete recipe"});
});
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