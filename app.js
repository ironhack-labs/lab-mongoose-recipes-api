const express = require("express");
const logger = require("morgan");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...
const mongoose = require("mongoose")

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


//importamos elmodelo
const Recipe = require("./models/Recipe.model")
const User = require("./models/User.model")

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res)=>{
    try {
        await Recipe.create({
            
            title : req.body.title,
            level : req.body.level,
            ingredients : req.body.ingredients,
            cuisine : req.body.cuisine,
            dishType : req.body.dishType,
            image : req.body.image,
            duration : req.body.duration,
            creator : req.body.creator,
            created : req.body.created


        }).then((createdRecipe)=>{
            res.status(201).json({createdRecipe})
        })


    } catch (error) {
        console.log(error)

        res.status(500).json("message:error creating")
    }
}) 


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
 app.get("/recipes", async (req, res)=>{
    try {
        const response = await Recipe.find().populate("creator")
        
        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json("message:error getting recipe$")
        
    }
})  

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res)=>{
    try {
        const response = await Recipe.findById(req.params.recipeId).populate("creator")
        res.status(200).json(response)
        }
     catch (error) {
        console.log(error)
        res.status(500).json("message:error getting recipe$")
        
    }
}) 

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findByIdAndUpdate(req.params.id, {
            
            title : req.body.title,
            level : req.body.level,
            ingredients : req.body.ingredients,
            cuisine : req.body.cuisine,
            dishType : req.body.dishType,
            image : req.body.image,
            duration : req.body.duration,
            creator : req.body.creator,

            created : req.body.created


        
        }, {new:true})
        res.status(201).json(response)


    } catch (error) {
        console.log(error)
        res.status(500).json("message:error updating")
    }
}) 

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res)=>{
    try {
        const response = await Recipe.findByIdAndDelete(req.params.id)
        res.status(204).json(response)
        }
     catch (error) {
        console.log(error)
        res.status(500).json("message:error deleting recipe$")
        
    }
}) 


//Iteration 9 | Create a Single User
app.post("/users", async (req, res)=>{
    try {
        const response = await User.create({
            
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : req.body.passwordw

        })
            res.status(201).json({response})
        


    } catch (error) {
        console.log(error)
        res.status(500).json("message:error creating")
    }
}) 


// Bonus - Iteration 11 | Retrieve a Single User


 app.get("/users/:id", async (req, res)=>{
    try {
        const response = await User.findById(req.params.id)
        res.status(200).json(response)
        }
     catch (error) {
        console.log(error)
        res.status(500).json("message:error getting user")
        
    }
})  



//Bonus - Iteration 12 | Add Favorites
app.put("/users/:id", async (req, res)=>{
    try {
        const response = await User.findByIdAndUpdate(req.params.id,{
            
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : req.body.password,
            $push: { favorites: req.body.favorites }
            
        },{new: true})
            res.status(201).json({response})
 
    } catch (error) {
        console.log(error)
        res.status(500).json("message:error creating")
    }
}) 

//Retrieve a Single User with Favorites

app.get("/users/:id", async (req, res)=>{
    try {
          const response = await User.findById(req.params.id).populate("favorites")
          res.status(200).json(response)
          }
       catch (error) {
          console.log(error)
          res.status(500).json("message:error getting users")
          
      }
  })   




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
