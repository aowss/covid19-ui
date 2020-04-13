<template>
  <div v-if="isLoaded" id="world">
    <div>
      <h3>Worldwide Statistics</h3>
      <div class="chart">
        <bar-chart :chart-data="aggregatedDailyChartData" :title="'World Daily Statistics'"/>
      </div>
      <div class="chart">
        <bar-chart :chart-data="aggregatedChartData" :title="'World Cumulative Statistics'"/>
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
import DataTable from "@/components/DataTable.vue";

import { mergeAllStats } from "@/utils/dataWrangler";
import { cumulativeLocationData, dailyLocationData } from "@/utils/chartjsMapper";

import { mapGetters } from "vuex";

export default {
  name: "World",
  components: { DataTable, BarChart },
  computed: {
    ...mapGetters(["isLoaded", "allStats", "countriesStats"]),
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
    }
  }
};
</script>
