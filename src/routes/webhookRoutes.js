const express = require("express");

const router = express.Router();

const webhookController =
require("../controllers/webhookController");

router.post(
    "/",
    webhookController.receive
);

module.exports = router;