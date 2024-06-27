const express = require("express");
const morgan = require("morgan");
const logger = morgan("dev");

//import function that connects to the database
const connectDB = require("./config/mongoose.connection.js");

//import routers from routes files
const recipeRouter = require("./routes/recipes.routes.js");

//import all env from env file
//now all values are accessible by referring first to process.env.NAMEOFVARIABLE
require("dotenv").config();

const app = express();

app.use(logger);
//parses request and response in case of JSON body
app.use(express.json());

//define routes
app.use("/recipes", recipeRouter);

//calling function to connect to MongoDB with Mongoose
connectDB();

app.listen(process.env.PORT, () => {
  console.clear();
  console.log("Server up and running on port: " + process.env.PORT);
});
