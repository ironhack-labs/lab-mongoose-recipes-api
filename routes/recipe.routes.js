const router = require('express').Router();
const User = require('../models/Recipe.model');

router.post("/recipes", async (req, res) => {
    const {title, instructions, level, ingredients, image, duration, isArchived, created} = req.body;

    try {
        const newRecipe = await User.create({title, instructions, level, ingredients, image, duration, isArchived, created});
        res.status(200).json(newRecipe);
    }
    catch(error) {
        console.log(error);
    }
})

module.exports = router;