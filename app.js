const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

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
app.post("/recipes", async (req, res, next) => {
    try {
        const response = await Recipe.create({
            name: req.body.name,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        })
        res.json({ message: "receta creada" })
    } catch (error) {
        console.log(error)
    }
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res, next) => {
    try {
        const response = await Recipe.find()
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recpes/:id", async (req, res, next) => {
    Recipe.findById(req.params.id)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            console.log(error)
        })
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    }, {new: true})
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        console.log(error)
    })
})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res, next) => {
    try {
        Recipe.findByIdAndDelete(req.params.id)
        res.json({message: "eliminado"})
    } catch (error) {
        console.log(error)
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
