//  Assumption : same dates in both and ordered
const mergeStats = (first, second) => {
  for (var i = 0; i < first.length; i++) {
    first[i].value.confirmedCases += second[i].value.confirmedCases;
    first[i].value.deaths += second[i].value.deaths;
    first[i].value.recoveries += second[i].value.recoveries;
  }
  return first;
};

/**
 * This predicate is used to decide if a statistic can be removed or not.
 *
 * @callback statisticPredicate
 * @param {Object} statistic - The statistic for a given day
 * @param {string} statistic.date - The statistic's date in 'YYYY-MM-dd' format.
 * @param {Object} statistic.value - The statistic's value.
 * @param {number} statistic.value.confirmedCases - The number of confirmed cases.
 * @param {number} statistic.value.deaths - The number of deaths.
 * @param {number} statistic.value.recoveries - The number of recoveries.
 * @param {boolean} remove - Flag saying if the statistic should be removed or not based on the passed condition
 */

/**
 * Removes the leading dates where the statistics meet the passed condition.
 * For a date to be removed, the statistics for that date need to meet the passed condition for all locations.
 *
 * @param {Object} stats - The statistics object. Each key is a location and each value is  an array of statistic objects.
 * @param {statisticPredicate} condition - The predicate function
 * @return {Object} - The statistics object without the removed dates.
 */
export const removeLeadingDates = (stats, condition) => {
  const clone = JSON.parse(JSON.stringify(stats));
  const allStats = Object.values(clone);
  while(allStats[0].length != 0) {
    for (var j = 0; j < allStats.length; j++) {
      if (!condition(allStats[j][0])) {
        return clone;
      }
    }
    allStats.forEach(locationStats => locationStats.shift());
  }
  return clone;
};

/**
 * Aggregates the statistics across locations.
 * Assumption : same dates in all locations and same order.
 * @param {Object} stats - The statistics object. Each key is a location and each value is an array of statistic objects.
 * @returns {Object[]} - An array of aggregated statistics. Each object is the aggregation for a given date.
 */
export const mergeAllStats = stats => {
  const allStats = Object.values(stats);
  const result = [];
  for (var i = 0; i < allStats[0].length; i++) {
    var date = allStats[0][i].date;
    var confirmedCases = 0;
    var deaths = 0;
    var recoveries = 0;
    for (var j = 0; j < allStats.length; j++) {
      confirmedCases += allStats[j][i].value.confirmedCases;
      deaths += allStats[j][i].value.deaths;
      recoveries += allStats[j][i].value.recoveries;
    }
    result.push({
      date: date,
      value: {
        confirmedCases: confirmedCases,
        deaths: deaths,
        recoveries: recoveries
      }
    });
  }
  return result;
};

/**
 * Returns the latest stats for a given property
 * @param {Object} stats - The statistics object. Each key is a location and each value is an array of statistic objects.
 * @param {String} property - the statistic, e.g 'confirmedCases`, 'deaths` or 'recoveries'
 * @returns {Object} - The latest statistics for that property. The key is the location and the value is the latest value of that property
 */
export const latest = (stats, property) =>
  Object.fromEntries(
    Object.entries(stats).map(([key, value]) => [key, value[value.length - 1].value[property]])
  );

export const topStat = (stats, property, count, day) => {
  const locations = Object.keys(stats);
  const dates =
    day !== undefined ? [day] : stats[locations[0]].map(entry => entry.date);
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

  return topStats;
};

export const groupByCountry = response => {
  var result = {};
  Object.keys(response).forEach(key => {
    var groupedKey = key.split(" / ")[0];
    if (groupedKey in result) {
      result[groupedKey] = mergeStats(result[groupedKey], response[key]);
    } else {
      result[groupedKey] = response[key];
    }
  });
  return result;
};

export const confirmed = (response, country) =>
  response[country].map(entry => entry.value.confirmedCases);
export const deaths = (response, country) =>
  response[country].map(entry => entry.value.deaths);

export const toDaily = response =>
  response.map((item, index, array) =>
    index == 0 ? item : item - array[index - 1]
  );
