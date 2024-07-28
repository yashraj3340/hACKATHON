const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    // ... other fields ...
    location: {
        address: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number },
    },
    // ... other fields ...
}, {
    timestamps: true,
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;