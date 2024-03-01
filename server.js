const express = require("express");
const db = require("./db.js");
const app = express();

const personRoutes = require("./routes/personRoutes.js");
const bodyParser = require("body-parser");
require("dotenv").config();
// Use bodyParser middleware to parse incoming request bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/person", personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
