const Recipe = require("../models/recipe.model");
const createError = require("http-errors")

// Iteration 3
// Create new Recipe:
module.exports.create = (req, res, next) => {
    const { body } = req;
    Recipe.create(body)
        .then((recipe) => res.status(201).json(recipe))
        .catch((error) => next(error))
}

// Iteration 4
// Get Recipes List
module.exports.list = (req, res, next) => {
    Recipe.find()
        .then((recipes) => res.json(recipes))
        .catch((error) => next(error));
}

// Iteration 5
// Get Recipe Detail (:Id)
module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then((recipe) => {
            // If recipe not found:
            if(!recipe) next(createError(404, "Recipe not found"))
            // If it exists, return recipe json
            else res.json(recipe)
        })
        .catch((error) => next(error))
}

//Iteration 6
// Update Recipe
module.exports.update = (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    // Update the recipe applying validations and return a new recipe
    Recipe.findByIdAndUpdate(id, body, { runValidators: true, new: true })
        .then((recipe) => {
            if(!recipe) next(createError(404, "Update failed. Recipe not found"))
            else res.status(201).json(recipe)
        })
        .catch((error) => next(error))
}

//Iteration 7
// Delete Recipe
module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
        .then((recipe) => {
            if(!recipe) next(createError(404, "Delete failed. Recipe not found"))
            else res.status(204).send()
        })
        .catch((error) => next(error))
}