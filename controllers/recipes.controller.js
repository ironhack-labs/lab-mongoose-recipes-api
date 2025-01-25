const createError = require('http-errors');
const Recipe = require('../models/Recipe.model');

// module.exports.list = (req, res, next) => {
//     Recipe.find()  // Devuelve una promesa con todos los eventos
//     .then((recipes) => res.json(recipes)) // Si se resuelve la promesa, se envía un json con los eventos
//     .catch((error) => next(error));
// }

module.exports.create = (req, res, next) => {
  const { body } = req;
  console.log(body);
  Recipe.create(body) // Crea un evento con los datos que se pasan en el body de la petición
    .then((recipe) => res.status(201).json(recipe)) // Si se resuelve la promesa, se envía un json con el evento creado
    .catch((error) => {
        next(createError(500, 'Internal Server Error'));
    });
}