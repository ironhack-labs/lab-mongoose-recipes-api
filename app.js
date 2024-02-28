const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
const Recipe = require("./models/Recipe.model")

const app = express()

app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())

const databaseName = 'express-mongoose-recipes-dev'
const connectionString = `mongodb://127.0.0.1:27017/${databaseName}`

mongoose
    .connect(connectionString)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES

const BASE_API_URL = 'http://localhost:3000'

app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>")
})

app.post('/recipes', (req, res) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe
        .create(req.body)
        .then(createdRecipe => res.status(201).json(createdRecipe))
        .catch(err => res.status(500).json(err))
})

app.get('/recipes', (req, res) => {

    Recipe
        .find()
        .then(allRecipes => res.status(200).json(allRecipes))
        .catch(err => res.status(500).json(err))
})

app.get('/recipes/:id', (req, res) => {

    const { id: recipeId } = req.params


    Recipe
        .findById(recipeId)
        .then(recepiInfo => res.status(200).json(recepiInfo))
        .catch(err => res.status(500).json(err))
})

app.put('/recipes/:id', (req, res) => {

    const { id: recipeId } = req.params
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body

    Recipe

        .findByIdAndUpdate(
            recipeId,
            req.body,
            { new: true, runValidators: true }
        )
        .then(updatedRecipe => res.status(200).json(updatedRecipe))
        .catch(err => res.status(500).json(err))
})

app.delete('/recipes/:id', (req, res) => {

    const { id: recipeId } = req.params
    Recipe
        .findByIdAndDelete(recipeId)
        .then(res.sendStatus(204))
        .catch(err => res.status(500).json({ message: 'Borraste la base de datos!!!' }))
})

// Posible debate¿?¿?  If a DELETE method is successfully applied, the origin server SHOULD
//    send a 202(Accepted) status code if the action will likely succeed
//    but has not yet been enacted, a 204(No Content) status code if the
//    action has been enacted and no further information is to be supplied,
//     or a 200(OK) status code if the action has been enacted and the
//    response message includes a representation describing the status.

app.listen(3000, () => console.log('My first app listening on port 3000!'))

module.exports = app
