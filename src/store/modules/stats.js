import { loadData } from "../../utils/dataLoader";

const state = {
  stats: {}
};

const actions = {
  async fetchStats({ commit }) {
    const stats = await loadData(null, null, null);
    commit("refreshStats", stats);
  }
};

const getters = {
  allStats: state => state.stats,
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
  ]
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
