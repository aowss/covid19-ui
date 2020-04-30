<template>
  <div v-if="isLoaded" id="continents">

    <label>Continents : </label>
    <select v-model="continent" @change="onChange($event)">
      <option v-for="continent in continents" v-bind:key="continent">{{ continent }}</option>
    </select>

    <br/>

    <div v-if="continent != ''">
      <overview :stats="selectedContinentStats" :region="continent"/>
    </div>

  </div>
</template>

<script>
import { region } from "@/utils/countries";
import Overview from "../components/Overview";

import { mapGetters } from "vuex";

export default {
  name: "Continents",
  components: { Overview },
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
    }
  }
};
</script>