const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect('mongodb://127.0.0.1:27017/express-mongoose-recipes-dev')
  .then((x) => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error('Error connecting to MongoDB', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
  res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next) => {
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  console.log(req.body);
  Recipe.create({
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  })
    .then((recipeFromDB) => {
      res.status(201).json(recipeFromDB);
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error while creating a new recipe' });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
  Recipe.find()
    .then((recipeFromDB) => {
      res.status(200).json(recipeFromDB);
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error while creating a new recipe' });
    });
});
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipeFromDB) => {
      res.status(200).json(recipeFromDB);
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error while creating a new recipe' });
    });
});
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  } = req.body;
  Recipe.findByIdAndUpdate(
    id,
    {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    },
    { new: true }
  )
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error while creating a new recipe' });
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error while creating a new recipe' });
    });
});

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
