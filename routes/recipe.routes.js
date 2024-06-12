const router = require("express").Router();

const Recipe = require("../models/books.model")


// Create New Recipe
router.post("/create", async(req, res) => {
    try {
        const createRecipe = await Recipe.create(req.body)
        res.json(createRecipe)
        
    } catch (error) {
         console.log(error)
         res.status(500).json(error)
    }
})

// Get All Recipe

router.get("/", async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})