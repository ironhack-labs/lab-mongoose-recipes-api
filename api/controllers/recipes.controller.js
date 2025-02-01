const createError = require('http-errors');
const Recipe = require('../models/Recipe.model');

module.exports.list = (req, res, next) => {
  Recipe.find()
    .then((events) => res.json(events))
    .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
  const { body } = req;
  Recipe.create(body)
    .then((event) => res.status(201).json(event))
    .catch((error) => next(error));
}


module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Event not found'))
      else res.json(recipe);
    })
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Event not found'))
      else res.status(204).send();
    })
    .catch((error) => next(error))
}

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  
  Recipe.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Event not found'))
      else res.status(201).json(recipe);
    })
    .catch((error) => next(error));
}