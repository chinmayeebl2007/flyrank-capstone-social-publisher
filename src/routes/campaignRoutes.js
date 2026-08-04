const express = require("express");
const campaignController = require("../controllers/campaignController");

const router = express.Router();

router.post("/", campaignController.createCampaign);

router.get("/", campaignController.getAllCampaigns);

router.get("/:id", campaignController.getCampaignById);

router.put("/:id", campaignController.updateCampaign);

router.post("/:id/schedule", campaignController.scheduleCampaign);

router.delete("/:id", campaignController.deleteCampaign);

module.exports = router;