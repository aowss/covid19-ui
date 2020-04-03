<template>
  <div id="regions">
    <label>Country : </label>
    <select v-model="country">
      <option v-for="country in countriesWithRegions" v-bind:key="country">
        {{ country }}
      </option>
    </select>
    <br />
    <div v-if="country != ''">
      <h3>Data for {{ country }}</h3>
      <div v-for="region in Object.keys(selectedCountryStats)" :key="region">
        <div class="chart">
          <h3>Daily data for {{ region }}</h3>
          <line-chart :chart-data="dailyChartData[region]" :options="options" />
        </div>
        <div class="chart">
          <h3>Cumulative data for {{ region }}</h3>
          <line-chart :chart-data="chartData[region]" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/Chart.js";
import { mapGetters, mapActions } from "vuex";
import { cumulativeData, dailyData } from "@/utils/charjsMapper";

export default {
  name: "Regions",
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
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50
        }
      }
    }
  }),
  methods: mapActions(["fetchStats"]),
  created() {
    this.fetchStats();
  },
  computed: {
    ...mapGetters(["countriesWithRegions", "statsForRegion"]),
    selectedCountry() {
      return this.country;
    },
    selectedCountryStats() {
      return this.statsForRegion(this.selectedCountry);
    },
    chartData() {
      return cumulativeData(this.selectedCountryStats);
    },
    dailyChartData() {
      return dailyData(this.selectedCountryStats);
    }
  }
};
</script>

<style scoped>
  .chart {
    float: left;
    width: 50%;
  }

  /* Clear floats after the columns */
  .regioons:after {
    content: "";
    display: table;
    clear: both;
  }
</style>