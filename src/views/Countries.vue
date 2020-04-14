<template>
  <div v-if="isLoaded" id="countries">

    <label>Country : </label>
    <select v-model="country" @change="onChange($event)">
      <option v-for="country in allCountries" v-bind:key="country">
        {{ country }}
      </option>
    </select>

    <br />

    <div v-if="country != ''">

      <br/>
      <p>{{country}} Statistics for the following period : {{period}}</p>

      <div v-if="this.countriesWithRegions.includes(country)">
        <a :href="`#/region/${country}`">See {{country}} breakdown per region</a>
      </div>
      <div class="chart">
        <bar-chart :chart-data="dailyChartData" :title="'Daily'"/>
      </div>
      <div class="chart">
        <bar-chart :chart-data="chartData" :title="'Cumulative'"/>
      </div>
    </div>

  </div>
</template>

<script>
import BarChart from "@/components/BarChart";

import { mapGetters } from "vuex";

import { removeLeadingDates } from "@/utils/dataWrangler";
import { dateBeautify } from "@/utils/dateFormatter";
import { cumulativeLocationData, dailyLocationData } from "@/utils/chartjsMapper";

export default {
  name: "Countries",
  components: { BarChart },
  props: {
    countryName: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      country: this.countryName
    };
  },
  methods: {
    onChange: function(event) {
      this.country = event.target.value;
      this.$router.push({ name: 'Countries', params: { countryName: event.target.value } })
    }
  },
  computed: {
    ...mapGetters(["isLoaded", "allStats", "allCountries", "countriesWithRegions"]),
    selectedCountryStats() {
      const noCases = stat => stat.value.confirmedCases == 0 && stat.value.deaths == 0 && stat.value.recoveries == 0;
      // eslint-disable-next-line no-unused-vars
      const countryStats = Object.fromEntries(Object.entries(this.allStats).filter(([key, value]) => key === this.country));
      return removeLeadingDates(countryStats, noCases)[this.country];
    },
    period() {
      const locationStats = this.selectedCountryStats;
      return dateBeautify(locationStats[0].date) + " - " + dateBeautify(locationStats[locationStats.length - 1].date);
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

<style scoped>
.chart {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.countries:after {
  content: "";
  display: table;
  clear: both;
}
</style>