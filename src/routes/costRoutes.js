const express = require("express");

const router = express.Router();

const costController =
require("../controllers/costController");

router.get(
    "/",
    costController.getCosts
);

module.exports = router;