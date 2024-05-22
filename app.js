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




  mongoose.connect("mongodb://127.0.0.1:27017/express-mongoose-recipes-dev")
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes",(req, res)=>{
Recipe.create({
    name:req.body.name,
    instructions:req.body.instructions,
    level:req.body.level,
    ingredients:req.body.ingredients,
    image:req.body.image,
    duration:req.body.duration,
    isArchived:req.body.isArchived,
    created:req.body.created
})
.then(()=>{
    res.json({message:"todo esta bien"})
}).catch((error)=>{
    res.json(error)
})
})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes",async(req,res)=>{
try {
    const response =await Recipe.find()
    console.log(response);
    res.json(response)
    
} catch (error) {
    res.json(error)
}
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipesId", async(req,res)=>{
    console.log(req.params);
    try {
        const response= await Recipe.findById(req.params.recipesId)
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipesId",async(req,res)=>{
    try {
        await Recipe.findByIdAndUpdate(req.params.recipesId,{
        name:req.body.name,
        instructions:req.body.instructions,
        level:req.body.level,
        ingredients:req.body.ingredients,
        image:req.body.image,
        duration:req.body.duration,
        isArchived:req.body.isArchived,
        created:req.body.created
    })
    } catch (error) {
        console.log(error);
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:recipesId", async(req,res)=>{
    try {
        await Recipe.findByIdAndDelete(req.params.recipesId)
        res.json("receta borrada")
    } catch (error) {
        console.log(error);
    }
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
