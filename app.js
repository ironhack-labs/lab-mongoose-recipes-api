const Recipe = require("./models/Recipe.model")
const User = require("./models/User.model")
const express = require("express");
const logger = require("morgan");

const app = express();

const mongoose = require("mongoose")

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";



// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose.connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes",(req,res)=>{

    console.log(req.body)
    
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
        res.status(201).json(createdRecipe)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes",(req,res)=>{
    Recipe.find()
    .then((allRecipes)=>{
        console.log(allRecipes)
        res.status(200).json(allRecipes)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
        console.log(err)
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id",(req,res)=>{

    console.log(req.params.id)

    Recipe.findById(req.params.id)
    .then((foundRecipe)=>{
        console.log(foundRecipe)
        res.status(200).json(foundRecipe)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
        console.log(err)
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id",(req,res)=>{

    Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedRecipe)=>{
        console.log(updatedRecipe)
        res.status(200).json(updatedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
        console.log(err)
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id",(req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe)=>{
        res.status(200).json(deletedRecipe)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
        console.log(err)
    })
})

//Iteration 9 | Create a Single User
//Create a new route POST /users

app.post("/users",(req,res)=>{

    console.log(req.body)
    
    User.create({
  
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        image:req.body.image

    })
    .then((createdUser)=>{
        res.status(201).json(createdUser)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
    })
})

//Bonus - Iteration 11 | Retrieve a Single User

app.get("/users/:id",(req,res)=>{

    console.log(req.params.id)

    User.findById(req.params.id)
    .then((foundUser)=>{
        console.log(foundUser)
        res.status(200).json(foundUser)
    })
    .catch((err)=>{
        res.status(500).json({message:"Internal Server Error - Something went Wrong"})
        console.log(err)
    })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
