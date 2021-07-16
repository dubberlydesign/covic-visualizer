const express = require("express");

const covicData = require("./covic-data");

const router = express.Router();

router.use("/covic-data", covicData);

module.exports = router;
