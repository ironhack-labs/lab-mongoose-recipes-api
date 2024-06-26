const router = require("express").Router();
const Recipe = require("../models/Recipe.model.js");

router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    console.log("Retrieved recipes ->", recipes);
    res.json(recipes);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error while retrieving recipes ->", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
});

router.get("/:recipeId", async (req, res, next) => {
  const { recipeId } = req.params;
  const oneRecipe = await Recipe.findOne({ _id: recipeId });
  res.json(oneRecipe);
  try {
  } catch (error) {
    res.status(500);
    console.error("Error while retrieving recipe ->", error);
  }
});

router.post("/", async (req, res, next) => {
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
  const recipeToCreate = {
    title,
    instructions,
    level,
    ingredients,
    image,
    duration,
    isArchived,
    created,
  };

  const newRecipe = await Recipe.create(recipeToCreate);

  res.status(201).json(newRecipe);
  try {
  } catch (error) {
    es.status(500).json({ error: "Failed to add recipe" });
    console.log(error);
  }
});

router.put("/:recipeId", async (req, res, next) => {
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
    const { recipeId } = req.params;
    const recipeToUpdate = {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    };

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      recipeToUpdate,
      { new: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    es.status(500).json({ error: "Failed to update recipe" });
    console.log(error);
  }
});

router.delete("/:recipeId", async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    await Recipe.findOneAndDelete({ _id: recipeId });
    res.sendStatus(204);
  } catch (error) {
    es.status(500).json({ error: "Failed to delete recipe" });
    console.log(error);
  }
});

module.exports = router;
