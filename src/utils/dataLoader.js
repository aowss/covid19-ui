export const loadData = async (countries, from, to) => {

  var url = 'http://localhost:9000/covid19/stats?'
    + ( countries !== null && countries.lenght === 1 ? 'location=' + countries[0] + '&' : '&' ) 
    + ( from !== null ? 'from=' + from + '&' : '&' ) 
    + ( to !== null ? 'to=' + to + '' : '' );

  return fetch(url).then(response => response.json());

};