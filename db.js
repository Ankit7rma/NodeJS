const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDb Server");
});

db.on("error", () => {
  console.log("Error");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB Server");
});

module.exports = db;
