const express = require("express");
const logger = require("morgan");

const app = express();
const mongoose = require("mongoose");

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
app.post("/recepies", (req, res)=>{
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((createRecipe =>{
        console.log("Recipe created ->",createRecipe)
        res.status(201).send(createRecipe)
    }))
    .catch((error)=>{
        res.status(500).send({error: "Failed to create new Recipe"})
    })
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res)=>{
    Recipe.find()
        .then((allRecipe)=>{
            res.status(200).json(allRecipe)
        })
        .catch((error)=>{
            ret.status(500).json({message:"Error gettingall recepie"})
        })
    
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recepies/:id", (req, res)=>{
    Recipe.findbyId(req.params.id)
    .then((recip)=>{
        res.status(200).json(recip)
    })

    .catch((error)=>{
        res.status(500).json({message:"Error gettin recepie"})
    })
})
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recepies/is", (req, res)=>{
    Recipe.findbyIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updateRecipe)=>{
        res.status(200).json(updateRecipe)
    })
    .catch((error)=>{
        res.status(500).json({message:"Error gettin recepie"})
    })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res)=>{
    Recipe.findbyIdAndUpdate(req.params.id)
    .then(()=>{
        res.status(200).send()
    })
    .catch((error)=>{
        res.status(500).json({message:"Error gettin recepie"})
    })
})
// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;