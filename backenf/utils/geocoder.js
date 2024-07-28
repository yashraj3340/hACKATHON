const NodeGeocoder = require("node-geocoder");

const options = {
    provider: "opencage",
    apiKey: process.env.GEOCODER_API_KEY, // Make sure to set this in your .env file
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;