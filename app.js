const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
const app = express();
const Recipe = require("./models/Recipe.model.js");

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res)=> {
    //call the request body 
    console.log(req.body)
    const { title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;
    // creation process
    Recipe.create({
        title: req.body.title, // put all the const
        instructions: req.body.instructions, // to be equel
        level: req.body.level, // to req.body
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    //async handle create
    .then ((newRecipe) => { 
        res.status(201).json(newRecipe);
    })
    // async error handler 
    .catch((e) => {
        res.status(500).json({message: "Error while creating a new recipe"});
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
    Recipe.find() //handle the find
        .then((allRecipes) => { // async handle the find
        res.status(200).json(allRecipes);
         })
        .catch((e) => { // async handle the error
        res.status(500).json({message: "Error while getting all recipes"});
        })

})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id) // handle the find by id
    .then((recipe) => {
        res.status(200).json(recipe); //async handle the find by id
    })
    .catch((e) => { // async handle the error
        res.status(500).json({message: "Error while getting a single recipe"}) 
    })
});



//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (res, req) => {
    Recipe.findOneAndUpdate(req.params.id, req.body, {new: true}) // handle the update
    .then((UpdatedRecipe) => {
        res.status(200).json(UpdatedRecipe); // async handle the update
    })
    .catch((e) => { // async handle the error
        res.status(500).json({message: "Error while updating a single recipe"})
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id) // handle the delete
    .then(() => {
        res.status(204).send(); // async handle the delete
    })
    .catch((e) => { // async handle the error
        res.status(500).json({message: "Error while deleting a single recipe"})
    })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
