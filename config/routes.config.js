const express = require("express")
const router = express.Router()
const recipes = require("../controllers/recipes.controller")
const mongoose = require("mongoose");
const createError = require("http-errors")

//--ROUTES--

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
router.post("/recipes", recipes.create)

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
router.get("/recipes", recipes.list)

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
router.get("/recipes/:id", recipes.detail)

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id 

//--ERRORS--
router.use((req, res, next) => {
    next(createError(404, "Route not found. Please check it and try again."));
})

router.use((error, req, res, next) => {
    console.error(error);
    
    // Incorrect recipe id
    if(error instanceof mongoose.Error.CastError && error.message.includes("_id")) error = createError(404, "Recipes not found")
    // Validation error
    else if(error instanceof mongoose.Error.ValidationError) error = createError(404, error)
    // Server error (500):
    else if(!error.status) error = createError(500, error.message)

    const data = {}
    data.message = error.message;

    // If there are validation errors:
    if (error.errors) {
        data.errors = Object.keys(error.errors)
            .reduce((errors, eKey) => {
                // Add the error key and message to the errors object
                errors[eKey] = error.errors[eKey].message;
                return errors;
            }, {});
    }
    res.status(error.status).json(data)
})

module.exports = router;