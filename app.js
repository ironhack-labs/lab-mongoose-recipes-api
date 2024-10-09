const express = require("express");
const logger = require("morgan");
const mongoose= require("mongoose");


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017")
.then(()=>{
    console.log("conectados a la db")
}).catch((error)=>{
    console.log(error)
})

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
const Recipe= require("./models/Recipe.model")
//  POST  /recipes route
app.post("/recipes", (req, res)=>{
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    }).then((response)=>{
        res.status(201).json(response)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
