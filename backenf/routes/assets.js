const router = require("express").Router();
let Asset = require("../models/asset.model");
const geocoder = require("../utils/geocoder");

router.route("/").get((req, res) => {
    Asset.find()
        .then((assets) => res.json(assets))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async(req, res) => {
    const { name, type, department, address, purchaseDate, purchasePrice } =
    req.body;

    try {
        const geoResult = await geocoder.geocode(address);

        if (geoResult.length === 0) {
            return res.status(400).json("Error: Unable to geocode address");
        }

        const { latitude, longitude } = geoResult[0];

        const newAsset = new Asset({
            name,
            type,
            department,
            location: {
                address,
                latitude,
                longitude,
            },
            purchaseDate,
            purchasePrice,
        });

        await newAsset.save();
        res.json("Asset added!");
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

router.route("/nearby").get(async(req, res) => {
    const { lat, lon, radius } = req.query; // radius in kilometers

    try {
        const assets = await Asset.find({
            "location.latitude": { $ne: null },
            "location.longitude": { $ne: null },
        });

        const nearbyAssets = assets.filter((asset) => {
            const distance = getDistanceFromLatLonInKm(
                lat,
                lon,
                asset.location.latitude,
                asset.location.longitude
            );
            return distance <= radius;
        });

        res.json(nearbyAssets);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;