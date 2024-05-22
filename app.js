const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose.connect(MONGODB_URI)
.then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch((err) => console.error("Error connecting to mongo", err));


const Recipe = require("./models/Recipe.model.js")
// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req,res,next)=>{
    Recipe.create({
        title:req.body.title,
        instructions:req.body.instructions,
        level:req.body.level,
        ingredients:req.body.ingredients,
        image:req.body.image,
        duration:req.body.duration,
        isArchived:req.body.isArchived,
        created:req.body.created
    })
    .then((receta)=>{
      res.status(201).json(receta)
    })
    .catch((e)=>{
        res.status(500).json({message: "Error creando receta"})
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes",(req,res)=>{
  Recipe.find()
  .then((recetas)=>{
    res.status(201).json(recetas)
  })
  .catch((e)=>{
    res.status(500).json({message: "Error buscando recetas"})
  })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id",(req,res)=>{
  Recipe.findById(req.params.id)
  .then((receta)=>{
    res.status(200).json(receta)
  })
  .catch((e)=>{
    res.status(500).json({message: "Error buscando la receta"})
  })
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id",(req,res)=>{
  Recipe.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    instructions:req.body.instructions,
    level:req.body.level,
    ingredients:req.body.ingredients,
    image:req.body.image,
    duration:req.body.duration,
    isArchived:req.body.isArchived,
    created:req.body.created
})
  .then((receta)=>{
    res.status(200).json(receta)
  })
  .catch((e)=>{
    res.status(500).json({message: "Error editando la receta"})
  })
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id",(req,res)=>{
  Recipe.findByIdAndDelete(req.params.id)
  .then(()=>{//no espera respuesta
    res.status(204).send()//controlamos mensaje con codigo 204
  })
  .catch((e)=>{
    res.status(500).json({message: "Error borrando receta"})
  })
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
