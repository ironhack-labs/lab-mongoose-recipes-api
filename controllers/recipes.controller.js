const Recipe = require("../models/recipe.model");

// Iteration 3
// Create new Recipe:
module.exports.create = (req, res, next) => {
    const { body } = req;
    Recipe.create(body)
        .then((recipe) => res.status(201).json(recipe))
        .catch((error) => next(error))
}