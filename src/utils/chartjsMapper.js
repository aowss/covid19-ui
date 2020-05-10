/** @module chartjsMapper */

import { toDaily, topStat } from "@/utils/dataWrangler";
import { colorsMap } from "@/utils/colors";

export const topCumulativeDataPerDay = (stats, property, count, colors) => {
  var topStats = topStat(stats, property, count);
  var backgroundColors = colors != null ? colors : colorsMap(Object.keys(stats));
  return buildPieChartData(topStats, backgroundColors);
};

export const cumulativeDataPerDay = (stats, property) => {
  const locations = Object.keys(stats);
  const dates = stats[locations[0]].map(entry => entry.date);
  return dates.reduce((data, date) => {
    data[date] = {
      labels: locations,
      datasets: [
        {
          data: locations
            .flatMap(location => stats[location])
            .filter(stat => stat.date === date)
            .map(stat => stat.value[property])
        }
      ]
    };
    return data;
  }, {});
};

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
  const recoveredStats = locationStats.map(entry => entry.value.recoveries);
  return buildChartData(dates, confirmedStats, deathsStats, recoveredStats);
};

export const dailyLocationData = locationStats => {
  const dates = locationStats.map(entry => entry.date);
  const confirmedStats = toDaily(locationStats.map(entry => entry.value.confirmedCases));
  const deathsStats = toDaily(locationStats.map(entry => entry.value.deaths));
  const recoveredStats = toDaily(locationStats.map(entry => entry.value.recoveries));
  return buildChartData(dates, confirmedStats, deathsStats, recoveredStats);
};

/**
 * Transform data indexed by date to Chartjs pie chart data
 * @example <caption>Input</caption>
 * { "2020-01-22": [ { "location": "France", "value": 7 }, { "location": "Other", "value": 8 } ] }
 * @example <caption>Color Map</caption>
 * { "France":"#a9a9a9","Italy":"#778899","Other":"#bc8f8f","Spain":"#cd5c5c","United Kingdom":"#dcdcdc","United States of America":"#8b0000" }
 * @example  <caption>Output</caption>
 * { "labels": [ "France", "Other" ], "datasets": [ { "data": [7, 8], "backgroundColor": [ "#a9a9a9", "#bc8f8f" ] } ] }
 * @param {module:store.statisticsByDates} data - statistics indexed by date
 * @param {Object} colors - an object that maps the location & 'Other' to a color
 * @returns {Object} the data formatted for a Chartjs pie chart
 */
const buildPieChartData = (data, colors) => {
  console.time("buildPieChartData");
  var result = Object.keys(data).reduce((chartjsData, date) => {
    var labels = data[date].map(stat => stat.location);
    var values = data[date].map(stat => stat.value);
    var backgroundColors = labels.map(label => colors[label]);
    chartjsData[date] = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors
        }
      ]
    };
    return chartjsData;
  }, {});
  console.timeEnd("buildPieChartData");
  return result;
};

/**
 * Transform data indexed by date to Chartjs line chart data
 * @example <caption>Input</caption>
 * { "2020-01-22": [ { "location": "France", "value": 7 }, { "location": "Other", "value": 8 } ], "2020-01-23": [ { "location": "France", "value": 12 }, { "location": "Other", "value": 18 } ] }
 * @example <caption>Color Map</caption>
 * { "France":"#a9a9a9","Italy":"#778899","Other":"#bc8f8f","Spain":"#cd5c5c","United Kingdom":"#dcdcdc","United States of America":"#8b0000" }
 * @example  <caption>Output</caption>
 * { "labels": [ "2020-01-22", "2020-01-23" ], "datasets": [ { "label": "France", "backgroundColor": "#a9a9a9", "borderColor": "#a9a9a9", "fill": false, "data": [7, 12] }, { "label": "Other", "backgroundColor": "#bc8f8f", "borderColor": "#bc8f8f", "fill": false, "data": [8, 18] } ] }
 * @param {module:store.statisticsByDates} data - statistics indexed by date
 * @param {Object} colors - an object that maps the location & 'Other' to a color
 * @returns {Object} the data formatted for a Chartjs pie chart
 */
const buildLineChartData = (data, colors) => {
  console.time("buildLineChartData");
  var labels = Object.keys(data);
  var values = Object.values(data);
  var datasets = [];
  for (var i = 0; i < values[0].length; i++) {
    var country = {};
    country.label = values[0][i].location;
    country.backgroundColor = colors[country.label];
    country.borderColor = colors[country.label];
    country.fill = false;
    country.data = [];
    for (var j = 0; j < values.length; j++) {
      country.data.push(values[j][i].value)
    }
    datasets[i] = country;
  }
  console.timeEnd("buildLineChartData");
  return {
    labels: labels,
    datasets: datasets
  }
};

const buildChartData = (dates, confirmedStats, deathsStats, recoveredStats) => ({
  labels: dates,
  datasets: [
    {
      label: "deaths",
      backgroundColor: "#fc0000",
      borderColor: "#fc0000",
      borderWidth: 1,
      data: deathsStats
    },
    {
      label: "recovered",
      backgroundColor: "#006400",
      borderColor: "#006400",
      borderWidth: 1,
      data: recoveredStats
    },
    {
      label: "confirmed",
      backgroundColor: "#f7bf05",
      borderColor: "#f7bf05",
      borderWidth: 1,
      data: confirmedStats
    }
  ]
});

export {
  buildPieChartData,
  buildLineChartData
};
