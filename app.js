const express = require("express");
const logger = require("morgan");
require("dotenv").config()

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
require("./config/db.config")


// ROUTES
const routes = require("./config/routes.config")
app.use("/api/v1", routes)



// Start the server
const port = Number(process.env.port || 3000)
app.listen(port, () => console.log(`My first app listening on port ${port}!`));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
