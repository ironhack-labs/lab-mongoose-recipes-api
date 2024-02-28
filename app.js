const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

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


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipe", async (req,res)=>{
    const{title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
        } = req.body

    try{
    const newRecipe= await Recipe.create(
        {title,
            instructions,
            level,
            ingredients,
            image,
            duration,
            isArchived,
            created
        });

        res.status(201).json(newRecipe);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res)=>{
    try{
    const allRecipe = await User.find();
    res.status(200).json(allRecipe);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});

    }
}); 

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const recipe = await Recipe.findById( id );
        res.status(200).json(recipe)
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('recipes/:/:id',(req, res)=>{
    RecipeModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then((updatedRecipe)=>{
        res.status(200).jason(updatedRecipe);
    })
    .catch((error)=>{
        res.status(500).json({message:"Internal Server Error"})
    })
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req,res)=>{
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send();
    })
    .catch((error)=>{
        res.status(500).json({message:"Internal Server Error"})
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
