const filterFunnel = (funnelArray, filterType, filterParam) => {
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

export const handleDataFunnel = (response, filterValue) => {
  let funnelArray = [];
  funnelArray.splice(0, funnelArray.length);
  funnelArray = response;
  funnelArray = filterFunnel(funnelArray, filterValue?.sourceType, 'Source Type');
  funnelArray = filterFunnel(funnelArray, filterValue?.countryType, 'Country (from ID copy)');
  funnelArray = filterFunnel(funnelArray, filterValue?.languageType, 'Language (from Article)');
  funnelArray = filterFunnel(funnelArray, filterValue?.publisherType, 'Publisher (from ID copy)');
  funnelArray = filterFunnel(funnelArray, filterValue?.subjectType, 'Subject(s) (from Article)');
  funnelArray = filterFunnel(funnelArray, filterValue?.articleTechTyp, 'Article Technique (from Article)');
  funnelArray = filterFunnel(funnelArray, filterValue?.visualizationType, 'Visualization Type');
  funnelArray = filterFunnel(funnelArray, filterValue?.visualTechType, 'Visual Technique');
  funnelArray = filterFunnel(funnelArray, filterValue?.interactionType, 'Interaction Technique');
  return funnelArray;
}
