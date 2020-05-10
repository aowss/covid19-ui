/** @module store */

import { loadData } from "@/utils/dataLoader";
import { indexByDate} from "@/utils/dataWrangler";

/**
 * The statistic for a given day.
 * @example { "date": "2020-01-22", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }
 * @typedef module:store.statistic
 * @type {object}
 * @property {string} date - the statistic's date in `YYYY-MM-dd` format.
 * @property {Object} value - the statistic's value.
 * @property {number} value.confirmedCases - the number of confirmed cases.
 * @property {number} value.deaths - the number of deaths.
 * @property {number} value.recoveries - the number of recoveries.
 */

/**
 * The statistic for a given location.
 * @example { "location": "Country-1", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }
 * @typedef module:store.locationStatistic
 * @type {object}
 * @property {string} location - the location; this can be a country, e.g. `France`, or a region, e.g. `France / Martinique`.
 * @property {Object} value - the statistic's value.
 * @property {number} value.confirmedCases - the number of confirmed cases.
 * @property {number} value.deaths - the number of deaths.
 * @property {number} value.recoveries - the number of recoveries.
 */

/**
 * The statistics for a given location.
 * @example [ { "date": "2020-01-22", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }, { "date": "2020-01-23", "value": { "confirmedCases": 15, "deaths": 4, "recoveries": 0 } } ]
 * @typedef module:store.locationStatistics
 * @type {module:store.statistic[]}
 */

/**
 * The statistics for a given date.
 * @example [ { location: "Country-1", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }, { location: "Country-2", "value": { "confirmedCases": 3, "deaths": 2, "recoveries": 0 } } ]
 * @typedef module:store.dateStatistics
 * @type {module:store.locationStatistic[]}
 */

/**
 * The statistics for a set of locations.
 * @example { "Country-1": [ { "date": "2020-01-22", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }, { "date": "2020-01-23", "value": { "confirmedCases": 15, "deaths": 4, "recoveries": 0 } } ], "Country-2": [ { "date": "2020-01-22", "value": { "confirmedCases": 3, "deaths": 2, "recoveries": 0 } }, { "date": "2020-01-23", "value": { "confirmedCases": 6, "deaths": 4, "recoveries": 0 } } ] }
 * @typedef module:store.statistics
 * @type {object}
 * @property {module:store.locationStatistics} * - the location; this can be a country, e.g. `France`, or a region, e.g. `France / Martinique`.
 */

/**
 * The statistics for a set of dates.
 * @example { "2020-01-22": [ { location: "Country-1", "value": { "confirmedCases": 5, "deaths": 1, "recoveries": 0 } }, { location: "Country-2", "value": { "confirmedCases": 3, "deaths": 2, "recoveries": 0 } } ], "2020-01-23" : [ { location: "Country-1", "value": { "confirmedCases": 15, "deaths": 4, "recoveries": 0 } }, { location: "Country-2", "value": { "confirmedCases": 6, "deaths": 4, "recoveries": 0 } } ] }
 * @typedef module:store.statisticsByDates
 * @property {module:store.dateStatistics} * - the date in `YYYY-MM-dd` format.
 */

/**
 * The statistics store's state
 * @type {object}
 * @property {boolean} loaded - a flag specifying if the store is loaded or not
 * @property {module:store.statistics} stats - the statistics
 */
const state = {
  stats: {},
  loaded: false
};

const actions = {
  async fetchStats({ commit }) {
    const stats = await loadData(null, null, null);
    commit("refreshStats", stats);
  }
};

export const getters = {

  isLoaded: state => state.loaded,

  allStats: state => state.stats,

  allStatsIndexedByDate: state => indexByDate(state.stats),

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
  ]

};

const mutations = {
  refreshStats: (state, stats) => {
    state.stats = stats;
    state.loaded = true;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
