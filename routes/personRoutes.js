// Import necessary modules
const express = require("express");
const Person = require("../models/person"); // Importing the Person model

// Create an Express Router
const router = express.Router();

// Route for creating a new person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Extracting data from request body
    const newPerson = new Person(data); // Creating a new Person instance with the extracted data

    // Saving the new person data to the database
    const response = await newPerson.save();
    console.log("Data saved");

    // Sending a success response with the saved data
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in POST request:", error);
    // Sending an error response if an error occurs during the process
    res.status(400).json({ message: error.message });
  }
});

// Route for fetching all persons
router.get("/", async (req, res) => {
  try {
    // Finding all persons from the database
    const data = await Person.find();
    console.log("Data fetched");

    // Sending a success response with the fetched data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in GET request:", error);
    // Sending an error response if an error occurs during the process
    res.status(400).json({ message: error.message });
  }
});

// Route for fetching persons by their work type
router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work; // Extracting work type from URL parameter

    // Checking if the work type is valid
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      // Finding persons by their work type from the database
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    }
  } catch (error) {
    // Sending an error response if an error occurs during the process
    res.status(404).json({ error: "Invalid Work Type" });
  }
});

// Route for updating a person by their ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extracting person ID from URL parameter
    const updatedPersonData = req.body; // Extracting updated person data from request body

    // Updating the person data in the database
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Returning the updated document
        runValidators: true, // Running validators on update
      }
    );

    // Checking if the person data was found and updated
    if (!response) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Sending a success response with the updated data
    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating data:", error);
    // Sending an error response if an error occurs during the process
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for deleting a person by their ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extracting person ID from URL parameter

    // Deleting the person from the database
    const response = await Person.findByIdAndDelete(personId);

    // Checking if the person data was found and deleted
    if (!response) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Sending a success response with the deleted data
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    // Sending an error response if an error occurs during the process
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; // Exporting the router for use in other files
