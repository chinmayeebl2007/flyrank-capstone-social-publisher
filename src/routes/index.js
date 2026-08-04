const express = require("express");

const campaignRoutes = require("./campaignRoutes");

const router = express.Router();

router.use("/campaigns", campaignRoutes);

module.exports = router;