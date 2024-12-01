const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const Recipe = require('./models/Recipe.model')

// const Recipe = require("./models/Recipe.model")
dotenv.config();

const app = express();



// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose.connect(process.env.MONGODB_URI)
  .then((response) =>
    console.log(`connected to database: ${response.connections[0].name} `)
  )
  .catch((error) => console.error("ERROR CONNECTING TO THE DATABASE: ", error));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req, res, next) => {
    Recipe.create ({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((createdRecipe) => {
        res.status(201).json(createdRecipe);
    })
    .catch((err) => {
        res.status(500).json({message: "error while creating new recipe"})
    })

})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req, res, next) => {
  try {
    const response = await Recipe.find({});
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error while getting the Recipe" });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req, res) => {

  try {
    const { id } = req.params;
    console.log(id);
    const response = await Recipe.findById(id);
    res.json(response);
  } catch (error) {
        res.status(500).json({message: "Error while getting the Recipe"})
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = Recipe.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: "Error while updating the Recipe" });
  }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id);
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: "Error while updating the Recipe" });
  }
})


// Start the server
app.listen(5005, () => console.log('My first app listening on port 5005!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
