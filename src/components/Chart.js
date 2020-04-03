import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.title != "") {
      var options = this.options;
      options.title = {
        display: true,
        text: this.title
      };
      this.renderChart(this.chartData, options);
    } else {
      this.renderChart(this.chartData, this.options);
    }
  }
};
