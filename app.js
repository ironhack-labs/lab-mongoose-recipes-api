const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");
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
app.post ('/recipes', async (req, res) => {
    const {title, instructions, level, ingredients, duration, image,isArchived, created} = req.body;
    try {
        const newRecipe = new RecipeModel({
            title,
            instructions,
            level,
            ingredients, // should be an array  
            image,
            duration,
            isArchived,
            created
        });
        res.status(200).json(newRecipe);
    } catch (error){
        res.status(500).json({error: error.message})
    };
    })
    




//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async(req, res)=>{
    try{
        const allrecipes = await recipes.find();
        res.status(200).json(allrecipes);
    
    }catch(error){
        console.log(error);
    }
}); 

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req,res)=>{
    RecipeModel.findById(req.params.id)
      .then(recipe=>{
        res.status(200).json(recipe)
      })
      .catch(err =>{
          res.status(500).json({message:"Error while trying"})
        })
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req,res)=>{
    Recipe.findByIdAndUpdate(req.params.id, req.body),{new: true}
      .then((updatedRecipe)=>{
        res.status(200).json(updatedRecipe)
        })
      .catch((err)=> {
        res.status(500).json({message:"Error while trying"})
      });
      });



//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
      .then(()=>{
        res.status(200).send();
      }).catch((error)=>{
        res.status(500).json({message:"Error while trying"})
      });
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
