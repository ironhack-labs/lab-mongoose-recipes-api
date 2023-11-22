const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE

app.use(logger("dev"));
app.use(express.static("public"));

app.use(express.urlencoded());// <-- adicionar  sempre este 
app.use(express.json());

const Recipe = require('./models/Recipe.model');


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



app.post('/recipe', (req, res) => {
    // we validate the recipe that we wanted to create with the recipe model
    Recipe.create({
      title: req.body.title,
      instructions : req.body.instructions,
      level : req.body.level,
      ingredients : req.body.ingredients,
      image : req.body.image,
      duration : req.body.duration,
      isArchived : req.body.isArchived,
      created : req.body.created,

    })
      .then((createdRecipe) => {
        // if it is working then display the created recipe in the console.log and with an HTTP status of 201 (success request) :)
        console.log('recipe was created', createdRecipe);
        res.status(201).send(createdRecipe); // Use status code 201 for successful creation
      })
      .catch((error) => {
        // if it is not working then display a console.log with the error and send an HTTP status of 500 (server error) :(
        console.log(error);
        res.status(500).send({ error: 'Failed to create a recipe' });
      });
  });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route


app.get('/recipes', (req, res) => {
    Recipe.find()
      .then((recipes) => {
        console.log('Retrieved books', recipes);
        res.status(200).send(recipes);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ error: 'Failed to get all recipes' });
      });
  });

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get('/recipe/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
  
    Recipe.findByIdAndDelete(
    recipeId,
    {
        title: req.body.title,
        instructions : req.body.instructions,
        level : req.body.level,
        ingredients : req.body.ingredients,
        image : req.body.image,
        duration : req.body.duration,
        isArchived : req.body.isArchived,
        created : req.body.created,
  
      },
      { new: true }
    )
      .then((updatedRecipe) => {
        console.log('Updated recipe', updatedRecipe);
        res.status(200).send(updatedRecipe);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).send({ error: 'Failed to update the recipe' });
      });
  });

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipe/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
  
    Recipe.findByIdAndUpdate(
    recipeId,
    {
        title: req.body.title,
        instructions : req.body.instructions,
        level : req.body.level,
        ingredients : req.body.ingredients,
        image : req.body.image,
        duration : req.body.duration,
        isArchived : req.body.isArchived,
        created : req.body.created,
  
      },
      { new: true }
    )
      .then((updatedRecipe) => {
        console.log('Updated recipe', updatedRecipe);
        res.status(200).send(updatedRecipe);
      })

      .catch((error) => {
        console.log(error);
        res.status(500).send({ error: 'Failed to update the recipe' });
      });
  });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route


app.delete("/recipes/:recipesId", (req,res)=>{
    const recipesId = req.params.recipesId
    Recipe.findByIdAndDelete(recipesId)
    .then((result) =>{
        console.log("Recipe deleted!")
        res.status(200).send({menssage:"recipe deleted!"})
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send({ error: 'Failed deleting' });
      });
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