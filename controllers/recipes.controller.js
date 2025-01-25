const createError = require('http-errors');
const Recipe = require('../models/Recipe.model');

module.exports.create = (req, res, next) => {
  const { body } = req;
  console.log(body);
  Recipe.create(body) 
    .then((recipe) => res.status(201).json(recipe))
    .catch((error) => {
        console.error(error);
        next(createError(500, 'Internal Server Error'));
    });
}

module.exports.list = (req, res, next) => {
    Recipe.find()  
    .then((recipes) => res.status(200).json(recipes)) 
    .catch((error) => {
        console.error(error);
        next(createError(500, 'Internal Server Error'));
    });
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) next(createError(404, 'Recipe not found'))
        else res.status(200).json(recipe);
      })
      .catch((error) => {
        console.error(error);
        next(createError(500, 'Internal Server Error'));
      });  
}

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  
  Recipe.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Recipe not found'))
      else res.status(200).json(recipe);
    })
    .catch((error) => {
      console.error(error);
      next(createError(500, 'Internal Server Error'));
    }); 
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then((recipe) => {
      if (!recipe) next(createError(404, 'Recipe not found'))
      else res.status(204).send();
    })
    .catch((error) => {
      console.error(error);
      next(createError(500, 'Internal Server Error'));
    }); 
}