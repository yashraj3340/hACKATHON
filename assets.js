// routes/assets.js
const express = require("express");
const router = express.Router();
const AssetController = require("../controllers/AssetController");

router.post("/", AssetController.createAsset);
router.get("/", AssetController.getAssets);
router.get("/:id", AssetController.getAssetById);
router.put("/:id", AssetController.updateAsset);
router.delete("/:id", AssetController.deleteAsset);

module.exports = router;