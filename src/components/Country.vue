<template>
  <div id="countries">
    <label>Country : </label>
    <select v-model="country">
      <option v-for="country in allCountries" v-bind:key="country">
        {{ country }}
      </option>
    </select>
    <br />
    <div v-if="country != ''">
      <div class="chart">
        <h3>Daily data for {{ country }}</h3>
        <line-chart :chart-data="dailyChartData" :options="options" />
      </div>
      <div class="chart">
        <h3>Cumulative data for {{ country }}</h3>
        <line-chart :chart-data="chartData" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./Chart.js";
import { mapGetters, mapActions } from "vuex";
import { cumulativeCountryData, dailyCountryData } from "../utils/charjsMapper";

export default {
  name: "Countries",
  components: { LineChart },
  data: () => ({
    country: "",
    options: {
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: true
          }
        ]
      }
    }
  }),
  methods: mapActions(["fetchStats"]),
  created() {
    this.fetchStats();
  },
  computed: {
    ...mapGetters(["allStats", "allCountries", "statsForCountry"]),
    selectedCountry() {
      return this.country;
    },
    selectedCountryStats() {
      return this.statsForCountry(this.selectedCountry);
    },
    chartData() {
      return cumulativeCountryData(this.selectedCountryStats);
    },
    dailyChartData() {
      return dailyCountryData(this.selectedCountryStats);
    }
  }
};
</script>

<style>
.chart {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.container:after {
  content: "";
  display: table;
  clear: both;
}
</style>
