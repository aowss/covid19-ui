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
      <div class="chart">
        <pie-chart :chart-data="latestDeathsDataPerDay" :title="'Deaths'"/>
      </div>
      <div class="chart">
        <pie-chart :chart-data="latestConfirmedDataPerDay" :title="'Confirmed Cases'"/>
      </div>
      <div v-for="region in Object.keys(selectedCountryStats)" :key="region">
        <div class="chart">
          <bar-chart :chart-data="dailyChartData[region]" :title="'Daily data for ' + region.substring(region.indexOf(' / ') + 3)"/>
        </div>
        <div class="chart">
          <bar-chart :chart-data="chartData[region]" :title="'Cumulative data for ' + region.substring(region.indexOf(' / ') + 3)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.js";
import PieChart from "@/components/PieChart.js";
import { mapGetters, mapActions } from "vuex";
import { cumulativeData, dailyData, cumulativeDataPerDay } from "@/utils/chartjsMapper";
import { dateToDay, yesterday } from "../utils/dateFormatter";

export default {
  name: "Regions",
  components: { BarChart, PieChart },
  data: () => ({
    country: ""
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
    },
    deathsDataPerDay() {
      return cumulativeDataPerDay(this.selectedCountryStats, "deaths")
    },
    confirmedDataPerDay() {
      return cumulativeDataPerDay(this.selectedCountryStats, "confirmedCases")
    },
    latestDeathsDataPerDay() {
      return this.deathsDataPerDay[dateToDay(yesterday())]
    },
    latestConfirmedDataPerDay() {
      return this.confirmedDataPerDay[dateToDay(yesterday())]
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