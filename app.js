const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded());
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/express-mongoose-recipes-dev")
    .then(x => {
        console.log(`Connected to MongoDb. Database name is ${x.connections[0].name}`);
        // Start the express server
        app.listen(3000, () => console.log('My first app listening on port 3000!'));
    })
    .catch(err => console.log(`Error while connecting to MongoDb. ${err}`));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    const payload = req.body;
    try {
        const response = await Recipe.create(payload);
        res.status(201).json(response);
    } catch (error) {
        console.log("Error occured while adding data");
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).send(errors);
        } else {
            res.status(500).json({ message: "Internal error occured" });
        }
    }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
        const response = await Recipe.find({});
        res.status(200).json(response);
    } catch (err) {
        console.log("Error while fetching recipes data: ", error);
        res.status(500).json({ message: "Internal error occured" });
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    if (mongoose.isValidObjectId(recipeId)) {
        try {
            const response = await Recipe.findById(recipeId);
            res.status(200).json(response);
        } catch (error) {
            console.log(`Error while fetching recipe ${recipeId} data: `, error);
            res.status(500).json({ message: "Internal error occured" });
        }
    } else {
        console.log(`Incorrect recipe id: ${recipeId}`);
        res.status(400).json({ message: "Invalid recipe id" });
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    const data = req.body;
    if (mongoose.isValidObjectId(recipeId)) {
        try {
            const response = await Recipe.findByIdAndUpdate(recipeId, data, { new: true });
            res.status(200).json(response);
        } catch (error) {
            console.log("Error occured while updating data");
            if (error.name === "ValidationError") {
                let errors = {};

                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                return res.status(400).send(errors);
            } else {
                res.status(500).json({ message: "Internal error occured" });
            }
        }
    } else {
        console.log(`Incorrect recipe id: ${recipeId}`);
        res.status(400).json({ message: "Invalid recipe id" });
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
    const recipeId = req.params.id;
    if (mongoose.isValidObjectId(recipeId)) {
        try {
            const response = await Recipe.findByIdAndDelete(recipeId);
            console.log(`Recipe deleted sucessfully with id: ${recipeId}`, response);
            res.status(200).send();
        } catch (error) {
            console.log("Error occured while deleting data: ", error);
            res.status(500).json({ message: "Internal error occured" });
        }
    } else {
        console.log(`Incorrect recipe id: ${recipeId}`);
        res.status(400).json({ message: "Invalid recipe id" });
    }
})




//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
