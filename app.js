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


const Recipe = require("./models/Recipe.model")




// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/api/recipes", async (req, res, next) => {

    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    try {
        
        const response = await Recipe.create({
            title, 
            instructions, 
            level, 
            ingredients, 
            image, 
            duration, 
            isArchived, 
            created
        })
        res.status(201).json( {message: "receta creada"})

    } catch (error) {
        next(error)
    }


})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/api/recipes", async (req, res, next) => {
    try {
        const response = await Recipe.find()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/api/recipes/:recipeId", async (req, res, next) => {
    try {
        const response = await Recipe.findById(req.params.recipeId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/api/recipes/:recipeId", async (req, res, next) => {
   
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    try {
        const response = await Recipe.findByIdAndUpdate
        (req.params.recipeId, { 
            title, 
            instructions, 
            level, 
            ingredients, 
            image, 
            duration, 
            isArchived, 
            created 
        }, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/api/recipes/:recipeId", async (req, res, next) => {
    try {
        const response = await Recipe.findByIdAndDelete(req.params.recipeId)
        res.status(202).json({message: "receta borrada"})
    } catch (error) {
        next(error)
    }
})


// 400
app.use((req, res, next) => {
    // esto se ejecuta siempre que la llamada llegue a este punto
    res.status(404).json({errorMessage: "Esta ruta no existe"})
  })

// 500
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({errorMessage: "El servidor explotó :("})
  })


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
