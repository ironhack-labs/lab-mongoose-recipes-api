const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
.then((x)=>{
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch(()=>{
    console.log("ERROR. No se ha conectado a la DB")
})


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

const Recipe = require("./models/Recipe.model");
//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res)=>{
    try {
        const response = await Recipe.create(req.body);
        res.json(response);
        // res.status(201).json(response);
    } catch (error) {
        console.log(error)
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res)=>{
    try {
        const response = await Recipe.find();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findById(req.params.id);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findByIdAndDelete(req.params.id);
        res.send(`OK: Receta de ${response.title} eliminada!`);
    } catch (error) {
        console.log(error)
    }
})

//PATH /recipes/:id route
app.patch("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findByIdAndUpdate(req.params.id, {$addToSet: {ingredients: "sal"}}, {new: true});
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
