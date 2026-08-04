const express = require("express");

const publishController = require("../controllers/publishController");

const router = express.Router();

router.post(
    "/:id",
    publishController.publishCampaign
);

module.exports = router;