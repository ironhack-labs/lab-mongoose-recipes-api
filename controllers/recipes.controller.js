const createError = require('attp-errors');
const Recipe = require('../models/Recipe.model');

module.exports.create = (req, res, next) => {
    const {body} = req;
    Recipe.create(body)
        .then((recipe) => res.status(201). json(recipe))
        .cath((error) => next(error));
}

module.exports.list = (req, res, next)  => {
    Recipe.find()
        .then((recipes) => res.json(recipes))
        .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
    const {id} = req.params;
    Recipe.findById(id)
        .then ((recipe) =>{
            if (!recipe) next(createError(404, 'Event not found'))
                else res.json(recipe);
        })
        .catch((error) => next(error));  
}

module.exports.detail = (req,res, next) => {
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
        if (!recipe) next(createError(404, 'Recipe not found'))
        else res.status(204).send();
      })
      .catch((error) => next(error))
  }