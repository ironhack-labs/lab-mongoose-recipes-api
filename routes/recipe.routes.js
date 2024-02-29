const router = require('express').Router();
const Recipe = require('../models/Recipe.model');


router.post("/recipe", async(req, res) =>{
    const {title, instructions, level, ingredients, image, 
        duration, isArchived, created} = req.body;

        try{
            const newRecipe = await Recipe.create({title,instructions, level, ingredients, image, duration, isArchived, created});
            res.status(201).json(newRecipe)
        }
        catch(error){
            res.status(500).json({ message: "Error while creating a new recipe"});
        };

       
});

router.get("/recipes", async(req, res) =>{
    try{
        const allRicipes = await Recipe.find();
        res.status(200).json (allRicipes)
    }
    catch(error){
        console.log(500).json({message: "Error while getting all recipes"});
    };
});

router.get("/recipes/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const recipe = await Recipe.findById(id);
        res.status(200).json (recipe);
    }
    catch(error) {
        console.log(500).json({message: "Error while getting a single recipe"});
    }
});

// UPDATE LATER
router.get("/recipes/:id")








module.exports = router;
