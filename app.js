const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
const Recipe = require("./models/Recipe.model")
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) =>{
    try {
        const response = await Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json("Create new recipe failed")  
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res)=>{
    try {
        const response = await Recipe.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json("Find all recipes failed")   
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:idRoute", async(req, res) =>{
    try {
        const response = await Recipe.findbyId(req.body.idRoute)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json("Find all recipes failed")   
    }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:idRoute", async (req, res) =>{
    try {
        const response = await Recipe.findByIdAndUpdate({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
        }, {new: true})
    } catch (error) {
        res.status(500).json("Find a recipes failed")   
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:idRoute", async (req, res) =>{
    try {
        const response = await Recipe.findByIdAndDelete(req.body.idRoute)
        res.status(204).json({message: "Deleted recipe"})
    } catch (error) {
        res.status(500).json("Deleted recipe failed") 
    }
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
