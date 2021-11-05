export const filterFunnel = (funnelArray, filterType, filterParam) => {
  if (filterType?.length > 0) {
    funnelArray = funnelArray.filter(item => {
      let isFiltered = false;
      item.fields[filterParam].forEach(field => {
        if (filterType?.includes(field)) {
          isFiltered = true;
        }
      })
      return isFiltered;
    })
  }
  return funnelArray;
}
