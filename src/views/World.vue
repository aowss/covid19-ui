<template>
  <div v-if="isLoaded" id="world">

    <div class="row">
      <b-alert class="col-sm" show variant="danger">Deaths {{totalDeaths}}</b-alert>
      <b-alert class="col-sm" show variant="success">Recovered : {{totalRecovered}}</b-alert>
      <b-alert class="col-sm" show variant="warning">Infected: {{totalInfected}}</b-alert>
    </div>
    <br/>
    <div class="col-md-10 offset-md-1">
      <b-progress :max="totalConfirmedCases" height="4rem" show-value>
        <b-progress-bar :value="totalDeaths" variant="danger">Deaths <strong>{{totalDeaths}}</strong></b-progress-bar>
        <b-progress-bar :value="totalRecovered" variant="success">Recoveries <strong>{{totalRecovered}}</strong></b-progress-bar>
        <b-progress-bar :value="totalInfected" variant="warning">Infected <strong>{{totalInfected}}</strong></b-progress-bar>
      </b-progress>
    </div>

    <br/>

    <div>
      <h3>Worldwide Evolution</h3>
      <div class="chart">
        <bar-chart :chart-data="aggregatedDailyChartData" :title="'Daily'"/>
      </div>
      <div class="chart">
        <bar-chart :chart-data="aggregatedChartData" :title="'Cumulative'"/>
      </div>
    </div>

    <br />

    <div>
      <h3>Most Affected Countries</h3>
      <div class="chart">
        <pie-chart :chart-data="deathsPieChartData" :title="'Deaths'"/>
      </div>
      <div class="chart">
        <pie-chart :chart-data="confirmedPieChartData" :title="'Confirmed Cases'"/>
      </div>
    </div>

    <br />

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
import DataTable from "@/components/DataTable.vue";

import { mergeAllStats, topStat } from "@/utils/dataWrangler";
import { dateToDay, yesterday } from "@/utils/dateFormatter";
import { colorsMap } from "@/utils/colors";
import { cumulativeLocationData, dailyLocationData, buildPieChartData } from "@/utils/chartjsMapper";

import { mapGetters } from "vuex";

export default {
  name: "World",
  components: { DataTable, BarChart, PieChart },
  computed: {
    ...mapGetters(["isLoaded", "allStats"]),
    stats() {
      return this.allStats;
    },
    aggregatedStats() {
      return mergeAllStats(Object.values(this.stats));
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
