const getFilter = (filterTypeArray, filterCol, filterQuery) => {
  let localFilterQuery = filterQuery;

  if (filterCol === "Date (from Article)") {
    localFilterQuery += `AND(IS_AFTER({${filterCol}}, DATETIME_PARSE('${filterTypeArray[0]}')), IS_BEFORE({${filterCol}}, DATETIME_PARSE('${filterTypeArray[1]}')))`;
  } else {
    filterTypeArray.forEach((filter, index) => {
      localFilterQuery += `FIND('${filter}',{${filterCol}})>0`;
      if (index !== filterTypeArray.length - 1) {
        localFilterQuery += ",";
      }
    });
  }
  return localFilterQuery;
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
  let localFilterQuery = filterQuery;
  if (getIsFilterActive(filterType)) {
    localFilterQuery = appendToFilter(obj, localFilterQuery, index);
    localFilterQuery = getFilter(filterType, columnLabel, localFilterQuery);
  }
  return localFilterQuery;
};

exports.useFilterType = useFilterType;
exports.isFilterInactive = isFilterInactive;
