const express = require("express");

const router = express.Router();

const campaignRoutes = require("./campaignRoutes");
const imageRoutes = require("./imageRoutes");
const captionRoutes = require("./captionRoutes");
const publishRoutes = require("./publishRoutes");
const webhookRoutes = require("./webhookRoutes");
const costRoutes = require("./costRoutes");

router.use("/campaigns", campaignRoutes);

router.use("/images", imageRoutes);

router.use("/captions", captionRoutes);

router.use("/publish", publishRoutes);

router.use("/webhooks", webhookRoutes);

router.use("/costs", costRoutes);

module.exports = router;