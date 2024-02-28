const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Recipe = require('./models/Recipe.model')

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
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req,res,next)=>{
    //const {} = req.body;
    Recipe.create({
        title:req.body.title,
        instructions:req.body.instructions,
        level:req.body.level,
        ingredients:req.body.ingredients,
        image:req.body.image,
        duration:req.body.duration,
        isArchived:req.body.isArchived,
        created:req.body.created
    }).then(
        (recipeFromDB)=>{
            res.status(201).json(recipeFromDB)
        }
    )
    .catch(
        (e)=>{
            console.log("Error creating a new recipe",e);
            res.status(500).json({message:"Error creating a new recipe"})
        }
    )
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes/', (req,res)=>{
    Recipe.find().then((recipes)=>{
        res.status(200).json(recipes);
    }).catch(e=>{
        res.status(500).json({
            message: "Error getting all recipes"
        });
    })
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id',(req,res)=>{
    Recipe.findOne({})
    .then(rec=>{
        console.log(req.params);
        res.json(req.params);
    })
    .catch((err)=>{
        console.log(err);
    })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id',(req,res)=>{
    Recipe.findOneAndUpdate(filter,update,{new: true})
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
