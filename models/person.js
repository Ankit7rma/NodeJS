const mongoose = require("mongoose");

// Define schema for Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  work: { type: String, required: true, enum: ["chef", "waiter", "manager"] },
  mobile: { type: String, required: true },
  Salary: { type: Number, required: true },
  Address: { type: String },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create model for Person schema
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
