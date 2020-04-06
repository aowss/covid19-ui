<template>
  <div id="world">
    <div class="">
      <chart
        v-bind:countries="[ 'Italy', 'Spain', 'Germany', 'France', 'United Kingdom' ]"
        v-bind:startDate="from"
      />
    </div>
    <br />
    <div>
      <data-table :stats="stats" />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/ChartContainer.vue";
import DataTable from "@/components/DataTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "World",
  components: { Chart, DataTable },
  data: () => ({
    from: new Date(2020, 0, 20)
  }),
  computed: {
    ...mapGetters(["countriesStats"]),
    stats() {
      return this.countriesStats;
    }
  }
};
</script>
