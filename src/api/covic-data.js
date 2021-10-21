const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const { format } = require("date-fns");
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
let prevOrderDisplay = "";

const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers[
  "Authorization"
] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

const setSearchParams = (params, term, fieldReset) => {
  const locParams = params;
  if (fieldReset === "true") {
    locParams.offset = "";
  }
  const capTerm = term.charAt(0).toUpperCase() + term.slice(1);
  const upperTerm = term.toUpperCase();
  const lowerTerm = term.toLowerCase();

  locParams.filterByFormula = `OR(
    FIND('${term}',{ID}),
    FIND('${term}',{File Name}),
    FIND('${lowerTerm}',{File Name}),
    FIND('${capTerm}',{File Name}),
    FIND('${upperTerm}',{File Name}),
    FIND('${term}',{Notes}),
    FIND('${lowerTerm}',{Notes}),
    FIND('${capTerm}',{Notes}),
    FIND('${upperTerm}',{Notes}),
    FIND('${term}',{URL (from ID copy)}),
    FIND('${term}',{Figure Caption}),
    FIND('${lowerTerm}',{Figure Caption}),
    FIND('${capTerm}',{Figure Caption}),
    FIND('${upperTerm}',{Figure Caption}),
    FIND('${term}',{Title}),
    FIND('${lowerTerm}',{Title}),
    FIND('${capTerm}',{Title}),
    FIND('${upperTerm}',{Title}))`;

  return locParams;
};

router.get("/", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheLogTime &&
    cacheLogTime > Date.now() - 30 * 1000 &&
    prevOffset === req.query.offset &&
    prevOrderDisplay === req.query.inOrderDisplay
  ) {
    return res.json(cachedRecords);
  }
  prevOffset = req.query.offset;
  prevOrderDisplay = req.query.inOrderDisplay;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  let params = {
    offset: req.query.offset,
    pageSize: req.query.requestAmount,
    view: req.query.inOrderDisplay === "true" ? "API [DO NOT EDIT] old-new" : "API [DO NOT EDIT]",
  };

  if (
    req.query.filterType !== "" &&
    req.query.queryType !== "search" &&
    req.query.queryType !== "filter"
  ) {
    params.filterByFormula = `${req.query.filterType}('${req.query.term}',{${req.query.fieldCol}})`;
  } else {
    const today = format(new Date(), "yyyy-MM-dd");
    params.filterByFormula = `AND(IS_AFTER({Date (from Article)}, DATETIME_PARSE('2020-01-01')), IS_BEFORE({Date (from Article)}, DATETIME_PARSE('${today}')))`;
  }

  if (req.query.queryType === "search") {
    const searchParams = setSearchParams(
      params,
      req.query.term,
      req.query.fieldReset
    );
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
      "Country (from ID Copy)",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.languageType,
      2,
      "Language (from Article)",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.publisherType,
      3,
      "Publisher (from ID Copy)",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.subjectType,
      4,
      "Subject(s) (from Article)",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.visualizationType,
      5,
      "Visualization Type",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.visualTechType,
      6,
      "Visual Technique",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.interactionType,
      7,
      "Interaction Technique",
      filterQuery,
      obj
    );
    filterQuery = filterColumn.useFilterType(
      obj.articleTechType,
      8,
      "Article Technique (from Article)",
      filterQuery,
      obj
    );

    if (obj.isDateFilter) {
      filterQuery = filterColumn.useFilterType(
        obj.dateRange,
        9,
        "Date (from Article)",
        filterQuery,
        obj
      );
    }

    filterQuery += "), 'true')";
    params.filterByFormula = filterQuery;

    if (filterColumn.isFilterInactive(obj) && !obj.isDateFilter) {
      params.filterByFormula = "";
    }
    if (req.query.fieldReset === "true") {
      params.offset = "";
    } else {
      params.offset = req.query.offset;
    }
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

let cachedFiguresRecords;
let cacheFiguresLogTime;

let prevFiguresOffset = "";
let prevFiguresQuery = "";

router.get("/figures", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheFiguresLogTime &&
    cacheFiguresLogTime > Date.now() - 30 * 1000 &&
    prevFiguresOffset === req.query.offset &&
    prevFiguresQuery === req.query.queryType
  ) {
    return res.json(cachedFiguresRecords);
  }

  prevFiguresOffset = req.query.offset;
  prevFiguresQuery = req.query.queryType;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  try {
    await axios
      .get("/", {
        params: {
          offset: req.query.offset,
          pageSize: req.query.requestAmount,
          filterByFormula: `SEARCH('${req.query.queryType}',{ID})`,
        },
      })
      .then(response => {
        cachedFiguresRecords = response.data;
        cacheFiguresLogTime = Date.now();

        return res.json(response.data);
      });
  } catch (error) {
    return next(error);
  }
});

let cachedMetaDataRecords;
let cacheMetaDataLogTime;

let prevMetaDataOffset = "";

router.get("/metadata", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheMetaDataLogTime &&
    cacheMetaDataLogTime > Date.now() - 30 * 1000 &&
    prevMetaDataOffset === req.query.offset
  ) {
    return res.json(cachedMetaDataRecords);
  }
  prevMetaDataOffset = req.query.offset;
  axios.defaults.baseURL = `${baseURL}${req.query.baseType}`;

  let params = {
    offset: req.query.offset,
    pageSize: req.query.requestAmount,
    view: "API [DO NOT EDIT]",
  };

  params.filterByFormula = `OR(FIND("Country",{Field Name})>0, 
    FIND("Source Type",{Field Name})>0, 
    FIND("Language",{Field Name})>0, 
    FIND("Publisher",{Field Name})>0, 
    FIND("Subject(s)",{Field Name})>0, 
    FIND("Visualization Type",{Field Name})>0, 
    FIND("Visual Technique",{Field Name})>0, 
    FIND("Interaction Technique",{Field Name})>0, 
    FIND("Article Technique",{Field Name})>0)`;

  try {
    await axios
      .get("/", {
        params,
      })
      .then(response => {
        cachedMetaDataRecords = response.data;
        cacheMetaDataLogTime = Date.now();

        return res.json(response.data);
      });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
