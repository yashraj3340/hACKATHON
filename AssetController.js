// controllers/AssetController.js
const Asset = require("../models/Asset");

exports.createAsset = async(req, res) => {
    try {
        const asset = new Asset(req.body);
        await asset.save();
        res.status(201).json(asset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAssets = async(req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAssetById = async(req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) return res.status(404).json({ error: "Asset not found" });
        res.status(200).json(asset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateAsset = async(req, res) => {
    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!asset) return res.status(404).json({ error: "Asset not found" });
        res.status(200).json(asset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteAsset = async(req, res) => {
    try {
        const asset = await Asset.findByIdAndDelete(req.params.id);
        if (!asset) return res.status(404).json({ error: "Asset not found" });
        res.status(200).json({ message: "Asset deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};