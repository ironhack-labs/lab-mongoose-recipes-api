const { eventNames } = require("../app");
const Recipe = require("../models/Recipe.model");

const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { body } = req;
  console.log(body);
  Recipe.create(body)
    .then((recipe) => res.status(201).json(recipe))
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, "Recipe not found"));
      else res.json(recipe);
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  
  Recipe.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Recipe not found'))
      else res.status(201).json(recipe);
    })
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then((event) => {
      if (!event) next(createError(404, 'Recipe not found'))
      else res.status(204).send();
    })
    .catch((error) => next(error))
}
