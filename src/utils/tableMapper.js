export const deltas = stats => Object.entries(stats).map(([key, value]) => locationDeltas(key, value));

export const locationDeltas = (location, locationStats) => {

  const result = {
    location: location,
    confirmed: {
      total: locationStats[locationStats.length - 1].value.confirmedCases
    },
    deaths: {
      total: locationStats[locationStats.length - 1].value.deaths
    }
  };

  //  7 days max and less if there are less than 7 days in the stats
  for (var i = 1; ( i <= 7 ) && ( i <= locationStats.length - 1 ); i++) {

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
