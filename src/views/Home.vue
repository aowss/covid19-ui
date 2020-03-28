<template>
  <div class="home">
    <chart v-bind:countries="['Italy', 'Spain', 'Germany']" v-bind:startDate="from"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from "@/components/ChartContainer.vue";

export default {
  name: "home",
  data: () => ({
    from: new Date(2020,1,20)
  }),
  components: {
    Chart
  }
};
</script>
