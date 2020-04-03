import { toDaily } from "./dataLoader";

export const cumulativeData = stats =>
  Object.keys(stats).reduce((data, location) => {
    data[location] = cumulativeLocationData(stats[location]);
    return data;
  }, {});

export const dailyData = stats =>
  Object.keys(stats).reduce((data, location) => {
    data[location] = dailyLocationData(stats[location]);
    return data;
  }, {});

export const cumulativeLocationData = locationStats => {
  const dates = locationStats.map(entry => entry.date);
  const confirmedStats = locationStats.map(entry => entry.value.confirmedCases);
  const deathsStats = locationStats.map(entry => entry.value.deaths);
  return buildChartData(dates, confirmedStats, deathsStats);
};

export const dailyLocationData = locationStats => {
  const dates = locationStats.map(entry => entry.date);
  const confirmedStats = toDaily(
    locationStats.map(entry => entry.value.confirmedCases)
  );
  const deathsStats = toDaily(locationStats.map(entry => entry.value.deaths));
  return buildChartData(dates, confirmedStats, deathsStats);
};

const buildChartData = (dates, confirmedStats, deathsStats) => ({
  labels: dates,
  datasets: [
    {
      label: "confirmed",
      backgroundColor: "#f7bf05",
      borderColor: "#f7bf05",
      borderWidth: 1,
      data: confirmedStats
    },
    {
      label: "deaths",
      backgroundColor: "#fc0000",
      borderColor: "#fc0000",
      borderWidth: 1,
      data: deathsStats
    }
  ]
});
