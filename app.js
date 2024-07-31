const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

const Recipe = require("./models/Recipe.model")

// Iteration 1 - Connect to MongoDB
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("conectados a la base de datos")
})
.catch((error)=>{
    console.log(error)
})
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req,res,next)=>{
try {
    
    const { title,instructions,level,ingredients,image,duration,isArchived,created } = req.body
    const response = await Recipe.create({

        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created

    })
    res.status(201).json(response)
} catch (error) {
    res.status(500).json({message: "Error while creating a new recipe"})
}


})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res, next)=>{
try {
    
    const response = await Recipe.find(req.query)
    res.status(200).json(response)

} catch (error) {
    res.status(500).json({message: "Error while getting all recipes"})
}
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("recipes/:id", async (req, res, next)=>{
    try {
        const response = await Recipe.findById(req.params.id)
        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({message: "Error while getting a single recipe"})
    }
    })

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res, next)=>{
    const { title,instructions,level,ingredients,image,duration,isArchived,created } = req.body
    try {
       const response = await Recipe.findByIdAndUpdate(req.params.id, {
        title,
        instructions,
        level,
        ingredients,
        image,
        duration,
        isArchived,
        created
       },{new:true})
       res.status(200).json(response) 
    } catch (error) {
        res.status(500).json({message: "Error while updating a single recipe"})
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", async (req, res, next)=>{
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.status(204).json("elemento borrado")
    } catch (error) {
        res.status(500).json({message: "Error while deleting a single recipe"})
    }
})


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
