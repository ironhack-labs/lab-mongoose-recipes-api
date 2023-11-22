const express = require("express");
const logger = require("morgan");

const app = express();

app.use(express.urlencoded())

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const Recipe = require("./models/Recipe.model.js")


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

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
app.post("/recipes", (req, res)=>{
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingridients: req.body.ingridients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((createdRecipe)=>{
        console.log("Recipe is created", createdRecipe);
        res.status(201).send(createdRecipe);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: 'Failed'})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res)=>{
    Recipe.find()
    .then((recipes)=>{
        res.status(200).send(recipes)
    })
    .catch((error)=>{
        res.status(500).send({error: 'failed'})
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", (req, res)=>{
    

    Recipe.findById(req.params.recipeId)
    .then((recipe)=>{
        res.status(200).send(recipe)
    })
    .catch((error)=>{
        res.status(500).send({error: 'failed to get the sinle'})
    })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", (req, res)=>{
    Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true})
    .then((updatedRecipes)=>{
        res.status(200).send(updatedRecipes)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send({error: 'failed to update'})
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res)=>{
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(()=>{
        res.status(200).send({message: 'recipe deleted'})
    })
    .catch((error)=>{
        res.status(500).send({message: 'failed to delete'})
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