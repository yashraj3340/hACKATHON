const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    department: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number },
    },
    purchaseDate: { type: Date, required: true },
    purchasePrice: { type: Number, required: true },
    currentValue: { type: Number },
    lastMaintenanceDate: { type: Date },
    nextMaintenanceDate: { type: Date },
    status: {
        type: String,
        enum: ["Active", "In Maintenance", "Retired"],
        default: "Active",
    },
}, {
    timestamps: true,
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;