const router = require('express').Router();
const Recipe = require("../models/Recipe.model");

router.post("/recipes", async (req, res) => {
    const { title, instructions, level, ingredients, image, duration, isArchived, created } = req.body;

    try {
        const newRecipe = await Recipe.create({ title, instructions, level, ingredients, image, duration, isArchived, created });
        res.status(200).json(newRecipe);
    } catch (error) {
        console.log(error);
    }
});

router.get("/recipes", async (req, res) => {
    try {
        const allRecipes = await Recipe.find();
        res.status(200).json(allRecipes);
    } catch (error) {
        console.log(error);
    }
});

router.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router