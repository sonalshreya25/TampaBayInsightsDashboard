import rawData from "../data/tampa_bay_county_indicators.json";

//    Returns a unique list of indicator names from the dataset.
export const getIndicators = () => {
  return [...new Set(rawData.map((d) => d.indicator))];
};
//Returns a unique list of county names from the dataset.
export const getCounties = () => {
  return [...new Set(rawData.map((d) => d.county))];
};
// Given an indicator and county, returns the corresponding series_id. Returns undefined if no match is found.
export const getSeriesId = (indicator, county) => {
  return rawData.find(
    (d) => d.indicator === indicator && d.county === county
  )?.series_id;
};
// Returns the full list of { indicator, county, series_id } entries.
export const getAvailableCountyIndicatorPairs = () => {
  return rawData;
};
