// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const assets = require("./routes/assets");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/assetmanagement");

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/assets", assets);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});