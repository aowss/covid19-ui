<template>
  <GChart type="GeoChart" :data="chartData" :options="options"/>
</template>

<script>
import { GChart } from "vue-google-charts";
import { heatMapColorsBlue } from "@/utils/colors";

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
      region: this.regionName,
      regions: {
        Africa: "002",
        Americas: "019",
        Asia: "142",
        Europe: "150",
        Oceania: "009"
      }
    }
  },
  computed: {
    options() {
      console.log('region : ' + this.region);
      console.log('region code : ' + this.regions[this.region]);
      return {
        region: this.regions[this.region],
        colorAxis: {colors: heatMapColorsBlue}
      };
    },
    chartData() {
      var chartData = Object.entries(this.stats);
      chartData.unshift(['Country', 'Figure']);
      return chartData;
    }
  }
};
</script>