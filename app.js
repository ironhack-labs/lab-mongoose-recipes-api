const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const PORT = 5005;
const app = express();

require("dotenv").config();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
	.connect(MONGODB_URI)
	.then((res) =>
		console.log(
			`Connected to Mongo! Database name: "${res.connections[0].name}"`
		)
	)
	.catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
	res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res) => {
	Recipe.create({
		title: req.body.title,
		instructions: req.body.instructions,
		level: req.body.level,
		ingredients: req.body.ingredients,
		image: req.body.image,
		duration: req.body.duration,
		isArchived: req.body.isArchived,
		created: req.body.created,
	})
		.then((createdRecipe) => {
			res.status(201).json(createdRecipe);
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.json({ message: "Error when trying to create the recipe." });
		});
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
	Recipe.find({})
		.then((allRecipes) => {
			res.status(200).json(allRecipes);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: "Error when trying to get the recipes." });
		});
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
	const { id } = req.params;
	Recipe.findById(id)
		.then((recipe) => {
			res.status(200).json(recipe);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Error when trying to get the recipe." });
		});
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
	const { id } = req.params;

	const reqBody = {
		title: req.body.title,
		instructions: req.body.instructions,
		level: req.body.level,
		ingredients: req.body.ingredients,
		image: req.body.image,
		duration: req.body.duration,
		isArchived: req.body.isArchived,
		created: req.body.created,
	};

	Recipe.findByIdAndUpdate(id, reqBody, { new: true })
		.then((updatedRecipe) => {
			res.status(200).json(updatedRecipe);
		})
		.catch((error) => {
			res.status(500).json({ error: "Failed to update the recipe" });
		});
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
	const { id } = req.params;

	Recipe.findByIdAndDelete(id)
		.then((results) => {
			res.status(204).json({ message: "The recipe has been deleted" });
		})
		.catch((error) => {
			res.status(500).json({ error: "Failed to delete the recipe" });
		});
});

// Start the server
app.listen(PORT, () =>
	console.log(`My first app listening on port http://localhost:${PORT}`)
);

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
