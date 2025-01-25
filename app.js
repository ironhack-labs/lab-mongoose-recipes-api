require('dotenv').config(); // Mira en la raíz de la app y busca el fichero .env y carga las variables de entorno de su interior
const express = require("express");
const logger = require("morgan");

/* DB init */
require('./config/db.config');  // Con esto se conecta a la base de datos

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
app.use((req, res, next) => { // req es de request (lleva toda la info del http) y res de response
    next(); // Si no pongo next no se ejecuta el siguiente middleware
})


// ROUTES
//  GET  / route - This is just an example route
// app.get('/', (req, res) => {
//     res.send("<h1>LAB | Express Mongoose Recipes</h1>");
// });


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
const routes = require('./config/routes.config');
app.use('/api/v1/', routes);

//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
const port = Number(process.env.PORT || 3001);  // port es un STRING, con Number se convierte || esto se usa en caso de que PORT no esté definido, aunq tb vale '??'
app.listen(port, () => console.info(`Application running at port ${port}`));


//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
