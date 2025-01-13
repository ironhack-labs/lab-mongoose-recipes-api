const app = require("express").Router();
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");

app.post("/recipes", (req, res, next) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
  })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("Error while creating the Recipe", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = app;
