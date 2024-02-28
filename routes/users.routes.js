const Recipe = require("../models/Recipe.model")

const router = require("express").Router();

router.post("/recipes", async (req, res) => {
    const {title, instructions, level, ingredients, image, duration, isAchieved, created} = req.body;

    try{
        const newRecipe = await Recipe.create({title, instructions, level, ingredients, image, duration, isAchieved, created})
     
        res.status(201).json(newRecipe)
    }
    catch(error){
        console.log(error)
    }
})

router.get("/recipes", async (req,res) => {
    try{
        const allRecipes = await Recipe.find()
        res.status(200).json(allRecipes)
    }
    catch(error){
        console.log(error)
    }
})

router.get("/recipes/:id", async (req,res) => {
    try{
        const {id} = req.params
        const recipe = await Recipe.findById(id)
        res.status(200).json(recipe)

    }
    catch(error) {
        console.log(error)
    }
})

router.put("/recipes/:id", async (req,res) => {
    try{
        const {id} = req.params
        const recipe = await Recipe.findByIdAndUpdate(id, { $set: { title: 'jason bourne' }}, {new: true})
        res.status(200).json(recipe)
    }
    catch(error) {
        console.log(error)
    }
})

router.delete("/recipes/:id", async (req,res) => {
    try{
        const {id} = req.params
        const recipe = await Recipe.findByIdAndDelete(id)
        res.status(200).json(recipe)
    }
    catch(error) {
        console.log(error)
    }
})

module.exports = router