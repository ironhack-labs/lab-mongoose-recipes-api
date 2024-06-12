const { route } = require("../app");
const Recipe = require("../models/Recipe.model");
const router = require("express").Router();

router.post("/", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((err) => {
      console.log("here is the error -->>", err);
      res.status(500).json({ message: "Error creating recipe" });
    });
});

router.get("/", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(201).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const singleRecipe = await Recipe.findById(recipeId);
    res.status(201).json(singleRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ message: "Recepie Updated", recipe: updatedRecipe });
  } catch (error) {
    console.log("put error here>>>",error);
    res.status(500).json(error);
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;
    await Recipe.findByIdAndDelete(recipeId);
    res.status(201).json({ message: "Recipe deleted!!" });
  } catch (error) {
    console.log("here is more errors.>>>",error);
    res.status(500).json(error);
  }
});

module.exports = router;
