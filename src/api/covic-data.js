const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

axios.defaults.baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Articles/`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers[
  "Authorization"
] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: 500,
});

const router = express.Router();

let cachedRecords;
let cacheLogTime;

router.get("/", limiter, speedLimiter, async (req, res, next) => {
  if (cacheLogTime && cacheLogTime > Date.now() - 30 * 1000) {
    console.log("returning cached data");
    return res.json(cachedRecords);
  }

  try {
    await axios
      .get("/", { params: { offset: "", pageSize: 20 } })
      .then(response => {
        cachedRecords = response.data.records;
        cacheLogTime = Date.now();
        return res.json(response.data.records);
      });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
