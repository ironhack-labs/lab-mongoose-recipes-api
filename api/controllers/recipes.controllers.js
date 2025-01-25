const Recipe = require('../../models/recipe.model');
const createError = require('http-errors');


module.exports.create = (req, res, next) => {
    const { body } = req;
    Recipe.create(body)
        .then((recipe) => res.satatus(201).json(recipe))
        .catch((error) => next(error));

}

module.exports.list = (req, res, next) => {
    Recipe.find()
    .then((recipe) => res.status(201).json(recipe))
    .catch((error) => next(error));
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params;
    Recipe.findbyId(id)
    .then((recipe) => {
        if(!recipe) next(createError(500, 'Recipe not found'))
        else res.json(recipe);
    })
    .catch((error) => next(error));
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;
    const{ body } = req;

    Recipe.findByIdAndUpdate(id, body, { runValidators: true, new:true})
    .then((recipe) => {
        if(!recipe) next(createError(500, 'Recipe not found'))
        else res.status(201).json(recipe);
    })
    .catch((error) => next(error));
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndUpdate(id)
    .then((recipe) => {
        if(!recipe) next(createError(500, 'Recipe not found'))
        else res.status(204).send();
    })
    .catch((error) => next(error))
}
