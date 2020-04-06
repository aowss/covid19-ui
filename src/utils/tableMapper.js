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
  for (var i = 1; i <= 5; i++) {
    var dayStat = locationStats[locationStats.length - i];
    var previousStat = locationStats[locationStats.length - i - 1];
    result.confirmed[dayStat.date] =
      dayStat.value.confirmedCases - previousStat.value.confirmedCases;
    result.deaths[dayStat.date] =
      dayStat.value.deaths - previousStat.value.deaths;
  }
  return result;
};
