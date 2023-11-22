const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded());

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


const Recipe = require('./models/Recipe.model.js');


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
app.post('/recipes', (req, res)=>{
    // We validate the book that we wanted to create with the book model
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
      })
    .then((createdRecipe)=>{
        // If it's working, then display the createdBook in a console.log
        // and with a HTTP status of 201 (success request)
        console.log('Recipe was created', createdRecipe);
        res.status(201).send(createdRecipe);
    })
    .catch((error)=>{
        // if it's not working, then display a console.log with the 
        // error and send a HTTP status of 500 (server error)
        console.log(error)
        res.status(500).send({error: 'Failed to create a Recipe'});
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res)=>{
    Recipe.find()
    .then((recipes)=>{
        console.log('Retrieved Recipes', recipes);
        res.status(200).send(recipes)
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: 'Failed to get recipes'});
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', (req, res)=>{
    const recipeId = req.params.recipeId;

    Recipe.findById(recipeId)
    .then((recipe)=>{
        console.log('Retrieved Recipe', recipe);
        res.status(200).send(recipe)
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: 'Failed to get a single recipe'});
    })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId', (req, res)=>{
    const recipeId = req.params.recipeId;

    Recipe.findByIdAndUpdate(recipeId, {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
      }, {new: true})
    .then((recipe)=>{
        console.log('Retrieved Recipe', recipe);
        res.status(200).send(recipe)
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: 'Failed to get a single recipe'});
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', (req, res)=>{
    const recipeId = req.params.recipeId;

    Recipe.findByIdAndDelete(recipeId)
    .then((recipe)=>{
        console.log('Retrieved Recipe', recipe);
        res.status(200).send(recipe)
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).send({error: 'Failed to get a single recipe'});
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