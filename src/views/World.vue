<template>
  <div v-if="isLoaded" id="world">
    <div>
      <h3>Worldwide Statistics</h3>
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
        <pie-chart :chart-data="latestDeathsDataPerDay" :title="'Deaths'"/>
      </div>
      <div class="chart">
        <pie-chart :chart-data="latestConfirmedDataPerDay" :title="'Confirmed Cases'"/>
      </div>
    </div>
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

import { mergeAllStats } from "@/utils/dataWrangler";
import { dateToDay, yesterday } from "@/utils/dateFormatter";
import { cumulativeLocationData, dailyLocationData, topCumulativeDataPerDay } from "@/utils/chartjsMapper";

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
    aggregatedChartData() {
      return cumulativeLocationData(this.aggregatedStats);
    },
    aggregatedDailyChartData() {
      return dailyLocationData(this.aggregatedStats);
    },
    deathsDataPerDay() {
      return topCumulativeDataPerDay(this.stats, "deaths", 5);
    },
    confirmedDataPerDay() {
      return topCumulativeDataPerDay(this.stats, "confirmedCases", 5);
    },
    latestDeathsDataPerDay() {
      return this.deathsDataPerDay[dateToDay(yesterday())];
    },
    latestConfirmedDataPerDay() {
      return this.confirmedDataPerDay[dateToDay(yesterday())];
    }
  }
};
</script>
