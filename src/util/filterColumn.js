const addToSpecificFilter = (filterCol) => {
  switch(filterCol) {
    default:
      break;
  }
}

const getFilter = (filterTypeArray, filterCol, filterQuery) => {
  let localFilterQuery = filterQuery = ',' ? '' : filterQuery;
  const beforeConvert = new Date(filterTypeArray[0]);
  const afterConvert = new Date(filterTypeArray[1]);
  if (filterCol === "Date (from Article)") {
    localFilterQuery += `AND(IS_AFTER({${filterCol}}, DATETIME_PARSE('${new Date(beforeConvert.setDate(beforeConvert.getDate() - 1))}')), IS_BEFORE({${filterCol}}, DATETIME_PARSE('${new Date(afterConvert.setDate(afterConvert.getDate() + 1))}')))`;
  } else {
    filterTypeArray.forEach((filter, index) => {
      localFilterQuery += `FIND('${filter}',{${filterCol}})>0`;
      if (index !== filterTypeArray.length - 1) {
        localFilterQuery += ",";
      }
    });
  }
  return `IF(OR(${localFilterQuery}), 'true')`;
};

const getIsFilterActive = filterTypeArray => filterTypeArray.length > 0;

const appendToFilter = (obj, filterQuery, place) => {
  let isFiltersPrev = false;
  let localFilterQuery = filterQuery;
  const isActiveArray = [];
  Object.keys(obj).forEach((key, index) => {
    if (place > index) {
      isActiveArray.push(obj[key].length > 0);
    }
  });

  isFiltersPrev = isActiveArray.some(e => e === true);

  if (isFiltersPrev) {
    localFilterQuery += ",";
  }

  return localFilterQuery;
};

const isFilterInactive = obj => {
  const isInActiveArray = [];
  Object.keys(obj).forEach(key => {
    if (key === "dateRange" || key === "isDateFilter") {
      isInActiveArray.push(true);
    } else {
      isInActiveArray.push(obj[key].length === 0);
    }
  });

  return isInActiveArray.every(e => e === true);
};

const useFilterType = (filterType, index, columnLabel, filterQuery, obj) => {
  let localFilterQuery = filterQuery = ',' ? '' : filterQuery;
  if (getIsFilterActive(filterType)) {
    localFilterQuery = appendToFilter(obj, localFilterQuery, index);
    localFilterQuery = getFilter(filterType, columnLabel, localFilterQuery);
  }
  return localFilterQuery;
};

exports.useFilterType = useFilterType;
exports.isFilterInactive = isFilterInactive;
