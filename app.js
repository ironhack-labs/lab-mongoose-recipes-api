const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose
  .connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) =>
    console.log(`Conectado a Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
  try {
    const response = await Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    });
    res.send(response);
    console.log("operacion exitosa")

  } catch (error) {
    res.status(500).json({ message: "Error while creating a new recipe" });
  }
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req,res)=>{
  try {
    const response = await Recipe.find();
    res.json(response);
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", async (req,res)=>{
  try {
    const response = await Recipe.findById(req.params.id);
    res.send(response)
  } catch (error) {
    console.log(error)
  }
})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req,res)=>{
  try {
    const response = await Recipe.findByIdAndUpdate(req.params.id,
      {
        ...req.body,
      },
      {new: true}
    );
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("web conectada a puerto 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
