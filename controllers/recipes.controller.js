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