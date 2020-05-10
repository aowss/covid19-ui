/** @module dataWrangler */

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
 * Indexes the statistics by date.
 * <p>Assumption : same dates in all locations and same order.
 * @example <caption>Input</caption>
 * { "Country-1": [ { date: "2020-01-22", value: { confirmedCases: 5, deaths: 1, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 15, deaths: 4, recoveries: 0 } } ], "Country-2": [ { date: "2020-01-22", value: { confirmedCases: 3, deaths: 2, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 6, deaths: 4, recoveries: 0 } } ] }
 * @example  <caption>Output</caption>
 * { "2020-01-22": [ { location: "Country-1", value: { confirmedCases: 5, deaths: 1, recoveries: 0 } }, { location:  "Country-2", value: { confirmedCases: 3, deaths: 2, recoveries: 0 } }, { location: "Country-3", value: { confirmedCases: 7, deaths: 1, recoveries: 0 } } ], "2020-01-23":  [ { location: "Country-1", value: { confirmedCases: 15, deaths: 4, recoveries: 0 } }, { location: "Country-2", value: { confirmedCases: 6, deaths: 4, recoveries: 0 } }, { location: "Country-3", value: { confirmedCases: 9, deaths: 5, recoveries: 1 } } ], "2020-01-24":  [ { location: "Country-1", value: { confirmedCases: 30, deaths: 8, recoveries: 0 } }, { location: "Country-2", value: { confirmedCases: 9, deaths: 6, recoveries: 0 } }, { location: "Country-3", value: { confirmedCases: 11, deaths: 7, recoveries: 0 } } ] }
 * @param {module:store.statistics} stats - the statistics
 * @returns {module:store.statisticsByDates} the statistics indexed by date
 */
const indexByDate = stats => {
  console.time("indexByDate");
  const locations = Object.keys(stats);
  const dates = stats[locations[0]].map(entry => entry.date);
  const data = dates.reduce((data, date) => {
    data[date] = locations
        .flatMap(location => stats[location])
        .filter(stat => stat.date === date)
        .map((stat, index) => ({
          location: locations[index],
          value: stat.value
        }));
    return data;
  }, {});
  console.timeEnd("indexByDate");
  return data;
};

/**
 * This predicate is used to decide if a statistic can be removed or not.
 *
 * @callback module:dataWrangler.statisticPredicate
 * @param {module:store.statistic} statistic - the statistic for a given day
 * @return {boolean} flag saying if the statistic should be removed or not
 */

/**
 * Removes the leading dates where the statistics meet the passed condition.
 * For a date to be removed, the statistics for that date need to meet the passed condition for all locations.
 *
 * @param {module:store.statistics} stats - the statistics
 * @param {module:dataWrangler.statisticPredicate} condition - the predicate function
 * @return {module:store.statistics} the statistics object without the removed dates
 */
const removeLeadingDates = (stats, condition) => {
  console.time("removeLeadingDates");
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
  console.timeEnd("removeLeadingDates");
  return clone;
};

/**
 * Aggregates the statistics across locations.
 * <p>Assumption : same dates in all locations and same order.
 * @example <caption>Input</caption>
 * { "Country-1": [ { date: "2020-01-22", value: { confirmedCases: 5, deaths: 1, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 15, deaths: 4, recoveries: 0 } } ], "Country-2": [ { date: "2020-01-22", value: { confirmedCases: 3, deaths: 2, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 6, deaths: 4, recoveries: 0 } } ] }
 * @example  <caption>Output</caption>
 * [ { date: "2020-01-22", value: { confirmedCases: 8, deaths: 3, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 21, deaths: 8, recoveries: 0 } } ]
 * @param {module:store.statistics} stats - the statistics
 * @returns {module:store.locationStatistics} the aggregated statistics across locations
 */
const mergeAllStats = stats => {
  console.time("mergeAllStats");
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
  console.timeEnd("mergeAllStats");
  return result;
};

/**
 * The values of a given statistic for a set of locations.
 * @example { "Country-1": 8, "Country-2": 6, "Country-3": 7 }
 * @typedef module:dataWrangler.snapshot
 * @type {object}
 * @property {number} * - the key is the location; this can be a country, e.g. 'France', or a region, e.g. 'France / Martinique'
 *                      <p> the value is the value of a specific statistic at a specific date for that given location
 */

/**
 * Returns the latest statistics for a given property.
 * @example <caption>Input</caption>
 * { "Country-1": [ { date: "2020-01-22", value: { confirmedCases: 5, deaths: 1, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 15, deaths: 4, recoveries: 0 } } ], "Country-2": [ { date: "2020-01-22", value: { confirmedCases: 3, deaths: 2, recoveries: 0 } }, { date: "2020-01-23", value: { confirmedCases: 6, deaths: 4, recoveries: 0 } } ] }
 * @example  <caption>Output for 'deaths'</caption>
 * { "Country-1": 4, "Country-2": 4 }
 * @param {module:store.statistics} stats - the statistics
 * @param {String} property - the statistic, e.g 'confirmedCases', 'deaths' or 'recoveries'
 * @returns {module:dataWrangler.snapshot} the latest statistics for that property.
 */
const latest = (stats, property) =>
  Object.fromEntries(
    Object.entries(stats).map(([key, value]) => [key, value[value.length - 1].value[property]])
  );

export const topStat = (stats, property, count, day) => {
  console.time("topStat");
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

  console.timeEnd("topStat");
  return topStats;
};

export const currentTopStat = (stats, property, count, day) => {
  console.time("currentTopStat");
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

  // eslint-disable-next-line no-unused-vars
  var topOrdered = Object.entries(latest(stats, property)).sort(([c1,v1], [c2,v2]) => v2 - v1).map(([key,value]) => key).slice(0, count);

  var topStats = dates.reduce((topData, date) => {
    const top = data[date].filter(stats => topOrdered.includes(stats.location));
    const sum = data[date]
        .filter(stats => !topOrdered.includes(stats.location))
        .reduce((total, stat) => total + stat.value, 0);
    top.push({
      location: "Other",
      value: sum
    });
    topData[date] = top;
    return topData;
  }, {});

  console.timeEnd("currentTopStat");
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

export {
  removeLeadingDates,
  mergeAllStats,
  latest,
  indexByDate
};