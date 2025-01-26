const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

// Connect data base:
mongoose.connect(MONGODB_URI)
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error occurred trying to connect to the database ${MONGODB_URI}`, error);
    process.exit(0);
  });

// When Ctrl + C is pressed:
process.on('SIGINT', () => {
  // Close the connection
  mongoose.connection.close()
    .finally(() => {
      console.log(`Database connection closed`);
      process.exit(0);
    })
});