<template>
  <GChart type="GeoChart" :data="chartData" :options="options"/>
</template>

<script>
import { GChart } from "vue-google-charts";
import { heatMapColorsBlue } from "@/utils/colors";
import { code } from "@/utils/countries";

export default {
  name: "GeoChart",
  components: { GChart },
  props: {
    stats: {
      type: Object,
      default: null
    },
    regionName: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      regions: {
        Africa: "002",
        Americas: "019",
        Asia: "142",
        Europe: "150",
        Oceania: "009"
      }
    };
  },
  computed: {
    options() {
      return {
        region: this.regions[this.regionName],
        colorAxis: {colors: heatMapColorsBlue}
      };
    },
    chartData() {
      var chartData = Object.entries(this.stats).map(([key, value]) => [({f: key, v: code(key)}), value]);
      chartData.unshift(["Country", "Figure"]);
      return chartData;
    }
  }
};
</script>