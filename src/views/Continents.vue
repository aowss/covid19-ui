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

    </div>

  </div>
</template>

<script>
import GeoChart from "@/components/GeoChart.vue";
import { latest } from "@/utils/dataWrangler";
import { mapGetters } from "vuex";

export default {
  name: "Continents",
  components: { GeoChart },
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
    stats() {
      return this.allStats;
    },
    latestDeaths() {
      return latest(this.stats, "deaths");
    },
    latestConfirmed() {
      return latest(this.stats, "confirmedCases");
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

