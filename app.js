const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

/*Iteration 2 - Recipe Model*/

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  instructions: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: { type: [String] },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  isArchived: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

/*Iteration 3 | User Model*/

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, min: 2 },
  lastName: { type: String, required: true, min: 2},
  password: { type: String, required: true, min: 2}, 
  image: { type: String, default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg"}, 
 });

const User = mongoose.model("User", userSchema);

module.exports = User;


//  Iteration 4 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })

    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })

    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error while creating the recipe route" });
    });
});

//  Iteration 5 - Read/get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error while searching all the recipes" });
    });
});

//  Iteration 6 - Read/get a Single Recipe

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error while searching the recipe" });
    });
});

//  Iteration 7 - Update a Single Recipe
//  PUT  /recipes/:id route
 

app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error while updating the recipe" });
    });
});

//  Iteration 8 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
  .then((recipe) => {
    res.status(204).send();
  })
  .catch((error) => {
    res.status(500).json({ message: "Internal Server Error while deleting the recipe" });
  });

});

//Iteration 9 | Create a Single User

app.post("/users", (req, res) => {
  User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    image: req.body.image,
  })
  .then((createdUser) => {
    res.status(201).json(createdUser)
  })
  .catch((error) => {
    res.status(500).json({ message: "Internal Server Error while trying to create a new user"})

  });
});


// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
