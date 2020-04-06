//  Assumption : same dates in both and ordered
const mergeStats = (first, second) => {
  for (var i = 0; i < first.length; i++) {
    first[i].value.confirmedCases += second[i].value.confirmedCases;
    first[i].value.deaths += second[i].value.deaths;
    first[i].value.recoveries += second[i].value.recoveries;
  }
  return first;
};

export const groupByCountry = response => {
  var result = {};
  Object.keys(response).forEach(key => {
    var groupedKey = key.split(' / ')[0];
    // console.log('from ' + key + ' to ' + groupedKey);
    if (groupedKey in result) {
      // var size = result[groupedKey].length;
      // console.log('current data for ' + groupedKey + ' @ ' + result[groupedKey][size - 1]['date'] + ' : ' + JSON.stringify(result[groupedKey][size - 1]));
      // console.log('data to merge for ' + groupedKey + ' : ' + JSON.stringify(response[key][size - 1]));
      result[groupedKey] = mergeStats(result[groupedKey], response[key]);
      // console.log('merged data for ' + groupedKey + ' : ' + JSON.stringify(result[groupedKey][size - 1]));
    } else {
      result[groupedKey] = response[key];
    }
  });
  return result;
};

export const confirmed = (response, country) => response[country].map(entry => entry.value.confirmedCases);
export const deaths = (response, country) => response[country].map(entry => entry.value.deaths);

export const toDaily = response => response.map( (item, index, array) => index == 0 ? item : item - array[index - 1]);
