require("dotenv").config();
const express = require("express");
const logger = require("morgan");

/* DB init */
require("./config/db.config");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

// ROUTES
//  GET  / route - This is just an example route
const routes = require("./config/routes.config");
app.use('/api/v1/', routes)

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
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.info(`Application running at port ${port}`));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
