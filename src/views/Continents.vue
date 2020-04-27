<template>
  <div v-if="isLoaded" id="continents">

    <label>Continents : </label>
    <select v-model="continent" @change="onChange($event)">
      <option v-for="continent in continents" v-bind:key="continent">
        {{ continent }}
      </option>
    </select>

    <br/>

    <div v-if="continent != ''">

      <div class="row">
        <div class="column">
          <label>Deaths in {{continent}}</label>
          <geo-chart :stats="latestDeaths" :regionName="continent"/>
        </div>
        <div class="column">
          <label>Confirmed Cases in {{continent}}</label>
          <geo-chart :stats="latestConfirmed" :regionName="continent"/>
        </div>
      </div>

      <div>
        <h3>Raw Data</h3>
        <div>
          <data-table :stats="selectedContinentStats" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import GeoChart from "@/components/GeoChart.vue";
import DataTable from "@/components/DataTable.vue";
import { latest } from "@/utils/dataWrangler";
import { region } from "@/utils/countries";
import { mapGetters } from "vuex";

export default {
  name: "Continents",
  components: { GeoChart, DataTable },
  props: {
    continentName: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      continent: this.continentName,
      continents: ["Africa", "Americas", "Asia", "Europe", "Oceania"]
    };
  },
  methods: {
    onChange: function(event) {
      this.continent = event.target.value;
      this.$router.push({ name: 'Continents', params: { continentName: event.target.value } })
    }
  },
  computed: {
    ...mapGetters(["isLoaded", "allStats"]),
    selectedContinentStats() {
      // eslint-disable-next-line no-unused-vars
      return Object.fromEntries(Object.entries(this.allStats).filter(([key, value]) => region(key) === this.continent));
    },
    latestDeaths() {
      return latest(this.selectedContinentStats, "deaths");
    },
    latestConfirmed() {
      return latest(this.selectedContinentStats, "confirmedCases");
    }
  }
};
</script>

<style scoped>
.column {
  flex: 45%;
  /*padding: 0 1px;*/
  /*border: 1px solid blue;*/
}

.row {
  display: flex;
}
</style>

