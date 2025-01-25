const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();  // Crea los enrutamientos para abrir lo que le digamos después del / en la url
const createError = require('http-errors');
const recipes = require('../controllers/recipes.controller');

router.post('/recipes', recipes.create);
router.get('/recipes', recipes.list); // el param debe estar en plural siempre
router.get('/recipes/:id', recipes.detail);
router.patch('/recipes/:id', recipes.update);
router.delete('/recipes/:id', recipes.delete);


/* Middleware para rutas no encontradas (404) */
router.use((req, res, next) => {
  next(createError(404, 'Route not found'));  // Si no encuentra la ruta, crea un error 404
});

/* Middleware de manejo de errores */
router.use((error, req, res, next) => { // error es un objeto que se pasa como parámetro en next(error)
  console.error(error);
  if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) error = createError(404, 'Resource not found');
  else if (error instanceof mongoose.Error.ValidationError) error = createError(400, error.message); // Si es un error de validación de mongoose, se establece como 400
  else if (!error.status) error = createError(500, error.message); // Si es un error genérico o inesperado sin estado, se establece como 500.
  console.error(error);
  
  const data = {};
  data.message = error.message;
  if (error.errors) { // Si hay errores, se crea un objeto con los mensajes de error
    data.errors = Object.keys(error.errors) // Object.keys devuelve un array con las propiedades de un objeto
    .reduce((errors, errorKey) => { // reduce recorre un array y devuelve un único valor
      errors[errorKey] = error.errors[errorKey].message;  // Se crea un objeto con las propiedades de error y sus mensajes
      return errors;  
    }, {});
  }
  res.status(error.status).json(data);
});


module.exports = router;