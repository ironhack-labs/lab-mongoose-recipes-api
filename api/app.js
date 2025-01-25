require('dotenv').config();
const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
    next();
})


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
/* DB init */
require('./config/db.config');




// ROUTES
//  GET  / route - This is just an example route

/* API Routes Configuration */
const routes = require('./config/routes.config.js');
app.use('/api/v1/', routes);

app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
