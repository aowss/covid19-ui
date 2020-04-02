import { confirmed, deaths, toDaily } from "./dataLoader";

export const cumulativeData = stats => {
  const locations = Object.keys(stats);
  const dates = stats[locations[0]].map(entry => entry.date);
  return locations.reduce((data, location) => {
    const confirmedStats = confirmed(stats, location);
    const deathsStats = deaths(stats, location);
    data[location] = buildChartData(dates, confirmedStats, deathsStats);
  }, {});
};

export const cumulativeCountryData = countryStats => {
  const dates = countryStats.map(entry => entry.date);
  const confirmedStats = countryStats.map(entry => entry.value.confirmedCases);
  const deathsStats = countryStats.map(entry => entry.value.deaths);
  return buildChartData(dates, confirmedStats, deathsStats);
};

export const dailyCountryData = countryStats => {
  const dates = countryStats.map(entry => entry.date);
  const confirmedStats = toDaily(
    countryStats.map(entry => entry.value.confirmedCases)
  );
  const deathsStats = toDaily(countryStats.map(entry => entry.value.deaths));
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
