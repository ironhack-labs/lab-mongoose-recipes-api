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
.then((response) => {
    console.log(`Connected to Mongo! Database name: "${response.connections[0].name}`);
})
.catch((error) => console.log("Error connecting to mongo", error))

// importamos nuestros models
const Recipe = require("./models/Recipe.model")
const User = require("./models/User.model")

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    try {
        await Recipe.create({
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        }) 
        res.json("recipe created")
    } catch (error) {
        console.log(error);
        res.json("Internal server error")
    }
    
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
        const response = await Recipe.find()
        res.json(response)
    } catch (error) {
        console.log(error);
        res.json("error al acceder a recipes")
    }
})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    try {
        const response = await Recipe.findById(req.params.id)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.json("error al acceder al detalle de una recipe")
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        })
        res.json("recipe editado")
    } catch (error) {
        console.log(error);
        res.json("error al editar una recipe")
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.json("recipe eliminada")
    } catch (error) {
        console.log(error);
        res.json("error al eliminar una recipe")
    }
})

// Iteration 8 - Create a single User
app.post("/users", async (req, res) => {
    try {
        await User.create({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            image: req.body.image
        }) 
        res.json("user created")
    } catch (error) {
        console.log(error);
        res.json("Internal server error")
    }
    
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
