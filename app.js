const express = require("express");
const logger = require("morgan");

const app = express();
app.use(express.urlencoded())
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js");

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
   
    Recipe.create({
        title: req.body.title,
        level: req.body.level,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((createdRecipe)=>{
        res.status(201).json(createdRecipe)
    })
    .catch((error)=>{
        res.status(500).json({message: " Error while creating recipe"})
    })
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req,res)=>{
    Recipe.find()
    .then((allRecipes)=>{
        res.status(200).json(allRecipes);
    })
    .catch((error) => {
        res.status(500).send({ error: 'Failed to retrieve all recipes' });

    });
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            res.status(200).json(recipe || { error: 'Recipe not found' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve recipe' });
        });
});



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
    const id = req.params.id; 

    Recipe.findByIdAndUpdate(id, {
        title: req.body.title,
        level: req.body.level,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    }, { new: true })
    .then((updatedRecipe) => {
       
        res.status(200).send(updatedRecipe);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send({ error: 'Failed to update recipe' });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req,res)=>{
    const recipeId = req.params.recipeId;

    Recipe.findByIdAndDelete(recipeId)
    .then(()=>{
        res.status(200).send({send: 'Recipe deleted'})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete the Recipe' });
    });

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