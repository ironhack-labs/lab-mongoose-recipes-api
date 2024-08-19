// routes/recipes.routes.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");

// POST /recipes - Create a new recipe
router.post("/recipes", async (req, res) => {
  try {
    const {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    } = req.body;
    const newRecipe = await Recipe.create({
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
