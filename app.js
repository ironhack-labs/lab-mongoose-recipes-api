const express = require("express");
const logger = require("morgan");
const Recipe = require("./models/Recipe.model.js")
const User = require("./models/User.model.js")
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded())
// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
async function connectMong(){
    try{
        const connection = await mongoose.connect(MONGODB_URI)
        console.log("Connected to MongoDB to database: " + connection.connections[0].name);
    }
    catch(error){
        console.log("Error connection to mongo, err");
    }
}
connectMong()

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res)=>{
    try{
        const response = await Recipe.create(req.body)
        console.log("Recipe created --->", response);
        res.status(201).json(response)
    }
    catch(err){
        console.log("error creating recipe: ", err);
        res.status(500).send({ err:"failure creating recipe..."});
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res)=>{
    try{
        const results = await Recipe.find({})
        console.log("Recipe Results ----> ", results);
        res.status(200).json(results)
    }
    catch(err){
        res.status(500).send({err: "failed to retrieve results"})
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req,res)=>{
    try{
        const response = await Recipe.findById(req.params.id)
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).send({err: "failed to retrieve result"})
    }
})

//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", async (req, res)=>{
    try{
        const response = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
        console.log("recipe edited");
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).send("error editing recipe--->", err)
    }
})


//  Iteration 7 - Delete a Single Recipe
app.delete("/recipes/:id", async (req, res)=>{
    try{
        await Recipe.findByIdAndDelete(req.params.id)
        console.log("recipe deleted");
        res.status(500).send()

    }
    catch(err){
        console.log("Recipe could not be deleted: " + err);
    }
})


// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route

app.get("/users", async (req, res)=>{
    try{
        const results = await User.find({})
        res.status(200).json(results)
    }
    catch(err){
        res.status(500).send({err: "failed to retrieve users"})

    }
})


app.post("/users", async (req, res)=>{
    try{
        const response = await User.create(req.body)
        console.log("user created: ", response)
        res.status(500).json(response)
    }
    catch(err){
        console.log("Could not create user", err);
        res.status(500)
    }
})

//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route
app.get("users/:id", async (req, res)=>{
    try{
        const response = await User.findById(req.params.id)
        res.status(500).json(response)
    }
    catch(err){
        console.log("user not retrieved ", err);
        res.status(500)
    }
})

//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route
app.put("/users/:id", async (req, res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200)
    }
    catch(err){
        console.log("Could not edit user", err);
        res.status(500)

    }
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;