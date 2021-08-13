const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const filterColumn = require("../util/filterColumn");

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

let prevOffset = "";

const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers[
  "Authorization"
] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

const setSearchParams = (params, term) => {
  const locParams = params;
  locParams.offset = "";
  locParams.filterByFormula = `OR(
    FIND('${term}',{ID})>0,
    FIND('${term}',{Student Coder})>0,
    FIND('${term}',{Title})>0,
    FIND('${term}',{URL})>0,
    FIND('${term}',{Publisher})>0,
    FIND('${term}',{Language})>0,
    FIND('${term}',{Country})>0,
    FIND('${term}',{Source Type})>0,
    FIND('${term}',{Date Recorded})>0,
    FIND('${term}',{Date})>0,
    FIND('${term}',{Data Source})>0,
    FIND('${term}',{Article Technique})>0,
    FIND('${term}',{Subject(s)})>0,
    FIND('${term}',{Notes})>0)`;

  return locParams;
};

router.get("/", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheLogTime &&
    cacheLogTime > Date.now() - 30 * 1000 &&
    prevOffset === req.query.offset
  ) {
    return res.json(cachedRecords);
  }
  prevOffset = req.query.offset;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  let params = {
    offset: req.query.offset,
    pageSize: req.query.requestAmount,
    view: "Gallery",
  };

  if (
    req.query.filterType !== "" &&
    req.query.queryType !== "search" &&
    req.query.queryType !== "filter"
  ) {
    params.filterByFormula = `${req.query.filterType}('${req.query.term}',{${req.query.fieldCol}})`;
  } else {
    params.filterByFormula = "";
  }

  if (req.query.queryType === "search") {
    const searchParams = setSearchParams(params, req.query.term);
    params = { ...params, searchParams };

    if (req.query.term === "") {
      params.filterByFormula = "";
    }
  }

  if (req.query.queryType === "filter") {
    const obj = JSON.parse(req.query.term);
    let filterQuery = "IF(OR(";

    filterQuery = filterColumn.useFilterType(
      obj.sourceType,
      0,
      "Source Type",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.countryType,
      1,
      "Country",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.languageType,
      2,
      "Language",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.publisherType,
      3,
      "Publisher",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.subjectType,
      4,
      "Subject(s)",
      filterQuery,
      obj
    );

    if (obj.isDateFilter) {
      filterQuery = filterColumn.useFilterType(
        obj.dateRange,
        5,
        "Date",
        filterQuery,
        obj
      );
    }

    filterQuery += "), 'true')";
    params.filterByFormula = filterQuery;
    if (filterColumn.isFilterInactive(obj) && !obj.isDateFilter) {
      params.filterByFormula = "";
    }

    params.offset = "";
  }

  try {
    await axios
      .get("/", {
        params,
      })
      .then(response => {
        cachedRecords = response.data;
        cacheLogTime = Date.now();
        return res.json(response.data);
      });
  } catch (error) {
    return next(error);
  }
});

router.get("/figures", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheLogTime &&
    cacheLogTime > Date.now() - 30 * 1000 &&
    prevOffset === req.query.offset
  ) {
    return res.json(cachedRecords);
  }

  prevOffset = req.query.offset;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  try {
    await axios
      .get("/", {
        params: {
          offset: req.query.offset,
          pageSize: req.query.requestAmount,
        },
      })
      .then(response => {
        cachedRecords = response.data;
        cacheLogTime = Date.now();

        return res.json(response.data);
      });
  } catch (error) {
    return next(error);
  }
});

router.get("/metadata", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheLogTime &&
    cacheLogTime > Date.now() - 30 * 1000 &&
    prevOffset === req.query.offset
  ) {
    return res.json(cachedRecords);
  }
  prevOffset = req.query.offset;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  let params = {
    offset: req.query.offset,
    pageSize: req.query.requestAmount,
    view: "Grid view",
  };

  params.filterByFormula =
    'OR(FIND("Country",{Field Name})>0, FIND("Source Type",{Field Name})>0, FIND("Language",{Field Name})>0, FIND("Publisher",{Field Name})>0, FIND("Subject(s)",{Field Name})>0)';

  try {
    await axios
      .get("/", {
        params,
      })
      .then(response => {
        cachedRecords = response.data;
        cacheLogTime = Date.now();

        return res.json(response.data);
      });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
