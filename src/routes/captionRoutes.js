const express = require("express");

const router = express.Router();

const captionController =
require("../controllers/captionController");

router.post(
    "/generate",
    captionController.generate
);

module.exports = router;