const Recipe = require("../models/Recipe.model.js");

const router = require("express").Router();

// ITERATION 3
router.post("/", async (req, res) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
    res.status(201).json({ message: "here's the recipe", createdRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
