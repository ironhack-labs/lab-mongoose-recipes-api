const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const PORT = 3001
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
    .connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    try {
        const createdRecipe = await Recipe.create(req.body)

        return res.status(201).json(createdRecipe)

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "error"})
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async(req, res)=>{
    try{
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch(error){
        console.log(error);
        return res.status(500).json(error)
    }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async(req, res)=>{
    const {id} = req.params;
    
    try{
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    } catch(error){
        console.log("get recipeid err: ", error);
        res.status(500).json(error);
    }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  //:id route
app.put("/recipes/:id", async(req,res)=>{
    const {id} = req.params;
    const newDetails = req.body;

    try {
        const recipe = await Recipe.findByIdAndUpdate(id,newDetails)
        res.status(200).json(recipe);
    } catch (error) {
        console.log("put recipeid err: ", error);
        res.status(500).json(error);
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const deltedRecipe = await Recipe.findByIdAndDelete(id);
        res.status(200).json(deltedRecipe);
    } catch (error) {
        console.log("delete recipeid err: ", error);
        res.status(500).json(error);
    }
})

// Start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
