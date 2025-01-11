const router = require("express").Router();
const recipeModel = require("../models/Recipe.model");

//Add a Recipe
router.post("/", async (req, res) => {
  try {
    const newReciepe = await recipeModel.create(req.body);
    console.log("Here is your new recipe", newReciepe);
    res.status(201).json({ newReciepe: newReciepe });
  } catch (error) {
    console.log("Error creating recipe", error);
    res.status(500).json(error);
  }
});

//Get all Recipes
router.get("/", async (req, res) => {
  try {
    const allRecipes = await recipeModel.find();
    console.log("Here are your recipes", allRecipes);
    res.status(200).json({ allReciepes: allRecipes });
  } catch (error) {
    console.log("Error getting recipes", error);
    res.status(500).json(error);
  }
});

//Get one Recipe by Id
router.get("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const oneRecipe = await recipeModel.findById(recipeId);
    console.log("Here is your recipe", oneRecipe);
    res.status(200).json({ oneRecipe: oneRecipe });
  } catch (error) {
    console.log("Error getting recipes", error);
    res.status(500).json(error);
  }
});

//Update one Recipe by Id
router.put("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      recipeId,
      req.body
    );
    console.log("Here is your updated recipe", updatedRecipe);
    res.status(200).json({ updatedRecipe: updatedRecipe });
  } catch (error) {
    console.log("Error getting recipes", error);
    res.status(500).json(error);
  }
});

//Delete Recipe
router.delete("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await recipeModel.findByIdAndDelete(recipeId);
    console.log("Here is your deleted recipe", deletedRecipe);
    res.status(204).json({ deletedRecipe: deletedRecipe });
  } catch (error) {
    console.log("Error getting recipes", error);
    res.status(500).json(error);
  }
});

module.exports = router;
