const Recipe = require("../models/Recipe.model");

const router = require("express").Router();

//  GET  / route - This is just an example route

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const queryGetAll = {};
      const recipes = await Recipe.find(queryGetAll);
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res, next) => {
    try {
      const reqRecipe = {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
      };

      const createdRecipe = await Recipe.create(reqRecipe);
      res.status(201).json(createdRecipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findOneById(id);
      res.send(200).json(recipe);
    } catch (error) {
      res.send(500).json({ message: error.message });
    }
  })
  .put(async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedRecipe = {
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        duration: req.body.duration,
      };
      const recipe = await Recipe.findByIdAndUpdate(id, updatedRecipe);
      res.send(202).json(recipe);
    } catch (error) {
      res.send(500).json({ message: error.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findOneAndDelete(id);
      res.send(204).json(recipe);
    } catch (error) {
      res.send(500).json({ message: error.message });
    }
  });

module.exports = router;
