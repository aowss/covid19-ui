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
        <line-chart :chart-data="dailyChartData" :options="options" :title="'Daily data for ' + country"/>
      </div>
      <div class="chart">
        <line-chart :chart-data="chartData" :options="options" :title="'Cumulative data for ' + country"/>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./Chart.js";
import { mapGetters, mapActions } from "vuex";
import { cumulativeLocationData, dailyLocationData } from "../utils/charjsMapper";

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
    ...mapGetters(["allCountries", "statsForCountry"]),
    selectedCountry() {
      return this.country;
    },
    selectedCountryStats() {
      return this.statsForCountry(this.selectedCountry);
    },
    chartData() {
      return cumulativeLocationData(this.selectedCountryStats);
    },
    dailyChartData() {
      return dailyLocationData(this.selectedCountryStats);
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
