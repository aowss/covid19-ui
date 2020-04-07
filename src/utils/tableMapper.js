export const details = stats => Object.entries(stats).map(([key, value]) => locationDetails(key, value));

export const locationDetails = (location, locationStats) => {

  const result = {
    location: location,
    confirmed: {
      total: locationStats[locationStats.length - 1].value.confirmedCases
    },
    deaths: {
      total: locationStats[locationStats.length - 1].value.deaths
    }
  };

  for (var i = 1; i <= 7; i++) {

    var dayStat = locationStats[locationStats.length - i];
    var previousStat = locationStats[locationStats.length - i - 1];

    result.confirmed[dayStat.date] = {};
    result.confirmed[dayStat.date].value = dayStat.value.confirmedCases - previousStat.value.confirmedCases;
    result.confirmed[dayStat.date].delta = ( ( dayStat.value.confirmedCases - previousStat.value.confirmedCases ) / previousStat.value.confirmedCases * 100 ).toFixed(2);

    result.deaths[dayStat.date] = {};
    result.deaths[dayStat.date].value = dayStat.value.deaths - previousStat.value.deaths;
    result.deaths[dayStat.date].delta = ( ( dayStat.value.deaths - previousStat.value.deaths ) / previousStat.value.deaths * 100 ).toFixed(2);

  }

  return result;

};
