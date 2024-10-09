const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model');

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

// ...



// ROUTES
//  GET  / route - This is just an example route
app.post("/recipes", (req, res) => {

    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })
    .then((createdRecipe)=>{
        res.status(201). json(createdRecipe);
    })
    .catch((err)=>{
        res.status(500). json({message:"Error creating new recipe"});
    })

})


app.get("/recipes", async (req, res) => {
    Recipe.find()
    try {
      const recipes = await Recipe.find(); 
      res.status(200).json(recipes); 
    } catch (err) {
      console.error("Error retrieving recipes:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });




app.get("/recipes/:id", async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id); 
      res.status(200).json(recipe); 
    } catch (err) {
      console.error("Error retrieving recipe:", err);
      res.status(500).json({ message: "Internal server error" }); 
    }
  });



// PUT /recipes/:id - Update a specific recipe by its _id
app.put("/recipes/:id", async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          instructions: req.body.instructions,
          level: req.body.level,
          ingredients: req.body.ingredients,
          image: req.body.image,
          duration: req.body.duration,
          isArchived: req.body.isArchived,
          created: req.body.created,
        },
        { new: true } 
      );
  
      res.status(200).json(updatedRecipe); 
    } catch (err) {
      console.error("Error updating recipe:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

 
app.delete("/recipes/:id", async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.id); 
      res.status(204).send(); 
    } catch (err) {
      console.error("Error deleting recipe:", err);
      res.status(500).json({ message: "Internal server error" }); 
    }
  });
  


app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});





// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
