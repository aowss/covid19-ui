//  Assumption : same dates in both and ordered
const mergeStats = (first, second) => {
  for (var i = 0; i < first.length; i++) {
    first[i].value.confirmedCases += second[i].value.confirmedCases;
    first[i].value.deaths += second[i].value.deaths;
    first[i].value.recoveries += second[i].value.recoveries;
  }
  return first;
};

//  Assumption : same dates in both and ordered
export const mergeAllStats = stats => {
  const result = [];
  for (var i = 0; i < stats[0].length; i++) {
    var date = stats[0][i].date;
    var confirmedCases = 0;
    var deaths = 0;
    var recoveries = 0;
    for (var j = 0; j < stats.length; j++) {
      confirmedCases += stats[j][i].value.confirmedCases;
      deaths += stats[j][i].value.deaths;
      recoveries += stats[j][i].value.recoveries;
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
