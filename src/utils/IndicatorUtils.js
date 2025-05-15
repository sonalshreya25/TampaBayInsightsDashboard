import rawData from "../data/tampa_bay_county_indicators.json";

export const getIndicators = () => {
  return [...new Set(rawData.map((d) => d.indicator))];
};

export const getCounties = () => {
  return [...new Set(rawData.map((d) => d.county))];
};

export const getSeriesId = (indicator, county) => {
  return rawData.find(
    (d) => d.indicator === indicator && d.county === county
  )?.series_id;
};

export const getAvailableCountyIndicatorPairs = () => {
  return rawData;
};
