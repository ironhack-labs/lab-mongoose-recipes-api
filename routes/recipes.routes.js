/* const router = require('express').Router();
const Recipe = require("../models/Recipe.model");

router.post('/recipes', async(req, res, next) => {
    try {
        const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body
        const newRecipe = await Recipe.create({
            title, instructions, level, ingredients, image, duration, isArchived, created, 
        });

        res.status(201).json(newRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/recipes', async(req, res, next) => {
    try {
        const allRecipes = await Recipe.find()

        res.status(200).json(allRecipes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/recipes/:id', async(req, res, next) => {
    try {
       const  { recipeId } = req.params.id
       

       const singleRecipe = await Recipe.findById(recipeId)

       res.status(200).json(singleRecipe)

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.put('/recipes/:id', async(req, res, next) =>{
    try {

     const  { recipeId } = req.params.id

     const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
        title, instructions, level, ingredients, image, duration, isArchived, created,
     },
    {new: true});

    res.status(200).json(updatedRecipe);

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.delete('/recipes/:Id', async(req, res, next) => {
    try {
        
     const {recipeId} = req.params.id

     await Recipe.findOneAndDelete(recipeId);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})



module.exports = router; */




