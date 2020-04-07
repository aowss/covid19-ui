<template>
  <div id="countries">
    <label>Country : </label>
    <select v-model="country" @change="onChange($event)">
      <option v-for="country in allCountries" v-bind:key="country">
        {{ country }}
      </option>
    </select>
    <br />
    <div v-if="country != ''">
      <div class="chart">
        <bar-chart :chart-data="dailyChartData" :title="'Daily data for ' + country"/>
      </div>
      <div class="chart">
        <bar-chart :chart-data="chartData" :title="'Cumulative data for ' + country"/>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";
import { mapGetters } from "vuex";
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
    ...mapGetters(["allCountries", "statsForCountry"]),
    selectedCountryStats() {
      return this.statsForCountry(this.country);
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