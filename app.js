const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const RecipeModel = require("./models/Recipe.model");

const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  
});


//  Iteration 3 - Create a Recipe route

app.post('/recipes', (req, res) => {

    RecipeModel.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived || false,
  createdAt: req.body.createdAt,
  })
  .then(createdRecipe => res.status(201).json(createdRecipe))
  .catch(err => res.status(500).json({ error: err.message }));
  
})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {

    RecipeModel.find()
    .then(allRecipes => {
        res.status(200).send(allRecipes);

    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
       });

    


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) =>
    RecipeModel.findById(req.params.id)
    .then(recipe => res.json(recipe))

    .catch(err => res.status(500).json({ error: err.message }))
);






//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) =>
    RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
   .then(updatedRecipe => res.json(updatedRecipe))
   .catch(err => res.status(500).json({ error: err.message }))
);


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) =>
    RecipeModel.findByIdAndDelete(req.params.id)
   .then(() => res.status(204).end())
   .catch(err => res.status(500).json({ error: err.message }))
);








const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
