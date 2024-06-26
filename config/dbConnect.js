const mongoose = require("mongoose");

const DB_URI =
  process.env.MOGOOSE_URI || "mongodb://localhost/mongoose-receipes";
mongoose
  .connect(DB_URI)
  .then((db) => console.log(`Connected to ${db.connections[0].name}`))
  .catch((error) => console.error("Error connecting to DB", error));
