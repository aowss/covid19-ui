<template>
  <div>

    <div class="row">
      <b-alert class="col-sm" show >Period: {{period}}</b-alert>
      <b-alert class="col-sm" show variant="danger">Deaths {{totalDeaths}}</b-alert>
      <b-alert class="col-sm" show variant="success">Recovered : {{totalRecovered}}</b-alert>
      <b-alert class="col-sm" show variant="warning">Infected: {{totalInfected}}</b-alert>
    </div>

    <br/>

    <div class="row">
      <div class="column">
        <label>Deaths</label>
        <geo-chart :stats="latestDeaths" :regionName="region"/>
      </div>
      <div class="column">
        <label>Confirmed Cases</label>
        <geo-chart :stats="latestConfirmed" :regionName="region"/>
      </div>
    </div>

    <br/>

    <div>
      <h2>Evolution over Time</h2>
      <div class="chart">
        <bar-chart :chart-data="aggregatedDailyChartData" :title="'Daily'"/>
      </div>
      <div class="chart">
        <bar-chart :chart-data="aggregatedChartData" :title="'Cumulative'"/>
      </div>
    </div>

    <br />

    <div>
      <h3>Most Affected</h3>
      <div class="chart">
        <pie-chart :chart-data="deathsPieChartData" :title="'Deaths'"/>
      </div>
      <div class="chart">
        <pie-chart :chart-data="confirmedPieChartData" :title="'Confirmed Cases'"/>
      </div>
    </div>

    <br/>

    <div>
      <h3>Raw Data</h3>
      <div>
        <data-table :stats="stats" />
      </div>
    </div>

  </div>
</template>

<script>
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import GeoChart from "@/components/GeoChart.vue";
import DataTable from "@/components/DataTable.vue";

import { mergeAllStats, topStat, latest } from "@/utils/dataWrangler";
import { dateToDay, yesterday, dateBeautify } from "@/utils/dateFormatter";
import { colorsMap } from "@/utils/colors";
import { cumulativeLocationData, dailyLocationData, buildPieChartData } from "@/utils/chartjsMapper";

export default {
  name: "Overview",
  components: { DataTable, BarChart, PieChart, GeoChart },
  props: {
    stats: {
      type: Object,
      default: null
    },
    region: {
      type: String,
      default: ""
    }
  },
  computed: {
    latestDeaths() {
      return latest(this.stats, "deaths");
    },
    latestConfirmed() {
      return latest(this.stats, "confirmedCases");
    },
    period() {
      const locationStats = Object.values(this.stats)[0];
      return dateBeautify(locationStats[0].date) + " - " + dateBeautify(locationStats[locationStats.length - 1].date);
    },
    aggregatedStats() {
      return mergeAllStats(this.stats);
    },
    totalConfirmedCases() {
      return this.aggregatedStats[this.aggregatedStats.length - 1].value.confirmedCases;
    },
    totalDeaths() {
      return this.aggregatedStats[this.aggregatedStats.length - 1].value.deaths;
    },
    totalRecovered() {
      return this.aggregatedStats[this.aggregatedStats.length - 1].value.recoveries;
    },
    totalInfected() {
      return this.totalConfirmedCases - this.totalDeaths - this.totalRecovered;
    },
    aggregatedChartData() {
      return cumulativeLocationData(this.aggregatedStats);
    },
    aggregatedDailyChartData() {
      return dailyLocationData(this.aggregatedStats);
    },
    latestTopConfirmedCases() {
      return topStat(this.stats, "confirmedCases", 5, dateToDay(yesterday()));
    },
    latestTopDeaths() {
      return topStat(this.stats, "deaths", 5, dateToDay(yesterday()));
    },
    topColors() {
      var topConfirmedCountries = Object.values(this.latestTopConfirmedCases)[0].map(entry => entry.location);
      var topDeathsCountries = Object.values(this.latestTopDeaths)[0].map(entry => entry.location);
      var topCountries = new Set(topConfirmedCountries.filter(country => country != "Other"));
      topDeathsCountries.forEach(country => topCountries.add(country));
      return colorsMap([...topCountries]);
    },
    deathsPieChartData() {
      return buildPieChartData(this.latestTopDeaths, this.topColors)[dateToDay(yesterday())];
    },
    confirmedPieChartData() {
      return buildPieChartData(this.latestTopConfirmedCases, this.topColors)[dateToDay(yesterday())];
    }
  }
};
</script>

<style scoped>
.column {
  flex: 45%;
}

.row {
  display: flex;
}
</style>
