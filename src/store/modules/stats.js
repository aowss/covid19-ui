import { loadData } from "@/utils/dataLoader";

const state = {
  stats: {}
};

const actions = {
  async fetchStats({ commit }) {
    const stats = await loadData(null, null, null);
    commit("refreshStats", stats);
  }
};

export const getters = {

  allStats: state => state.stats,

  countriesStats: state =>
    Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(state.stats).filter(([key, value]) => !key.includes(" / "))
    ),

  statsForCountry: state => country => state.stats[country],

  statsForRegion: state => country =>
    Object.keys(state.stats)
      .filter(
        location => location != country && location.startsWith(country + " / ")
      )
      .reduce((regionsStats, key) => {
        regionsStats[key] = state.stats[key];
        return regionsStats;
      }, {}),

  allCountries: state =>
    Object.keys(state.stats)
      .filter(location => !location.includes(" / "))
      .sort(),

  countriesWithRegions: state => [
    ...new Set(
      Object.keys(state.stats)
        .filter(location => location.includes(" / "))
        .map(location => location.substring(0, location.indexOf(" / ")))
        .sort()
    )
  ],

  allStatsIndexedByDate: state => {
    const locations = Object.keys(state.stats);
    const dates = state.stats[locations[0]].map(entry => entry.date);
    const data = dates.reduce((data, date) => {
      data[date] = locations
        .flatMap(location => state.stats[location])
        .filter(stat => stat.date === date)
        .map((stat, index) => ({
          location: locations[index],
          value: stat.value
        }));
      return data;
    }, {});
    return data;
  }

};

const mutations = {
  refreshStats: (state, stats) => (state.stats = stats)
};

export default {
  state,
  actions,
  getters,
  mutations
};
