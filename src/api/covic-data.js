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

const setSearchParams = (term) => {
  const newTerm = term.replace("'", "’").trim();
  
  let wordsSplit = newTerm;
  if (wordsSplit.length !== 0) {
    wordsSplit = wordsSplit.split(' ');
    for (let i = 0; i < wordsSplit.length; i++) {
      wordsSplit[i] = wordsSplit[i][0].toUpperCase() + wordsSplit[i].substr(1);
    }
    wordsSplit = wordsSplit.join(' ');
  }
  
  const capTerm = newTerm.charAt(0).toUpperCase() + newTerm.slice(1);
  const upperTerm = newTerm.toUpperCase();
  const lowerTerm = newTerm.toLowerCase();

  const locParams = `IF(OR(
    FIND('${newTerm}',{ID}),
    FIND('${newTerm}',{File Name}),
    FIND('${lowerTerm}',LOWER({File Name})),
    FIND('${capTerm}',{File Name}),
    FIND('${wordsSplit}',{File Name}),
    FIND('${upperTerm}',UPPER({File Name})),
    FIND('${newTerm}',{Notes}),
    FIND('${lowerTerm}',LOWER({Notes})),
    FIND('${capTerm}',{Notes}),
    FIND('${wordsSplit}',{Notes}),
    FIND('${upperTerm}',UPPER({Notes})),
    FIND('${newTerm}',{URL (from ID copy)}),
    FIND('${newTerm}',{Figure Caption}),
    FIND('${lowerTerm}',LOWER({Figure Caption})),
    FIND('${capTerm}',{Figure Caption}),
    FIND('${wordsSplit}',{Figure Caption}),
    FIND('${upperTerm}',UPPER({Figure Caption})),
    FIND('${newTerm}',{Title 2}),
    FIND('${lowerTerm}',LOWER({Title 2})),
    FIND('${capTerm}',{Title 2}),
    FIND('${wordsSplit}',{Title 2}),
    FIND('${upperTerm}',UPPER({Title 2}))), 'true')`;

  return locParams;
};

const appendToFilterQuery = (filterCol) => {
  return filterCol !== '' ? `${filterCol},` : '';
}

router.get("/", limiter, speedLimiter, async (req, res, next) => {
  if (
    cacheLogTime &&
    cacheLogTime > Date.now() - 30 * 1000 &&
    prevOffset === req.query.offset &&
    prevOrderDisplay === req.query.inOrderDisplay &&
    cachedRecords?.length > 0
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

  if (req.query.queryType === "filter" || req.query.queryType === "search") {
    const obj = JSON.parse(req.query.filterValue);
    
    const queryObject = {
      'sourceTypeQuery': '',
      'countryTypeQuery': '',
      'languageTypeQuery': '',
      'publisherTypeQuery': '',
      'subjectTypeQuery': '',
      'visualizationTypeQuery': '',
      'visualTechniqueTypeQuery': '',
      'interactionTechniquerTypeQuery': '',
      'articleTechniqueTypeQuery': '',
      'dataTypeQuery': '',
    }

    queryObject['sourceTypeQuery'] = filterColumn.useFilterType(
      obj.sourceType,
      0,
      "Source Type",
      queryObject['sourceTypeQuery'],
      obj
    );
    queryObject['countryTypeQuery'] = filterColumn.useFilterType(
      obj.countryType,
      1,
      "Country (from ID Copy)",
      queryObject['countryTypeQuery'],
      obj
    );
    queryObject['languageTypeQuery'] = filterColumn.useFilterType(
      obj.languageType,
      2,
      "Language (from Article)",
      queryObject['languageTypeQuery'],
      obj
    );
    queryObject['publisherTypeQuery'] = filterColumn.useFilterType(
      obj.publisherType,
      3,
      "Publisher (from ID Copy)",
      queryObject['publisherTypeQuery'],
      obj
    );
    queryObject['subjectTypeQuery'] = filterColumn.useFilterType(
      obj.subjectType,
      4,
      "Subject(s) (from Article)",
      queryObject['subjectTypeQuery'],
      obj
    );
    queryObject['visualizationTypeQuery'] = filterColumn.useFilterType(
      obj.visualizationType,
      5,
      "Visualization Type",
      queryObject['visualizationTypeQuery'],
      obj
    );
    queryObject['visualTechniqueTypeQuery'] = filterColumn.useFilterType(
      obj.visualTechType,
      6,
      "Visual Technique",
      queryObject['visualTechniqueTypeQuery'],
      obj
    );
    queryObject['interactionTechniquerTypeQuery'] = filterColumn.useFilterType(
      obj.interactionType,
      7,
      "Interaction Technique",
      queryObject['interactionTechniquerTypeQuery'],
      obj
    );
    queryObject['articleTechniqueTypeQuery'] = filterColumn.useFilterType(
      obj.articleTechType,
      8,
      "Article Technique (from Article)",
      queryObject['articleTechniqueTypeQuery'],
      obj
    );

    if (obj.isDateFilter) {
      queryObject['dataTypeQuery'] = filterColumn.useFilterType(
        obj.dateRange,
        9,
        "Date (from Article)",
        queryObject['dataTypeQuery'],
        obj
      );
    }

    params.filterByFormula = 'AND(';
    Object.keys(queryObject).forEach(key => {
      params.filterByFormula += appendToFilterQuery(queryObject[key]);
    })
    params.filterByFormula += setSearchParams(req.query.searchValue);
    params.filterByFormula += ')';
    params.filterByFormula = params.filterByFormula.replace(',)', ')');

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
          filterByFormula: `IF(OR(FIND('${req.query.queryType}',{ID}), FIND('${req.query.queryType}',{Article})), 'true')`,
          view: "Figures Grid"
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
