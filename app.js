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
const MONGODB_URI = "mongodb://127.00.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x)=> console.log(`connected to Mongo! Database name: ?"{x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo",err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes shiquillo que Cosa más feaaa er backen, cohone, me gusta más el front y los colorinchis </h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
    //Crear una nueva receta usando la data desde req.body
    Recipe.create({
        tilte: req.body.title,
        instructions: req.body.instructions,
        level:req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((createdRecipe) => {
        //responder con una receta nueva creada y un status code de 201
        res.status(201).json(createdRecipe);
    })

    .catch((err)=> {
        //responder con un error y un status code de 500
        res.status(500).json({message: "Error en la creación de una nueva receta"});
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res)=>{
    //buscar todas las recetas en la base de datos
    Recipe.find()
    .then((allRecipes) => {
        //responder con todas las recetas y un status code de 200 
        res.status(200).json(allRecipes);
    })
    .catch((error)=>{
        //responder con un error y un status code de 500
        res.status(500).json({message: "Error while getting all recipes"});
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes', (req, res)=>{
    //buscar una receta en la base de datos
    Recipe.findById(req.params.id)
    .then((recipe)=>{
        //responder con la receta encontrada y un status code de 200
        res.status(200).json(recipe);
    })
    .catch((error)=>{
        res.status(500).json({ message: "Error a la hora de encontrar la receta"});
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) =>{
    //buscar una receta en la base de datos
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new:true })
    .then((updatedRecipe) => {
        //responder con la receta actualizada y un status code de 200
        res.status(200).json(updatedRecipe);
    })
    .catch((error)=> {
        res.status(500).json({ message: "Error while updating a single recipe"});
    });

})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
    // Eliminar una receta de la base de datos guiándonos por la id
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        //una vez ha sido eliminado el documento, responder con un 204 y sin contenido
        res.status(204).send();
        })
        .catch((error) => {
            //responder con un error y un status code de 500 
            res.status(500).json({ message: "Error cuando se ha intentado eliminar el documento"});
        });
});

// Start the server
app.listen(4000, () => console.log('My first app listening on port 4000!'));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
