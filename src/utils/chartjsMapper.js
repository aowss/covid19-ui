import { toDaily } from "./dataWrangler";
import { colorsMap } from "./colors";

export const topCumulativeDataPerDay = (stats, property, count, colors) => {
  const locations = Object.keys(stats);
  const dates = stats[locations[0]].map(entry => entry.date);
  const data = dates.reduce((data, date) => {
    data[date] = locations
      .flatMap(location => stats[location])
      .filter(stat => stat.date === date)
      .map(stat => stat.value[property])
      .map((value, index) => ({
        location: locations[index],
        value: value
      }));
    return data;
  }, {});

  Object.values(data).forEach(stats => stats.sort((a, b) => b.value - a.value));

  var topStats = dates.reduce((topData, date) => {
    const top = data[date].slice(0, count);
    const sum = data[date]
      .slice(count)
      .reduce((total, stat) => total + stat.value, 0);
    top.push({
      location: "Other",
      value: sum
    });
    topData[date] = top;
    return topData;
  }, {});

  var backgroundColors = colors != null ? colors : colorsMap(locations);

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
 * @param data {{
  "2020-01-22": [
    {
      "location": "Country / Region-3",
      "value": 7
    },
    {
      "location": "Other",
      "value": 8
    }
  ]
}}
 * @param colors an object that maps the location & 'Other' to a color
 * @returns {{
  "2020-01-22": {
    "labels": [ "Country / Region-3", "Other" ],
    "datasets": [
      {
        "data": [7, 8],
        "backgroundColor": [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)"
        ]
      }
    ]
  }
}}
 */
export const buildPieChartData = (data, colors) => {
  return Object.keys(data).reduce((chartjsData, date) => {
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
