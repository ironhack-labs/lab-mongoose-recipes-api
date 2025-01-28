require("dotenv").config(); 
const express = require("express");
const logger = require("morgan");
const { connectToDB } = require("./config/db.config"); 

const recipesRoutes = require("./recipes.routes"); 

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


connectToDB();

app.use("/recipes", recipesRoutes);


app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
