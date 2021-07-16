const express = require("express");

const covicData = require("./covic-data");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "api index",
  });
});

router.use("/covic-data", covicData);

module.exports = router;
